const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, PageBreak,
  Header, Footer, PageNumber, HeadingLevel,
} = require("docx");

// ─── Цвета и шрифты ───
const RED = "E12222";
const DARK = "1A1A1A";
const GRAY = "4B5464";
const LIGHT_BG = "F5F5F5";
const FONT = "Arial"; // универсальный fallback

// ─── Данные КП ───
const KP = {
  title: "КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ",
  lineName: "ЛИНИЯ БРИКЕТИРОВАНИЯ",
  productivity: "Производительность — 1 000 кг/час",
  date: "[Дата предложения]",
  recipient: "[Наименование организации]",

  params: [
    ["Сырьё", "Опил, щепа ест. влажности 55%"],
    ["Продукт", "Брикеты Pini & Kay"],
    ["Уст. мощность", "243 кВт"],
    ["Потр. мощность", "— кВт"],
    ["Персонал", "2–3 человека"],
  ],

  // Таблица оборудования: [№, наименование, кВт, цена]
  equipmentSections: [
    {
      header: "ПЕРВЫЙ ЭТАП. ПОДАЧА",
      items: [
        ["1", "Живое дно гидравлическое 30 м³", "7,5", "1 757 000"],
        ["2", "Дисковый сепаратор*", "4,5", "489 000"],
        ["3", "Транспортер цепной L-образный", "4,0", "632 000"],
        ["4", "Дозатор шнековый", "2,2", "247 000"],
        ["5", "Дробильная установка КДЕ с комплектом (вентилятор, циклон, затвор, воздуховоды)", "60,5", "1 343 000"],
        ["6", "Затвор шлюзовой ШУ-4 НУ", "1,5", "144 000"],
        ["7", "Теплогенератор ТГН-1,5 МВт (бункер, шнек, золоуловитель, система отсекания)", "11,45", "5 112 000"],
      ],
    },
    {
      header: "ВТОРОЙ ЭТАП. СУШКА",
      items: [
        ["8", "Циклон АВМ-0,65 с шибером регулировки", "22,1", "805 000"],
        ["9", "Затвор шлюзовой ШУ-4", "1,5", "162 000"],
        ["10", "Дробильная установка ДСС-30 с воздуховодами", "30", "386 000"],
        ["11", "Электрощит управления + АСУ влажности", "—", "1 121 000"],
      ],
    },
    {
      header: "ТРЕТИЙ ЭТАП. ПРЕССОВАНИЕ",
      items: [
        ["12", "Бункер-накопитель 6 м³ (дозатор, фильтр-мешки, эстакада)", "7,0", "1 014 000"],
        ["13", "Пресс-экструдер ПБМ-2 (55 кВт)", "55,55", "1 806 000"],
      ],
    },
  ],

  totalPower: "243",
  totalPrice: "18 830 000",

  conditions: [
    ["Шеф-монтаж", "20 000 руб/день + проживание сотрудников на территории Заказчика"],
    ["Полный монтаж", "Установка под ключ. Стоимость — 15% от стоимости оборудования"],
    ["Место передачи", "Склад Поставщика, г. Белая Холуница, Кировская область"],
    ["Доставка", "Поставщик организует доставку за счёт Покупателя"],
    ["Срок изготовления", "60 рабочих дней с момента внесения аванса"],
    ["Условия оплаты", "30% аванс, 70% по уведомлению о готовности"],
    ["Гарантия", "36 месяцев с момента получения оборудования"],
  ],

  contacts: {
    company: 'ООО "КировБелМаш"',
    address: "Кировская область, г. Белая Холуница, ул. Глазырина, 112",
    phone: "+7 900 521-84-77",
    email: "sale@kirovbelmash.ru",
    site: "kirovbelmash.ru",
  },
};

// ─── Утилиты ───
const PAGE_WIDTH = 11906; // A4
const MARGIN_LEFT = 1134; // ~2cm
const MARGIN_RIGHT = 1134;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT; // ~9638

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

