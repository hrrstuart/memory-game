import React from 'react';
import Card from './Card';
import IState from '../types/DeckState';
import { ICard } from '../types/DeckState';

export default class Deck extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            deck: []
        }
        this.checkCard = this.checkCard.bind(this);
    }

    async componentDidMount() {
        await this.createDeck();
        this.shuffleDeck();
    }
    
    async createDeck() {
        const array = ["mario", "luigi", "peach", "toad", "yoshi", "lwario", "wario", "bowser"]
            .map(img => `/images/${img}.png`);

        await this.setState({ deck: [ ...array, ...array ] });
    }

    shuffleDeck() {
        const arr = this.state.deck;
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        this.setState({ deck: arr });
    }

    checkCard(chosenCard: ICard): void {
        chosenCard.flipCard();
        if (!this.state.currentlyChosen) {
            this.setState({ currentlyChosen: [ chosenCard ] });
        }
        else {
            const otherChoice: ICard = this.state.currentlyChosen[0];
            if (otherChoice.key === chosenCard.key) {
                alert('yes');
            }
            else {
                alert('no');
            }
        }
    }

    render() {
        const returnCards = (): JSX.Element[] => {
            return this.state.deck.map((img, index) => (
                <li key={index}>
                    <Card img={img} key={img} checkCard={this.checkCard} />
                </li>
            ));
        };

        return (
            <div className="deck">
                <ul>
                    {returnCards()}
                </ul>
            </div>
        )
    }
}
