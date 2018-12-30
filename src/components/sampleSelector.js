import React from "react";
import {Col} from 'antd';

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
            <Col span={1.26}>
                <select className="selector" autoFocus value={this.props.selectedDrum} onChange={this.props.onSelectDrum.bind(this)} onBlur={this.close}>{this.props.createdDrums}</select>
            </Col>
        )
    };
}