function textRun(text, opts = {}) {
  return new TextRun({
    text,
    font: FONT,
    size: opts.size || 22, // 11pt
    bold: opts.bold || false,
    color: opts.color || DARK,
    ...opts,
  });
}

function emptyPara(size = 12) {
  return new Paragraph({ children: [new TextRun({ text: "", size })] });
}

// ─── Титульная страница ───
function buildTitlePage() {
  return [
    // Отступ сверху
    emptyPara(), emptyPara(), emptyPara(), emptyPara(),
    emptyPara(), emptyPara(), emptyPara(), emptyPara(),

    // Название компании
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [textRun('ООО "КировБелМаш"', { size: 28, bold: true, color: DARK })],
    }),

    // Красная линия
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [textRun("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", { size: 20, color: RED })],
    }),

    // КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [textRun(KP.title, { size: 44, bold: true, color: DARK })],
    }),

    emptyPara(),

    // Линия брикетирования
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [textRun(KP.lineName, { size: 36, bold: true, color: RED })],
    }),

    // Производительность
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [textRun(KP.productivity, { size: 26, color: GRAY })],
    }),

    emptyPara(), emptyPara(),

    // Для кого
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [textRun("Для: ", { size: 22, color: GRAY }), textRun(KP.recipient, { size: 22, bold: true })],
    }),

    // Дата
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [textRun("Дата: ", { size: 22, color: GRAY }), textRun(KP.date, { size: 22 })],
    }),

    // Разрыв страницы
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

// ─── Параметры линии ───
function buildParamsTable() {
  const colW1 = 3200;
  const colW2 = CONTENT_WIDTH - colW1;

  const rows = KP.params.map(
    ([label, value]) =>
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: colW1, type: WidthType.DXA },
            margins: cellMargins,
            shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [textRun(label, { bold: true, size: 20 })] })],
          }),
          new TableCell({
            borders,
            width: { size: colW2, type: WidthType.DXA },
            margins: cellMargins,
            children: [new Paragraph({ children: [textRun(value, { size: 20 })] })],
          }),
        ],
      })
  );

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [colW1, colW2],
    rows,
  });
}

// ─── Таблица оборудования ───
function buildEquipmentTable() {
  const cols = [600, 5438, 1200, 2400]; // №, Наименование, кВт, Цена

  function headerRow(texts, fill) {
    return new TableRow({
      children: texts.map((t, i) =>
        new TableCell({
          borders,
          width: { size: cols[i], type: WidthType.DXA },
          margins: cellMargins,
          shading: { fill: fill || RED, type: ShadingType.CLEAR },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [textRun(t, { bold: true, size: 18, color: fill ? DARK : "FFFFFF" })],
            }),
          ],
        })
      ),
    });
  }

  function sectionRow(text) {
    return new TableRow({
      children: [
        new TableCell({
          borders,
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnSpan: 4,
          margins: cellMargins,
          shading: { fill: "E8E8E8", type: ShadingType.CLEAR },
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [textRun(text, { bold: true, size: 18, color: RED })],
            }),
          ],
        }),
      ],
    });
  }

  function dataRow([num, name, kw, price]) {
    const values = [num, name, kw, price];
    return new TableRow({
      children: values.map((v, i) =>
        new TableCell({
          borders,
          width: { size: cols[i], type: WidthType.DXA },
          margins: cellMargins,
          children: [
            new Paragraph({
              alignment: i === 0 || i === 2 || i === 3 ? AlignmentType.CENTER : AlignmentType.LEFT,
              children: [textRun(v, { size: 18 })],
            }),
          ],
        })
      ),
    });
  }

  function totalRow() {
    return new TableRow({
      children: [
        new TableCell({
          borders,
          width: { size: cols[0] + cols[1], type: WidthType.DXA },
          columnSpan: 2,
          margins: cellMargins,
          shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [textRun("ИТОГО:", { bold: true, size: 20 })],
            }),
          ],
        }),
        new TableCell({
          borders,
          width: { size: cols[2], type: WidthType.DXA },
          margins: cellMargins,
          shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [textRun(KP.totalPower + " кВт", { bold: true, size: 20 })],
            }),
          ],
        }),
        new TableCell({
          borders,
          width: { size: cols[3], type: WidthType.DXA },
          margins: cellMargins,
          shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [textRun(KP.totalPrice + " руб.", { bold: true, size: 20, color: RED })],
            }),
          ],
        }),
      ],
    });
  }

  const rows = [headerRow(["№", "НАИМЕНОВАНИЕ", "КВТ", "ЦЕНА, РУБ."])];

  for (const section of KP.equipmentSections) {
    rows.push(sectionRow(section.header));
    for (const item of section.items) {
      rows.push(dataRow(item));
    }
  }

  rows.push(totalRow());

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: cols,
    rows,
  });
}

