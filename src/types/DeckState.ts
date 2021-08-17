export interface ICard {
    key: string;
    flipCard: (str?: string) => void;
}

export default interface IState {
    deck: string[];
    currentlyChosen?: ICard[];
    matchedCards: number;
}