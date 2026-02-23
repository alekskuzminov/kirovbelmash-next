export interface LineVariant {
    id: string;
    capacity: string;
    name: string;
    price: string;
    power: string;
    rawMaterial: string;
    product: string;
    image: string;
}

export const lineVariants: Record<'briquetting' | 'granulation' | 'drying', LineVariant[]> = {
    briquetting: [
        {
            id: 'liniya-briketirovaniya-500',
            capacity: '500 кг/час',
            name: 'Линия по производству топливных брикетов 500 кг/час',
            price: 'от 10 524 000 руб.',
            power: '101 кВт',
            rawMaterial: 'Опил, щепа, горбыль, лузга',
            product: 'Топливный брикет Pini & Kay',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/abb921e001a71669b018b6f283c86e42.jpeg',
        },
        {
            id: 'liniya-briketirovaniya-1000',
            capacity: '1000 кг/час',
            name: 'Линия по производству топливных брикетов 1000 кг/час',
            price: 'от 12 946 000 руб.',
            power: '148 кВт',
            rawMaterial: 'Опил, щепа, горбыль, лузга',
            product: 'Топливный брикет Pini & Kay',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/abb921e001a71669b018b6f283c86e42.jpeg',
        },
        {
            id: 'liniya-briketirovaniya-1200',
            capacity: '1200 кг/час',
            name: 'Линия по производству топливных брикетов 1200 кг/час',
            price: 'от 23 173 000 руб.',
            power: '255 кВт',
            rawMaterial: 'Опил, щепа, горбыль, лузга',
            product: 'Топливный брикет Pini & Kay',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/abb921e001a71669b018b6f283c86e42.jpeg',
        },
        {
            id: 'liniya-briketirovaniya-2000',
            capacity: '2000 кг/час',
            name: 'Линия по производству топливных брикетов 2000 кг/час',
            price: 'от 33 030 000 руб.',
            power: '398 кВт',
            rawMaterial: 'Опил, щепа, горбыль, лузга',
            product: 'Топливный брикет Pini & Kay',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/abb921e001a71669b018b6f283c86e42.jpeg',
        },
    ],
    granulation: [
        {
            id: 'liniya-granulirovaniya-500',
            capacity: '500 кг/час',
            name: 'Линия по производству топливных пеллет 500 кг/час',
            price: 'от 9 200 000 руб.',
            power: '95 кВт',
            rawMaterial: 'Опил, щепа, солома, лузга',
            product: 'Топливная пеллета ENplus A1/A2',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/518ec9d62bcc1764ecc5a417a6142494.jpeg',
        },
        {
            id: 'liniya-granulirovaniya-1000',
            capacity: '1000 кг/час',
            name: 'Линия по производству топливных пеллет 1000 кг/час',
            price: 'от 14 800 000 руб.',
            power: '165 кВт',
            rawMaterial: 'Опил, щепа, солома, лузга',
            product: 'Топливная пеллета ENplus A1/A2',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/518ec9d62bcc1764ecc5a417a6142494.jpeg',
        },
        {
            id: 'liniya-granulirovaniya-1200',
            capacity: '1200 кг/час',
            name: 'Линия по производству топливных пеллет 1200 кг/час',
            price: 'от 21 500 000 руб.',
            power: '240 кВт',
            rawMaterial: 'Опил, щепа, солома, лузга',
            product: 'Топливная пеллета ENplus A1/A2',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/518ec9d62bcc1764ecc5a417a6142494.jpeg',
        },
        {
            id: 'liniya-granulirovaniya-2000',
            capacity: '2000 кг/час',
            name: 'Линия по производству топливных пеллет 2000 кг/час',
            price: 'от 31 700 000 руб.',
            power: '380 кВт',
            rawMaterial: 'Опил, щепа, солома, лузга',
            product: 'Топливная пеллета ENplus A1/A2',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/518ec9d62bcc1764ecc5a417a6142494.jpeg',
        },
    ],
    drying: [
        {
            id: 'sushilnaya-liniya-500',
            capacity: '500 кг/час',
            name: 'Сушильная линия 500 кг/час',
            price: 'от 4 100 000 руб.',
            power: '45 кВт',
            rawMaterial: 'Опил, щепа, кора, лузга',
            product: 'Сухое сырьё W ≤ 12%',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/7c284415a228428e5e8d7247ad3d2a52.jpeg',
        },
        {
            id: 'sushilnaya-liniya-1000',
            capacity: '1000 кг/час',
            name: 'Сушильная линия 1000 кг/час',
            price: 'от 6 800 000 руб.',
            power: '80 кВт',
            rawMaterial: 'Опил, щепа, кора, лузга',
            product: 'Сухое сырьё W ≤ 12%',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/7c284415a228428e5e8d7247ad3d2a52.jpeg',
        },
        {
            id: 'sushilnaya-liniya-1200',
            capacity: '1200 кг/час',
            name: 'Сушильная линия 1200 кг/час',
            price: 'от 9 400 000 руб.',
            power: '110 кВт',
            rawMaterial: 'Опил, щепа, кора, лузга',
            product: 'Сухое сырьё W ≤ 12%',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/7c284415a228428e5e8d7247ad3d2a52.jpeg',
        },
        {
            id: 'sushilnaya-liniya-2000',
            capacity: '2000 кг/час',
            name: 'Сушильная линия 2000 кг/час',
            price: 'от 14 600 000 руб.',
            power: '170 кВт',
            rawMaterial: 'Опил, щепа, кора, лузга',
            product: 'Сухое сырьё W ≤ 12%',
            image: 'https://static.readdy.ai/image/256c1827c8dbb947fa0f657e67320584/7c284415a228428e5e8d7247ad3d2a52.jpeg',
        },
    ],
};