// ─── Условия поставки ───
function buildConditionsTable() {
  const colW1 = 3200;
  const colW2 = CONTENT_WIDTH - colW1;

  const rows = KP.conditions.map(
    ([label, value]) =>
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: colW1, type: WidthType.DXA },
            margins: cellMargins,
            shading: { fill: LIGHT_BG, type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [textRun(label, { bold: true, size: 20 })] })],
          }),
          new TableCell({
            borders,
            width: { size: colW2, type: WidthType.DXA },
            margins: cellMargins,
            children: [new Paragraph({ children: [textRun(value, { size: 20 })] })],
          }),
        ],
      })
  );

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [colW1, colW2],
    rows,
  });
}

// ─── Контакты ───
function buildContactsBlock() {
  const c = KP.contacts;
  return [
    new Paragraph({
      spacing: { after: 80 },
      children: [textRun(c.company, { size: 24, bold: true })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [textRun(c.address, { size: 22 })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        textRun("Тел.: ", { size: 22, color: GRAY }),
        textRun(c.phone, { size: 22, bold: true }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        textRun("Email: ", { size: 22, color: GRAY }),
        textRun(c.email, { size: 22 }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        textRun("Сайт: ", { size: 22, color: GRAY }),
        textRun(c.site, { size: 22 }),
      ],
    }),
  ];
}

// ─── Сборка документа ───
function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 300, after: 200 },
    children: [textRun(text, { size: 28, bold: true, color: RED })],
  });
}

const note = new Paragraph({
  spacing: { before: 100, after: 200 },
  children: [textRun("* агрегат не является обязательным", { size: 16, color: GRAY, italics: true })],
});

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 22 },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1134, right: MARGIN_RIGHT, bottom: 1134, left: MARGIN_LEFT },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                textRun("kirovbelmash.ru  |  +7 900 521-84-77  |  sale@kirovbelmash.ru", {
                  size: 16,
                  color: GRAY,
                }),
              ],
            }),
          ],
        }),
      },
      children: [
        // Титул
        ...buildTitlePage(),

        // Параметры линии
        sectionHeading("ПАРАМЕТРЫ ЛИНИИ"),
        buildParamsTable(),
        emptyPara(),

        // Состав и стоимость
        sectionHeading("СОСТАВ ЛИНИИ И СТОИМОСТЬ"),
        buildEquipmentTable(),
        note,

        // Разрыв
        new Paragraph({ children: [new PageBreak()] }),

        // Условия
        sectionHeading("УСЛОВИЯ ПОСТАВКИ"),
        buildConditionsTable(),

        emptyPara(), emptyPara(),

        // Контакты
        sectionHeading("КОНТАКТЫ"),
        ...buildContactsBlock(),

        emptyPara(), emptyPara(),

        // Подпись
        new Paragraph({
          spacing: { before: 400 },
          children: [
            textRun("С уважением,", { size: 22, color: GRAY }),
          ],
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            textRun("Отдел продаж ", { size: 22 }),
            textRun('ООО "КировБелМаш"', { size: 22, bold: true }),
          ],
        }),
      ],
    },
  ],
});

// ─── Генерация файла ───
const OUTPUT = __dirname + "/КП_Линия_брикетирования_1000.docx";

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log("Готово:", OUTPUT);
});
