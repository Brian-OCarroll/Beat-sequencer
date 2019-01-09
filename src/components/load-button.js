import React from "react";
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux'
//still need to connect pads and drums to sequencer container
export class LoadBtn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            selectedPads: [
                [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
                [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              ],
            selectedDrums: [130,125,145,140]
        }
        
    }
    componentDidUpdate() {
        this.props.clickPadButtons(this.state.selectedPads, this.state.selectedDrums)
        
    }
    onOpenModal = () => {
        this.setState({ open: true });
        console.log(this.props.log.id)
        // console.log(this.props.userpads[0].name)
    };

    //function to refresh parent state
    //callback

    // loadUsers() {
    //     return fetch(API_BASE_URL+'/drums', {
    //     headers:{
    //         'Authorization': `Bearer ${this.props.token}`
    //     }
    //     })
    //     .then(res => {return res.json()})
    //     .then(res => this.setState({ userPads: res }))
    //     .then(response => console.log('Success:',(response)))
    //     .then(console.log(this.state.userPads))
    //     .catch(error => console.error('Error:', error));
    // }
    onCloseModal = () => {
        this.setState({ open: false });
    };

    ClickPads = (rowIndex, event) => {
    console.log(rowIndex);
    // console.log(this[rowIndex]);
    console.log(this.props.userpads[rowIndex].drums)
    this.setState({ selectedDrums : this.props.userpads[rowIndex].drums,
        selectedPads : this.props.userpads[rowIndex].pads
    }
    );
   
    }
    render() {
        const { open } = this.state;
       
        if (this.props.loggedIn) {
            const padNames =
            this.props.userpads.map((array, rowIndex) => 
                <button onClick={this.ClickPads.bind(this, rowIndex)} key={rowIndex}>{array.name}</button>    
           )
            return (
                <div className="loadTool">
                    <button className="loadBtn" onClick={this.onOpenModal}> Load Pattern </button>
                    <Modal open={open} onClose={this.onCloseModal}  little>
                        <p>Load Sequence</p>
                        {padNames}
                    </Modal>
                </div>
            )
        }
        return (
            <div><h2>Login to save and load loops</h2></div>
        )
    };
}
// ask how works?
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    log: state.auth.currentUser
});

export default connect(mapStateToProps)(LoadBtn);