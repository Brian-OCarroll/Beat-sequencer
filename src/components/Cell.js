import React from 'react';
import './cell.css'
export default function Cell(props) {
    return(
            <div className="cell" style={{backgroundColor:props.color}} onClick={props.clapActivate}></div>
    )
}