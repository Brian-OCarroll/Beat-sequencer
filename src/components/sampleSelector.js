import React from "react";


export default class SampleSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };


    }
//need to use state

    render() {
        return (
            <div>
                <select className="selector" autoFocus value={this.props.selectedDrum} onChange={this.props.onSelectDrum.bind(this)} onBlur={this.close}>{this.props.createdDrums}</select>
            </div>
        )
    };
}
