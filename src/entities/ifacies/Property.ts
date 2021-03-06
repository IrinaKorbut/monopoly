import Player from "../Player/Player";

export default interface Property {
  readonly name: string;
  readonly russianName: string;
  readonly belarusianName: string;
  readonly kitSize?: number;
  readonly kitId?: number;
  readonly cost?: number;
  readonly element: HTMLElement;
  readonly rent?: number;
  readonly type: string;
  readonly pledgePrice?: number;
  readonly redemptionPrice?: number;
  isPredge?: Boolean;
  owner?: Player;
  currentRent?: number;
  isAvailableToBuyHouse?: boolean;
  numberOfHouses?: number;
  isThereHotel?: boolean;
}