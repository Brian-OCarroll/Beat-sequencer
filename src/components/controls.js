import React, { Component } from 'react';
//control buttons
export default class Controls extends React.Component {
    constructor(props) {
        super(props);
    }
        render() {
            //alternate between text displaying Pause and Play
            let buttonText = this.props.playing ? 'Pause' : 'Play';
            return (
                <div className="controls">
                    <button className="control_buttons" onClick={() => this.props.togglePlaying()}>{buttonText}</button>
                    <div className="bpm">
                        <label>BPM:</label>
                        <input
                            type="range"
                            id="bpm"
                            min="1"
                            max="210"
                            step="1"
                            defaultValue={this.props.bpm}
                            onChange={this.props.handleChange} />
                        <output>
                            {this.props.bpm}
                        </output>
                    </div>
                    <button className="control_buttons" onClick={() => this.props.addNewPads()}>+</button>
                </div>
            );
        }
    
}

