import Cell from '../Cell/Cell';

export default class Street extends Cell {
  constructor(type, name, position, cost, rent,
    rentWithOneHouse, rentWhithTwoHouses, rentWithTreeHouses, rentWhithFourHouses,
    rentWhithHotel, houseCost, kitSize, kitId) {
    super(type, name, position);
    this.cost = cost;
    this.rent = rent;
    this.rentWithOneHouse = rentWithOneHouse;
    this.rentWhithTwoHouses = rentWhithTwoHouses;
    this.rentWithTreeHouses = rentWithTreeHouses;
    this.rentWhithFourHouses = rentWhithFourHouses;
    this.rentWhithHotel = rentWhithHotel;
    this.houseCost = houseCost;
    this.kitSize = kitSize;
    this.kitId = kitId;
  }

  set owner(owner) {
    this._owner = owner;
  }

  get owner() {
    return this._owner;
  }

  set currentRent(newRent) {
    this._currentRent = newRent;
  }

  get currentRent() {
    return this._currentRent;
  }
}
