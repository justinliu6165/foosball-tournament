import React from 'react';
import './Team.css'

export default function Team(props) {
    return (
        <div className="country">
            <img src={props.src} alt={props.alt}/>
            <div className="member">{props.firstPlayerName}</div>
            <div className="member">{props.secondPlayerName}</div>
        </div>
    )
}