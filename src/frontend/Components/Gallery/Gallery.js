import React, { Component } from 'react';
import Team from '../Teams/Team.js';
import './Gallery.css';


export default class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            teams: null,
            randomise: false,
            players: null
        }
        this.randomClickHandler = this.randomClickHandler.bind(this);
        this.randomise = this.randomise.bind(this);
    }

    componentDidMount() {
        fetch('/rest/country/teams')
            .then(res => res.json())
            .then(teams => {
                let teamA = teams.Teams;
                let players = teams.Players;
                let fullListOfPlayers = this.randomisePlayerHandler(players, teamA);
                let teamSheet = this.inputPlayerHandlers(fullListOfPlayers, teamA);
                this.setState({teams: teamSheet, players: fullListOfPlayers});
            })
    }    
    
    randomisePlayerHandler(players, teams){ 
        let newPlayers = [...players];
        for (let i = newPlayers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = newPlayers[i];
            newPlayers[i] = newPlayers[j];
            newPlayers[j] = temp;
        }
        if(newPlayers.length < teams.length*2){
            for(let i = (teams.length*2) - newPlayers.length; i > 0 ; i--){
                let j = Math.floor(Math.random() * (newPlayers.length));
                newPlayers.push(newPlayers[j]);
            }
        }
        return newPlayers;
    }

    inputPlayerHandlers(fullListOfPlayers, teamA){
        let newListofPlayers = fullListOfPlayers.slice();
        for(let i = 0; i < teamA.length; i++){
            teamA[i]['firstPlayer'] = newListofPlayers.shift(newListofPlayers[0]);
            teamA[i]['secondPlayer'] = newListofPlayers.shift(newListofPlayers[1]);
        }
        return teamA;
    }

    randomClickHandler(players, teams){
            let randomPLayers = this.randomisePlayerHandler(players, teams);
            let randomteam = this.inputPlayerHandlers(randomPLayers, teams);
            let random = this.randomiseTeams(randomteam);
            this.setState({teams: random, randomise: !this.state.randomise})
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


    randomise(){
        let iterationCount = 0;
        let totalIterations = 30;
        let intervalId = setInterval(() => {
            this.setState({randomise: !this.state.randomise});
            if(iterationCount >= totalIterations) {
                clearInterval(intervalId);
            }
            iterationCount++;
        }, 100)
       
    }

    render() {
        let {teams, players} = this.state;

        console.log(teams, players);

        if (teams === null ) {
            return <div>Loading...</div>
        }

        if(this.state.randomise){
            this.randomClickHandler(players, teams)
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