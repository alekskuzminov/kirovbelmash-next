"""Build simplified KP from the original template."""
from docx import Document
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document("КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ макет.docx")
body = doc.element.body


def get_text(el):
    return "".join(t.text or "" for t in el.iter(qn("w:t")))


def has_drawing(el):
    return len(list(el.iter(qn("w:drawing")))) > 0


children = list(body)

# === Step 1: Remove tech process (idx 21-31) and descriptions (idx 50-164) ===
indices_to_remove = list(range(21, 32)) + list(range(50, 165))
indices_to_remove.sort(reverse=True)
for idx in indices_to_remove:
    body.remove(children[idx])

children = list(body)

# === Step 2: Add page break before "Перечень оборудования" ===
for i, child in enumerate(children):
    if "Перечень оборудования" in get_text(child):
        pPr = child.find(qn("w:pPr"))
        if pPr is None:
            pPr = OxmlElement("w:pPr")
            child.insert(0, pPr)
        pPr.append(OxmlElement("w:pageBreakBefore"))
        print(f"Page break added before idx {i}")
        break

# === Step 3: Remove "Наши услуги" + fancy service tables (idx 29 to before sectPr) ===
children = list(body)
remove_start = None
remove_end = None
for i, child in enumerate(children):
    if "Наши услуги" in get_text(child):
        remove_start = i
    if child.tag.split("}")[-1] == "sectPr":
        remove_end = i
        break

# Also remove decorative image paragraphs between intro and equipment heading
extra_remove = []
for i, child in enumerate(children):
    tag = child.tag.split("}")[-1]
    text = get_text(child).strip()
    if tag == "p" and has_drawing(child) and not text and 13 <= i <= 21:
        extra_remove.append(i)

all_remove = sorted(
    set(list(range(remove_start, remove_end)) + extra_remove), reverse=True
)
for idx in all_remove:
    body.remove(children[idx])

print(f"Removed services section ({remove_start}..{remove_end-1}) + {len(extra_remove)} decorative images")


# === Step 4: Build conditions table + contacts ===

def make_run(text, bold=False, size=22, color="1A1A1A", font="Arial"):
    r = OxmlElement("w:r")
    rPr = OxmlElement("w:rPr")
    rFonts = OxmlElement("w:rFonts")
    rFonts.set(qn("w:ascii"), font)
    rFonts.set(qn("w:hAnsi"), font)
    rFonts.set(qn("w:cs"), font)
    rPr.append(rFonts)
    sz = OxmlElement("w:sz")
    sz.set(qn("w:val"), str(size))
    rPr.append(sz)
    szCs = OxmlElement("w:szCs")
    szCs.set(qn("w:val"), str(size))
    rPr.append(szCs)
    if bold:
        rPr.append(OxmlElement("w:b"))
    clr = OxmlElement("w:color")
    clr.set(qn("w:val"), color)
    rPr.append(clr)
    r.append(rPr)
    t = OxmlElement("w:t")
    t.set(qn("xml:space"), "preserve")
    t.text = text
    r.append(t)
    return r


def make_para(text, bold=False, size=22, color="1A1A1A", space_before=0, space_after=0):
    p = OxmlElement("w:p")
    pPr = OxmlElement("w:pPr")
    if space_before or space_after:
        spacing = OxmlElement("w:spacing")
        if space_before:
            spacing.set(qn("w:before"), str(space_before))
        if space_after:
            spacing.set(qn("w:after"), str(space_after))
        pPr.append(spacing)
    p.append(pPr)
    p.append(make_run(text, bold=bold, size=size, color=color))
    return p


def make_multi_run_para(runs_data, space_before=0, space_after=0):
    """runs_data: list of (text, bold, size, color) tuples"""
    p = OxmlElement("w:p")
    pPr = OxmlElement("w:pPr")
    if space_before or space_after:
        spacing = OxmlElement("w:spacing")
        if space_before:
            spacing.set(qn("w:before"), str(space_before))
        if space_after:
            spacing.set(qn("w:after"), str(space_after))
        pPr.append(spacing)
    p.append(pPr)
    for text, bold, size, color in runs_data:
        p.append(make_run(text, bold=bold, size=size, color=color))
    return p


def make_cell(text, bold=False, width=None, shading=None, size=20):
    tc = OxmlElement("w:tc")
    tcPr = OxmlElement("w:tcPr")
    if width:
        tcW = OxmlElement("w:tcW")
        tcW.set(qn("w:w"), str(width))
        tcW.set(qn("w:type"), "dxa")
        tcPr.append(tcW)
    tcBorders = OxmlElement("w:tcBorders")
    for side in ("top", "bottom", "left", "right"):
        b = OxmlElement(f"w:{side}")
        b.set(qn("w:val"), "single")
        b.set(qn("w:sz"), "4")
        b.set(qn("w:color"), "CCCCCC")
        b.set(qn("w:space"), "0")
        tcBorders.append(b)
    tcPr.append(tcBorders)
    if shading:
        shd = OxmlElement("w:shd")
        shd.set(qn("w:val"), "clear")
        shd.set(qn("w:fill"), shading)
        tcPr.append(shd)
    tcMar = OxmlElement("w:tcMar")
    for side, val in [("top", "60"), ("bottom", "60"), ("start", "100"), ("end", "100")]:
        m = OxmlElement(f"w:{side}")
        m.set(qn("w:w"), val)
        m.set(qn("w:type"), "dxa")
        tcMar.append(m)
    tcPr.append(tcMar)
    tc.append(tcPr)
    tc.append(make_para(text, bold=bold, size=size))
    return tc


