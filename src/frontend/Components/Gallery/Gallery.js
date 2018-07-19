import React, { Component } from 'react';
import Team from '../Teams/Team.js';
import './Gallery.css';


export default class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            teams: null,
            randomise: false
        }
        this.randomClickHandler = this.randomClickHandler.bind(this);
        this.randomise = this.randomise.bind(this);
    }

    componentDidMount() {
        fetch('/country/teams')
            .then(res => res.json())
            .then(teams => {
                let teamA = teams.Teams;
                let fullList = this.randomisePlayerHandler(teamA)
                this.setState({teams: fullList})
            })
    }

    randomClickHandler(teams){
        let randomteam = this.randomiseTeams(teams);
        let fullList = this.randomisePlayerHandler(randomteam)
        this.setState({teams: fullList})
        this.setState({randomise: !this.state.randomise})
    }

    randomiseTeams(teams){
        let i = teams.length, temp, index;
            while (i > 0) {
                index = Math.floor(Math.random() * i);
                i--;
                temp = teams[i];
                teams[i] = teams[index];
                teams[index] = temp;
            }
        return teams;
    }

    randomisePlayerHandler(teams){
        for(let i = 0; i < teams.length; i++){
            console.log(teams[i]['secondPlayer'])
            if(teams[i]['secondPlayer']===''){
                teams[i]['secondPlayer'] = this.randomiseList(teams);
            }
        }
        return teams;
    }

    randomiseList(teams){
        let arrayOfPlayers = [];
        for(let i = 0; i < teams.length; i++){
            arrayOfPlayers.push(teams[i]['firstPlayer']);
            if(teams[i]['secondPlayer'] !== ''){
                arrayOfPlayers.push(teams[i]['secondPlayer'])
            }
        }
        let randomNumber =  Math.floor(Math.random() * arrayOfPlayers.length);
        return arrayOfPlayers[randomNumber];
    }

    randomise(){
        this.setState({randomise: !this.state.randomise})
    }

    render() {
        let teams = this.state.teams;
        console.log(teams)

        if (teams === null ) {
            return <div>Loading...</div>
        }

        if(this.state.randomise){
            this.randomClickHandler(teams)
        }

           return (
            <div>
                <h1>KODIRI FOOSBALL TOURNAMENT</h1>
                <button onClick={this.randomise} className="random-btn">Random</button>
                <div className="country-container">
                    {teams.map(team => <Team
                        key={team.id}
                        firstPlayerName={team.firstPlayer}
                        secondPlayerName={team.secondPlayer}
                        src={require(`../Common/Images/${team.id}.jpg`)}
                        alt={team.country} />)}
                </div>
                <img className="trophy" src={require(`../Common/Images/trophy.jpg`)} alt="trophy"/>
            </div>
        ) 
    }
}