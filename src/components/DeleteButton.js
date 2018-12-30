import React from 'react';
import {Col} from 'antd';
export default function DeleteBtn(props) {
    
  //change button to image
        return (
            <Col span={1.33} className="DeleteBtn">
                <button  className="clearIcon" alt="clear" onClick={() => props.clearRow(props.rowIndex)} text="clear"/>
                <button  className="deleteIcon" alt="delete" onClick={() => props.deleteRow(props.rowIndex)} />
            </Col>
        )
    
  }

