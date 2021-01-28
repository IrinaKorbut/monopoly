import Cell from '../Cell/Cell';
import Property from '../ifacies/Property';
import Player from '../Player/Player';

export default class Street extends Cell implements Property{
  readonly cost: number;
  readonly rent: number;
  readonly rentWithOneHouse: number;
  readonly rentWhithTwoHouses: number;
  readonly rentWithTreeHouses: number;
  readonly rentWhithFourHouses: number;
  readonly rentWhithHotel: number;
  readonly houseCost: number;
  readonly kitSize: number;
  readonly kitId: number;
  isAvailableToBuyHouse: boolean = false;
  numberOfHouses: number = 0;
  isThereHotel: boolean = false;
  owner: Player;
  private _currentRent: number;

  constructor(type: string, name: string, russianName: string, belarusianName: string, position: number, cost: number, rent: number,
    rentWithOneHouse: number, rentWhithTwoHouses: number, rentWithTreeHouses: number, rentWhithFourHouses: number,
    rentWhithHotel: number, houseCost: number, kitSize: number, kitId: number) {
    super(type, name, russianName, belarusianName, position);
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

  set currentRent(newRent: number) {
    this._currentRent = newRent;
  }

  get currentRent() {
    return this._currentRent;
  }
}