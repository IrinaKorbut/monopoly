import Player from "../Player/Player";

export default interface Property {
  readonly kitSize?: number;
  readonly kitId?: number;
  readonly cost: number;
  readonly element: HTMLElement;
  readonly rent?: number;
  readonly type: string;
  owner: Player;
  currentRent?: number;
  numberOfHouses?: number;
  isThereHotel?: boolean
  isAvailableToBuyHouse?: boolean;
}