# Page break
pb = OxmlElement("w:p")
pb_r = OxmlElement("w:r")
br = OxmlElement("w:br")
br.set(qn("w:type"), "page")
pb_r.append(br)
pb.append(pb_r)

# Heading
heading = make_para(
    "УСЛОВИЯ ПОСТАВКИ", bold=True, size=28, color="E12222", space_before=300, space_after=200
)

# Conditions table
conditions = [
    ("Шеф-монтаж", "20 000 руб/день + проживание сотрудников на территории Заказчика"),
    ("Полный монтаж", "Установка под ключ. Стоимость — 15% от стоимости оборудования"),
    ("Место передачи", "Склад Поставщика, г. Белая Холуница, Кировская область"),
    ("Доставка", "Поставщик организует доставку за счёт Покупателя"),
    ("Срок изготовления", "60 рабочих дней с момента внесения аванса"),
    ("Условия оплаты", "30% аванс, 70% по уведомлению о готовности"),
    ("Гарантия", "36 месяцев с момента получения оборудования"),
]

col1, col2 = 3200, 6438
tbl = OxmlElement("w:tbl")
tblPr = OxmlElement("w:tblPr")
tblW = OxmlElement("w:tblW")
tblW.set(qn("w:w"), str(col1 + col2))
tblW.set(qn("w:type"), "dxa")
tblPr.append(tblW)
tbl.append(tblPr)
tblGrid = OxmlElement("w:tblGrid")
for w in [col1, col2]:
    gc = OxmlElement("w:gridCol")
    gc.set(qn("w:w"), str(w))
    tblGrid.append(gc)
tbl.append(tblGrid)

for label, value in conditions:
    tr = OxmlElement("w:tr")
    tr.append(make_cell(label, bold=True, width=col1, shading="F5F5F5"))
    tr.append(make_cell(value, width=col2))
    tbl.append(tr)

# Contacts heading
heading2 = make_para(
    "КОНТАКТЫ", bold=True, size=28, color="E12222", space_before=400, space_after=200
)

# Contact lines
contact_lines = [
    make_para('ООО "КировБелМаш"', bold=True, size=24, space_after=80),
    make_para(
        "Кировская область, г. Белая Холуница, ул. Глазырина, 112",
        size=22,
        space_after=80,
    ),
    make_multi_run_para(
        [
            ("Тел.: ", False, 22, "4B5464"),
            ("+7 900 521-84-77", True, 22, "1A1A1A"),
        ],
        space_after=80,
    ),
    make_para("Email: sale@kirovbelmash.ru", size=22, space_after=80),
    make_para("Сайт: kirovbelmash.ru", size=22, space_after=80),
]

# Signature
sig = [
    make_para("С уважением,", size=22, color="4B5464", space_before=400),
    make_multi_run_para(
        [
            ("Отдел продаж ", False, 22, "1A1A1A"),
            ('ООО "КировБелМаш"', True, 22, "1A1A1A"),
        ],
        space_after=100,
    ),
]

# === Insert before sectPr ===
children = list(body)
sectPr = None
for child in children:
    if child.tag.split("}")[-1] == "sectPr":
        sectPr = child
        break

# === Set left/right margins to 1 cm (567 twips) ===
pgMar = sectPr.find(qn("w:pgMar"))
if pgMar is None:
    pgMar = OxmlElement("w:pgMar")
    sectPr.insert(0, pgMar)
pgMar.set(qn("w:left"), "567")
pgMar.set(qn("w:right"), "567")

elements_to_insert = [
    pb,
    heading,
    tbl,
    make_para("", size=12),
    heading2,
    *contact_lines,
    make_para("", size=12),
    *sig,
]

for el in elements_to_insert:
    body.insert(list(body).index(sectPr), el)

# === Final verification ===
children = list(body)
print(f"\nFinal: {len(children)} elements")
for i, child in enumerate(children):
    tag = child.tag.split("}")[-1]
    text = get_text(child)[:60]
    img = " [IMG]" if has_drawing(child) else ""
    if text or tag in ("tbl", "sectPr"):
        print(f"  {i}: <{tag}>{img} '{text}'")

doc.save("КП_Линия_брикетирования_1000_простое.docx")
print("\nDone!")
