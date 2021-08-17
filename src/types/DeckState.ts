export interface ICard {
    key: string;
    flipCard: () => void;
}

export default interface IState {
    deck: string[];
    currentlyChosen?: ICard[];
}