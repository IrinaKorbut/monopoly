import Cell from '../Cell/Cell';
import Communal from '../Communal/Communal';
import Railroad from '../Railroad/Railroad';
import Street from '../Street/Street';
import Tax from '../Tax/Tax';

export default [
  new Cell('start', 'Start', 0),
  new Street('street', 'Mediterranean Avenue', 1, 60, 2, 10, 30, 90, 160, 250, 50, 2, 1),
  new Cell('chest', 'Chest', 2), // chest,
  new Street('street', 'Baltic Avenue', 3, 70, 4, 20, 60, 180, 320, 450, 50, 2, 1),
  new Tax('tax', 'City Tax', 4, 200),
  new Railroad('railroad', 'Reading Railroad', 5),
  new Street('street', 'Oriental Avenue', 6, 100, 6, 30, 90, 270, 400, 550, 50, 3, 2),
  new Cell('chance', 'Chance', 7), // chance
  new Street('street', 'Vermont Avenue', 8, 100, 6, 30, 90, 270, 400, 550, 50, 3, 2),
  new Street('street', 'Connecticut Avenue', 9, 120, 8, 40, 100, 300, 450, 600, 50, 3, 2),
  new Cell('jail', 'Jail', 10), // jail,
  new Street('street', 'St. Charles Place', 11, 140, 10, 50, 150, 450, 625, 750, 100, 3, 3),
  new Communal('communal', 'Electric Company', 12, 150, 2, 9), 
  new Street('street', 'States Avenue', 13, 140, 10, 50, 150, 450, 625, 750, 100, 3, 3),
  new Street('street', 'Virginia Avenue', 14, 160, 12, 60, 180, 500, 700, 900, 100, 3, 3),
  new Railroad('railroad', 'Pennsylvania Railroad', 15),
  new Street('street', 'St. James Place', 16, 180, 14, 70, 200, 550, 750, 950, 100, 3, 4),
  new Cell('chest', 'Chest', 17), // chest
  new Street('street', 'Tennessee Avenue', 18, 180, 14, 70, 200, 550, 750, 950, 100, 3, 4),
  new Street('street', 'New York Avenue', 19, 200, 16, 80, 220, 600, 800, 1000, 100, 3, 4),
  new Cell('parking', 'Free Parking', 20),
  new Street('street', 'Kentucky Avenue', 21, 220, 18, 90, 250, 700, 875, 1050, 150, 3, 5),
  new Cell('chance', 'Chance', 22), // chance
  new Street('street', 'Indiana Avenue', 23, 220, 18, 90, 250, 700, 875, 1050, 150, 3, 5),
  new Street('street', 'Illinois Avenue', 24, 240, 20, 100, 300, 750, 925, 1100, 150, 3, 5),
  new Railroad('railroad', 'B&O Railroad', 25),
  new Street('street', 'Atlantic Avenue', 26, 260, 22, 110, 330, 800, 975, 1150, 150, 3, 6),
  new Street('street', 'Ventnor Avenue', 27, 260, 22, 110, 330, 800, 975, 1150, 150, 3, 6),
  new Communal('communal', 'Water Works', 28, 150, 2, 9),
  new Street('street', 'Marvin Gardens', 29, 280, 24, 120, 360, 850, 1025, 1200, 150, 3, 6),
  new Cell('goToJail', 'Go To Jail', 30), // go to jail
  new Street('street', 'Pacific Avenue', 31, 300, 26, 130, 390, 900, 1100, 1275, 200, 3, 7),
  new Street('street', 'North Carolina Avenue', 32, 300, 26, 130, 390, 900, 1100, 1275, 200, 3, 7),
  new Cell('chest', 'Chest', 33), // chest
  new Street('street', 'Pennsylvania Avenue', 34, 320, 30, 150, 450, 1000, 1200, 1400, 200, 3, 7),
  new Railroad('railroad', 'Short Line', 35),
  new Cell('chance', 'Chance', 36), // chance
  new Street('street', 'Park Place', 37, 350, 35, 175, 500, 1100, 1300, 1500, 200, 2, 8),
  new Tax('tax', 'Luxury Tax', 38, 100),
  new Street('street', 'Boardwalk', 39, 400, 50, 200, 600, 1400, 1700, 2000, 200, 2, 8),
];
