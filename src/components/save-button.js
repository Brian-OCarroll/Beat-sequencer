import React from "react";
import Modal from 'react-responsive-modal';
import {connect} from 'react-redux'
import {API_BASE_URL} from '../config';

export class SaveBtn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            pads: [],
            name: '',
            loaded:true
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({loaded:true});
    }
    onOpenModal_SavePattern = () => {
        this.setState({ open: true });
        console.log(this.props.log.id)
    };

    onCloseModal_SavePattern = () => {
        this.setState({ open: false });
        console.log('open')
        // this.props.onUpdate();

    };
    onInputChange(event) {
        this.setState({name: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();

        fetch(API_BASE_URL+'/drums', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({
            user:this.props.log.id,
            name:this.state.name,
            pads:this.props.pads,
            drums: this.props.drums
        }), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => console.log(`Success: ${response}`, JSON.stringify(response)))
        .then(this.setState({ open: false }))
        .then(function() {
            this.setState({loaded:false})
            this.props.onUpdate()
         }.bind(this))
       
        .catch(error => console.error('Error:', error));
      }
    render() {
        const { open } = this.state;
        if (this.props.loggedIn) {
            return (
                <div className="saveTool">
                    <button className="Save_Btn" onClick={this.onOpenModal_SavePattern}> Save Pattern </button>
                    {this.state.loaded &&                     <Modal open={open} onClose={this.onCloseModal_SavePattern} little>
                        <p>Save Sequence</p>
                        <form type="text" onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                className="name-input"
                                id="name-input"
                                name="name-input"
                                required="required"
                                placeholder="Trap loop"
                                value={this.state.name}
                                onChange={this.onInputChange}></input>
                            <button className="Save_Btn"> Save Pattern </button>
                        </form>    
                    </Modal>}
                </div>
            )
        }
        return (
            <div></div>
        )
    };
}
// ask how works?
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    log: state.auth.currentUser
});

export default connect(mapStateToProps)(SaveBtn);