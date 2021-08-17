import { ICard } from "./DeckState";

export default interface IState {
    img: string;
    key: string;
    checkCard: (chosenCard: ICard) => void;
}