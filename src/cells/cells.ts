import Cell from '../Cell/Cell';
import Communal from '../Communal/Communal';
import Railroad from '../Railroad/Railroad';
import Street from '../Street/Street';
import Tax from '../Tax/Tax';

export default [
  new Cell('start', 'Start', 'Старт', 'Старт', 0),
  new Street('street', 'Mediterranean Avenue', 'Малинина', 'Малініна', 1, 60, 2, 10, 30, 90, 160, 250, 50, 2, 1, 30, 33),
  new Cell('chest', 'Chest', 'Сундук', 'Куфар', 2), // chest,
  new Street('street', 'Baltic Avenue', 'Плеханова', 'Пляханава', 3, 70, 4, 20, 60, 180, 320, 450, 50, 2, 1, 30, 33),
  new Tax('tax', 'City Tax', 'Городской налог', 'Гарадскі падатак', 4, 200),
  new Railroad('railroad', 'Reading Railroad', 'Гомель Пасажирский', 'Гомель Пасажырскі', 5),
  new Street('street', 'Oriental Avenue', 'Кольцова', 'Кальцова', 6, 100, 6, 30, 90, 270, 400, 550, 50, 3, 2, 50, 55),
  new Cell('chance', 'Chance', 'Шанс', 'Шанец', 7), // chance
  new Street('street', 'Vermont Avenue', 'Широкая', 'Шырокая', 8, 100, 6, 30, 90, 270, 400, 550, 50, 3, 2, 50, 55),
  new Street('street', 'Connecticut Avenue', 'Калинина', 'Калініна', 9, 120, 8, 40, 100, 300, 450, 600, 50, 3, 2, 60, 66),
  new Cell('jail', 'Jail', 'Тюрьма', 'Астрог', 10), // jail,
  new Street('street', 'St. Charles Place', 'Окрестина', 'Акрэсціна', 11, 140, 10, 50, 150, 450, 625, 750, 100, 3, 3, 70, 77),
  new Communal('communal', 'Electric Company', 'Электрическая компания', 'Электрычная кампанія', 12, 150, 2, 9), 
  new Street('street', 'States Avenue', 'Володько', 'Валадзько', 13, 140, 10, 50, 150, 450, 625, 750, 100, 3, 3, 70, 77),
  new Street('street', 'Virginia Avenue', 'Свердлова', 'Свярдлова', 14, 160, 12, 60, 180, 500, 700, 900, 100, 3, 3, 80, 88),
  new Railroad('railroad', 'Pennsylvania Railroad', 'Минск Пасажирский', 'Мінск Пасажырскі', 15),
  new Street('street', 'St. James Place', 'Московская', 'Маскоўская', 16, 180, 14, 70, 200, 550, 750, 950, 100, 3, 4, 90, 99),
  new Cell('chest', 'Chest', 'Сундук', 'Куфар', 17), // chest
  new Street('street', 'Tennessee Avenue', 'Бобруйская', 'Бабруйская', 18, 180, 14, 70, 200, 550, 750, 950, 100, 3, 4, 90, 99),
  new Street('street', 'New York Avenue', 'Пл. Ленина', 'Пл. Леніна', 19, 200, 16, 80, 220, 600, 800, 1000, 100, 3, 4, 100, 110),
  new Cell('parking', 'Free Parking', 'Козлова', 'Казлова', 20),
  new Street('street', 'Kentucky Avenue', 'Я. Брыля', 'Я. Брыля', 21, 220, 18, 90, 250, 700, 875, 1050, 150, 3, 5, 110, 121),
  new Cell('chance', 'Chance', 'Шанс', 'Шанец', 22), // chance
  new Street('street', 'Indiana Avenue', 'Маяковского', 'Маякоўскага', 23, 220, 18, 90, 250, 700, 875, 1050, 150, 3, 5, 110, 121),
  new Street('street', 'Illinois Avenue', 'Семашко', 'Сямашка', 24, 240, 20, 100, 300, 750, 925, 1100, 150, 3, 5, 120, 132),
  new Railroad('railroad', 'B&O Railroad', 'Витебск Пасажирский', 'Віцебск Пасажырскі', 25),
  new Street('street', 'Atlantic Avenue', 'Новая Боровая', 'Новая Баравая', 26, 260, 22, 110, 330, 800, 975, 1150, 150, 3, 6, 130, 143),
  new Street('street', 'Ventnor Avenue', 'пр. Победителей', 'пр. Пераможцаў', 27, 260, 22, 110, 330, 800, 975, 1150, 150, 3, 6, 130, 143),
  new Communal('communal', 'Water Works', 'Водные Работы', 'Водныя Работы', 28, 150, 2, 9),
  new Street('street', 'Marvin Gardens', 'К. Цеткин', 'К. Цэткін', 29, 280, 24, 120, 360, 850, 1025, 1200, 150, 3, 6, 140, 154),
  new Cell('goToJail', 'Go To Jail', 'Аранская', 'Аранская', 30), // go to jail
  new Street('street', 'Pacific Avenue', 'Кирова', 'Кірава', 31, 300, 26, 130, 390, 900, 1100, 1275, 200, 3, 7, 150, 165),
  new Street('street', 'North Carolina Avenue', 'Я. Купалы', 'Я. Купалы', 32, 300, 26, 130, 390, 900, 1100, 1275, 200, 3, 7, 150, 165),
  new Cell('chest', 'Chest', 'Сундук', 'Куфар', 33), // chest
  new Street('street', 'Pennsylvania Avenue', 'Ленина', 'Леніна', 34, 320, 30, 150, 450, 1000, 1200, 1400, 200, 3, 7, 160, 176),
  new Railroad('railroad', 'Short Line', 'Могилев Пасажирский', 'Магілёў Пасажырскі', 35),
  new Cell('chance', 'Chance', 'Шанс', 'Шанец', 36), // chance
  new Street('street', 'Park Place', 'Энгельса', 'Энгельса', 37, 350, 35, 175, 500, 1100, 1300, 1500, 200, 2, 8, 175, 193),
  new Tax('tax', 'Luxury Tax', 'Зыбицкая', 'Зыбіцкая', 38, 100),
  new Street('street', 'Boardwalk', 'Немига', 'Няміга', 39, 400, 50, 200, 600, 1400, 1700, 2000, 200, 2, 8, 200, 220),
];
