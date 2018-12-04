import React from 'react';
import Cell from './Cell';
import {defaultPads, nullPads} from '../assets/gridPads';
import Tone from 'tone';
export default class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lightActive: false
        }
        const drumSamples = new Tone.Multiplayer({
            urls:{
                kick: '../samples/kick.wav',
                snare: '../samples/Snare.wav',
                closedHat: '../samples/ClosedHat.wav',
                clap: '../samples/Clap.wav',
                clave: '../samples/Clave.wav',
                lowTom: '../samples/LowTom.wav',
                closedHat: '../samples/ClosedHat.wav',
                openHat: '../samples/OpenHat.wav',
                highTom: '../samples/HighTom.wav'
            }
        }).toMaster();
    }
    ClickLight = () => {
        const currentLight = this.state.lightActive;
        this.setState({
            lightActive: !currentLight
        })
    }
    
    render() {
        let backgroundColor='blue'
        if(this.state.lightActive) {
               backgroundColor= 
                'green'
            
        }
        return (
            <div className="clap">
                <Cell color={backgroundColor} clapActivate={this.ClickLight}/>
                <Cell color={backgroundColor} clapActivate={this.ClickLight}/>
                <Cell color={backgroundColor} clapActivate={this.ClickLight}/>
                <Cell color={backgroundColor} clapActivate={this.ClickLight}/>
                <Cell color={backgroundColor} clapActivate={this.ClickLight}/>
                <Cell color={backgroundColor} clapActivate={this.ClickLight}/>
                <Cell color={backgroundColor} clapActivate={this.ClickLight}/>
                <Cell color={backgroundColor} clapActivate={this.ClickLight}/>
            </div>
        )
        
    }
}