import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import IState from '../types/CardState';

export default function Card(props: IState) {
    const { img } = props;
    const [isFlipped, setIsFlipped] =  useState<boolean>(false);

    function cardDiv(className: string, src: string): JSX.Element {
        return (
            <button onClick={handleClick} className={`card-div ${className}`}>
                <img id="card-img" src={src} alt={img} />
            </button>
        );
    }

    function flipCard(str?: string) {
        console.log(str ? str : 'flip!')
        setIsFlipped(!isFlipped)
    }

    function handleClick() {
        flipCard();
        props.checkCard({ key: img, flipCard })
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <>{cardDiv('unflipped', '/images/nintendo.png')}</>
            <>{cardDiv('flipped', img)}</>
        </ReactCardFlip>
    )
}
