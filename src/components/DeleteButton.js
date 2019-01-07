import React from 'react';
import {Col} from 'antd';
import erase from '../assets/images/eraser.svg'    
import delete1 from '../assets/images/delete.svg'
export default function DeleteBtn(props) {
  //change button to image
        return (
            <Col span={1.33} className="DeleteBtn">
                <img src={erase}  className="clearIcon" alt="clear" onClick={() => props.clearRow(props.rowIndex)} text="clear"/>
                <img src={delete1}  className="deleteIcon" alt="delete" onClick={() => props.deleteRow(props.rowIndex)} />
            </Col>
        )
    
  }

