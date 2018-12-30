import React from 'react';
import {Col} from 'antd'
export default function Pad(props) {
    return (
        //use conditional classname to update the style 
        //depending on status of pad
      <Col span={1}>
            <div
            className={"pad " + (props.state === 1 ? 'active' : '') + (props.pos === props.id ? ' playing' : '')}
            id = {"pad"+props.padNumber}
            onClick={() => props.toggleActive(props.rowIndex, props.id)}>
            </div>
        </Col>
    )
}