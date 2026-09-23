// Каталог магазина. Файл собирается скриптом demos/gen_shop.py —
// товары и цены правятся там, вёрстку трогать не нужно.
window.CATS = {
  "dishes": "Посуда",
  "textile": "Текстиль",
  "light": "Свет",
  "decor": "Декор"
};

window.SHOP = {
  "delivery": 390,
  "free_from": 5000,
  "promo": "ОХРА10",
  "promo_off": 10
};

window.PRODUCTS = [
  {
    "id": "d1",
    "name": "Тарелка «Глина» 27 см",
    "cat": "dishes",
    "price": 890,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/d1.jpg"
  },
  {
    "id": "d2",
    "name": "Набор тарелок «Охра», 4 шт",
    "cat": "dishes",
    "price": 3400,
    "old": 4200,
    "tag": "скидка",
    "stock": true,
    "img": "assets/d2.jpg"
  },
  {
    "id": "d3",
    "name": "Кружка «Песок» 350 мл",
    "cat": "dishes",
    "price": 690,
    "old": 0,
    "tag": "хит",
    "stock": true,
    "img": "assets/d3.jpg"
  },
  {
    "id": "d4",
    "name": "Чайник заварочный, стекло 800 мл",
    "cat": "dishes",
    "price": 2190,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/d4.jpg"
  },
  {
    "id": "d5",
    "name": "Салатник «Волна» 24 см",
    "cat": "dishes",
    "price": 1450,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/d5.jpg"
  },
  {
    "id": "d6",
    "name": "Блюдо овальное «Лён» 35 см",
    "cat": "dishes",
    "price": 1890,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/d6.jpg"
  },
  {
    "id": "d7",
    "name": "Набор стаканов гранёных, 6 шт",
    "cat": "dishes",
    "price": 1690,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/d7.jpg"
  },
  {
    "id": "d8",
    "name": "Кофейная пара «Тон»",
    "cat": "dishes",
    "price": 1190,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/d8.jpg"
  },
  {
    "id": "d9",
    "name": "Доска разделочная, дуб",
    "cat": "dishes",
    "price": 2450,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/d9.jpg"
  },
  {
    "id": "d10",
    "name": "Супница с крышкой 2 л",
    "cat": "dishes",
    "price": 3290,
    "old": 0,
    "tag": "",
    "stock": false,
    "img": "assets/d10.jpg"
  },
  {
    "id": "d11",
    "name": "Кувшин керамика 1,2 л",
    "cat": "dishes",
    "price": 1990,
    "old": 2490,
    "tag": "скидка",
    "stock": true,
    "img": "assets/d11.jpg"
  },
  {
    "id": "d12",
    "name": "Соусник «Капля»",
    "cat": "dishes",
    "price": 590,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/d12.jpg"
  },
  {
    "id": "t1",
    "name": "Скатерть лён 140×200",
    "cat": "textile",
    "price": 3890,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t1.jpg"
  },
  {
    "id": "t2",
    "name": "Набор салфеток лён, 4 шт",
    "cat": "textile",
    "price": 1290,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t2.jpg"
  },
  {
    "id": "t3",
    "name": "Полотенце вафельное 50×70",
    "cat": "textile",
    "price": 690,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t3.jpg"
  },
  {
    "id": "t4",
    "name": "Плед шерсть 130×170",
    "cat": "textile",
    "price": 5900,
    "old": 6900,
    "tag": "скидка",
    "stock": true,
    "img": "assets/t4.jpg"
  },
  {
    "id": "t5",
    "name": "Наволочка декоративная 45×45",
    "cat": "textile",
    "price": 1190,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t5.jpg"
  },
  {
    "id": "t6",
    "name": "Штора лён 145×270",
    "cat": "textile",
    "price": 4500,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t6.jpg"
  },
  {
    "id": "t7",
    "name": "Дорожка на стол 40×140",
    "cat": "textile",
    "price": 1590,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t7.jpg"
  },
  {
    "id": "t8",
    "name": "Фартук хлопок",
    "cat": "textile",
    "price": 1890,
    "old": 0,
    "tag": "хит",
    "stock": true,
    "img": "assets/t8.jpg"
  },
  {
    "id": "t9",
    "name": "Покрывало стёганое 180×220",
    "cat": "textile",
    "price": 6900,
    "old": 0,
    "tag": "",
    "stock": false,
    "img": "assets/t9.jpg"
  },
  {
    "id": "t10",
    "name": "Кухонные полотенца, 3 шт",
    "cat": "textile",
    "price": 1490,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t10.jpg"
  },
  {
    "id": "t11",
    "name": "Прихватка «Соль»",
    "cat": "textile",
    "price": 490,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t11.jpg"
  },
  {
    "id": "t12",
    "name": "Коврик хлопок 60×90",
    "cat": "textile",
    "price": 2290,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/t12.jpg"
  },
  {
    "id": "l1",
    "name": "Настольная лампа «Купол»",
    "cat": "light",
    "price": 6900,
    "old": 0,
    "tag": "хит",
    "stock": true,
    "img": "assets/l1.jpg"
  },
  {
    "id": "l2",
    "name": "Подвесной светильник, ротанг",
    "cat": "light",
    "price": 8400,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/l2.jpg"
  },
  {
    "id": "l3",
    "name": "Бра «Дуга»",
    "cat": "light",
    "price": 5200,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/l3.jpg"
  },
  {
    "id": "l4",
    "name": "Торшер металл и лён",
    "cat": "light",
    "price": 11900,
    "old": 13500,
    "tag": "скидка",
    "stock": true,
    "img": "assets/l4.jpg"
  },
  {
    "id": "l5",
    "name": "Гирлянда тёплая, 10 м",
    "cat": "light",
    "price": 1290,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/l5.jpg"
  },
  {
    "id": "l6",
    "name": "Свеча столбовая 15 см",
    "cat": "light",
    "price": 590,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/l6.jpg"
  },
  {
    "id": "l7",
    "name": "Подсвечник стекло",
    "cat": "light",
    "price": 990,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/l7.jpg"
  },
  {
    "id": "l8",
    "name": "Настольная лампа «Гриб»",
    "cat": "light",
    "price": 7500,
    "old": 0,
    "tag": "новинка",
    "stock": true,
    "img": "assets/l8.jpg"
  },
  {
    "id": "l9",
    "name": "Светильник настенный, дерево",
    "cat": "light",
    "price": 4900,
    "old": 0,
    "tag": "",
    "stock": false,
    "img": "assets/l9.jpg"
  },
  {
    "id": "l10",
    "name": "Лампа Эдисон, E27",
    "cat": "light",
    "price": 450,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/l10.jpg"
  },
  {
    "id": "l11",
    "name": "Подсвечники латунь, 3 шт",
    "cat": "light",
    "price": 2790,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/l11.jpg"
  },
  {
    "id": "l12",
    "name": "Ночник «Луна»",
    "cat": "light",
    "price": 2190,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/l12.jpg"
  },
  {
    "id": "c1",
    "name": "Ваза керамика «Форма» 30 см",
    "cat": "decor",
    "price": 3400,
    "old": 0,
    "tag": "хит",
    "stock": true,
    "img": "assets/c1.jpg"
  },
  {
    "id": "c2",
    "name": "Зеркало круглое 60 см",
    "cat": "decor",
    "price": 7900,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/c2.jpg"
  },
  {
    "id": "c3",
    "name": "Рама для фото, дуб 20×30",
    "cat": "decor",
    "price": 1290,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/c3.jpg"
  },
  {
    "id": "c4",
    "name": "Корзина плетёная, большая",
    "cat": "decor",
    "price": 2890,
    "old": 3400,
    "tag": "скидка",
    "stock": true,
    "img": "assets/c4.jpg"
  },
  {
    "id": "c5",
    "name": "Панно макраме",
    "cat": "decor",
    "price": 3900,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/c5.jpg"
  },
  {
    "id": "c6",
    "name": "Статуэтка «Камень»",
    "cat": "decor",
    "price": 1690,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/c6.jpg"
  },
  {
    "id": "c7",
    "name": "Сухоцветы, пампасная трава",
    "cat": "decor",
    "price": 890,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/c7.jpg"
  },
  {
    "id": "c8",
    "name": "Кашпо керамика 18 см",
    "cat": "decor",
    "price": 1590,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/c8.jpg"
  },
  {
    "id": "c9",
    "name": "Поднос латунь 35 см",
    "cat": "decor",
    "price": 3290,
    "old": 0,
    "tag": "",
    "stock": false,
    "img": "assets/c9.jpg"
  },
  {
    "id": "c10",
    "name": "Часы настенные «Круг»",
    "cat": "decor",
    "price": 4200,
    "old": 0,
    "tag": "новинка",
    "stock": true,
    "img": "assets/c10.jpg"
  },
  {
    "id": "c11",
    "name": "Книгодержатели мрамор, пара",
    "cat": "decor",
    "price": 3690,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/c11.jpg"
  },
  {
    "id": "c12",
    "name": "Диффузор «Кедр» 100 мл",
    "cat": "decor",
    "price": 2490,
    "old": 0,
    "tag": "",
    "stock": true,
    "img": "assets/c12.jpg"
  }
];
