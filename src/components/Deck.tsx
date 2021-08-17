import React from 'react';
import Card from './Card';
import IState from '../types/DeckState';
import { ICard } from '../types/DeckState';

export default class Deck extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            deck: [],
            matchedCards: 0
        }
        this.checkCard = this.checkCard.bind(this);
    }

    async componentDidMount(): Promise<void> {
        await this.createDeck();
        this.shuffleDeck();
    }
    
    async createDeck(): Promise<void> {
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
        const chosenCards = this.state.currentlyChosen;
        
        if (!chosenCards?.length) {
            this.setState({ currentlyChosen: [ chosenCard ] });
        }
        else {
            const otherChoice: ICard = chosenCards[0];
            if (otherChoice.key === chosenCard.key) {
                this.correctMatch(chosenCard, otherChoice);
            }
            else {
                this.incorrectMatch(chosenCard, otherChoice);
            }
            this.setState({ currentlyChosen: [] });
        }
    }

    correctMatch(fC: ICard, sC: ICard) {
        this.setState(prevState => {
            return {
                matchedCards: prevState.matchedCards + 1,
            }
        });
        fC.flipCard = () => {};
        sC.flipCard = () => {};
    }

    incorrectMatch(fC: ICard, sC: ICard) {
        setTimeout(() => {
            fC.flipCard('fC');
            sC.flipCard('sC');
        }, 600);
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
                <h1>Score: {this.state.matchedCards}</h1>
                <ul>
                    {returnCards()}
                </ul>
            </div>
        )
    }
}
