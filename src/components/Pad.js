import React from 'react';

export default function Pad(props) {
    return (
        <div 
        className={"pad " + (props.state === 1 ? 'active' : '') + (props.pos === props.id ? ' playing' : '')}
        id = {"pad"+props.padNumber}
        onClick={() => props.toggleActive(props.rowIndex, props.id)}>
    </div>
    )
}