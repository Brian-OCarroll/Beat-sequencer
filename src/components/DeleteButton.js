import React from 'react';
export default class DeleteBtn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

        };
    }
  //change button to image
    render() {
        return (
            <div className="DeleteBtn">
                <button  className="clearIcon" alt="clear" onClick={() => this.props.clearRow(this.props.rowIndex)} text="clear"/>
                <button  className="deleteIcon" alt="delete" onClick={() => this.props.deleteRow(this.props.rowIndex)} />
            </div>
        )
    };
  }

