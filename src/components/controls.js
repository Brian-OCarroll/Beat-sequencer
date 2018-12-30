import React from 'react';
//control buttons
export default function Controls(props) {
    
        
            //alternate between text displaying Pause and Play
            let buttonText = props.playing ? 'Pause' : 'Play';
            return (
                <div className="controls">
                    <button className="control_buttons" onClick={() => props.togglePlaying()}>{buttonText}</button>
                    <div className="bpm">
                        <label>BPM:</label>
                        <input
                            type="range"
                            id="bpm"
                            min="1"
                            max="210"
                            step="1"
                            defaultValue={props.bpm}
                            onChange={props.handleChange} />
                        <output>
                            {props.bpm}
                        </output>
                    </div>
                    <button className="control_buttons" onClick={() => props.addNewPads()}>+</button>
                </div>
            );
        
    
}

