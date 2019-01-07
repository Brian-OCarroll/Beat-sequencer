import 'antd/dist/antd.css';
import React, { Component } from 'react';
import './App.css';
import Pads from './components/Pads';
import Controls from './components/controls';
import MIDISounds from 'midi-sounds-react';
import LoginModal from './components/login'
import { Layout, Menu, Row, Col } from 'antd';
const { Header, Content, Footer } = Layout;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      pads: [
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],  
      numPads:4,
      playing:false,
      position:0,
      bpm:120,
      selectedDrum: [130,125,145,140],
      volume: [0.5,0.5,0.5,0.5],
      mute:false,
      open1: false,
      open2: false,
    }
    this.togglePlaying = this.togglePlaying.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.changeBpm = this.changeBpm.bind(this);
    this.changeSampleVolume = this.changeSampleVolume.bind(this);
    this.onSelectDrum = this.onSelectDrum.bind(this);
    // this.LoadUserPads = this.LoadUserPads.bind(this); 
  }


componentDidMount() {
    // this.loadUsers();
    // this.LoadUserPads();
    this.setState({ initialized: true });
};

//copy pads state and get current pad value
//use spread operator to clone pads array
//toggle it to update state
toggleActive(rowIndex, id) {
  //log Pad row and column position
  // console.log('Pad', rowIndex, id);
  let pads = [...this.state.pads];
  let padActive = pads[rowIndex][id];

  if (padActive === 1) {
    pads[rowIndex][id] = 0;
  } else {
    pads[rowIndex][id] = 1;
  }

  this.setState({ pads: pads });
}

togglePlaying() {
  if (this.state.playing) {
    clearInterval(this.timerId);
    this.setState({ playing: false });
  } else {
    this.setTimer();
    this.setState({ playing: true });
  }
}
//tick the position forward and play a sound
setTimer() {
  this.timerId = setInterval(() => this.tick(), this.calculateTempo(this.state.bpm));
}

calculateTempo(bpm) {
  return 15000 / bpm;
}
//increment the pad position by one and play the given instrument
//by calling checkpad()
tick() {
  let pos = this.state.position;
  pos++;
  if (pos > 15) {
    pos = 0;
  }
  this.setState({ position: pos });
  this.checkPad();
}

checkPad() {
  this.state.pads.forEach((row, rowIndex) => {
    row.forEach((pad, index) => {
      if (index === this.state.position && pad === 1) {
        // console.log("active");
        this.playSound(rowIndex);
      };
    })
  });
}

playSound(rowIndex) {
  // console.log("play");
  let sample = this.state.selectedDrum[rowIndex];
  this.midiSounds.playDrumsNow([sample]);
}

changeBpm(bpm) {
  this.setState({ bpm: bpm.target.value });
  if (this.state.playing) {
    clearInterval(this.timerId);
    this.setTimer();
  }
}

changeSampleVolume(e, rowIndex) {
  // console.log("event: ", e, "row: ", rowIndex);
  let rackVol = [...this.state.volume];


  rackVol.splice(rowIndex, 1, e.target.value);
  let sampleVol = rackVol[rowIndex];
  this.setState({ volume: rackVol });

  // console.log("rackVol: ", rackVol);
  // console.log("sampleVol: ", sampleVol);
  this.sendVolumes(rowIndex, sampleVol);

  if (this.state.playing) {
    clearInterval(this.timerId);
    this.setTimer();
  }
}

sendVolumes(rowIndex, volume) {
  // console.log("In change volume state. The selected Drums: ", this.state.selectedDrum[rowIndex], "The Volume: ", this.state.volume[rowIndex])
  this.midiSounds.setDrumVolume(this.state.selectedDrum[rowIndex], volume);
}

onSelectDrum(e, rowIndex) {
  var list = e.target;
  let n = list.options[list.selectedIndex].getAttribute("value");
  let drumSelect = [...this.state.selectedDrum];
  //row drum only for console.log
  let rowDrum = drumSelect[rowIndex];

  drumSelect.splice(rowIndex, 1, n);
  console.log("ROW Drum: ", rowDrum, "Index: ", rowIndex);

  this.setState({ selectedDrum: drumSelect });

  // console.log("Selected Drums: ", drumSelect);
  this.midiSounds.cacheDrum(n);
}
//figure out how this works
//array of options
createSelectItems() {
  if (this.midiSounds) {
    if (!(this.items)) {
      this.items = [];
      for (let i = 0; i < this.midiSounds.player.loader.drumKeys().length; i++) {
        this.items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + this.midiSounds.player.loader.drumInfo(i).title}</option>);
      }
    }
    return this.items;
  }
}

addNewPads = () => {
  var newArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // console.log("state", this.state);
  var newVol = 0.5
  //set newDrum to default of 21(handClap)
  var newDrum = 21
  this.setState({ pads: [...this.state.pads, newArray] });
  this.state.volume.push(newVol);
  this.state.selectedDrum.push(newDrum);
  // this.state.numPads++;
  this.setState({
    numPads: this.state.numPads+1
  })
  // console.log(this.state.numPads);
}
// iterate through individual pads in rows and change
// on values(1) to off(0)
clearRow = (rowIndex) => {
  // console.log('Pad row:', rowIndex);
  let pads = [...this.state.pads];
  let padState = pads[rowIndex];
  // console.log("padState: ", padState);
  for (var i = 0; i < padState.length; i++) {
    if (padState[i] === 1) {
      pads[rowIndex][i] = 0;
    }
  }
  // console.log("pushed pads: ", pads);
  this.setState({ pads: pads });

}

deleteRow = (rowIndex) => {
  let pads = [...this.state.pads];
  let volume = [...this.state.volume];
  let drums = [...this.state.selectedDrum];

  pads.splice(rowIndex, 1);
  volume.splice(rowIndex, 1);
  drums.splice(rowIndex, 1);
  // console.log("pushed pads: ", pads);
  this.setState({ pads: pads });
  this.setState({ volume: volume });
  this.setState({ selectedDrum: drums });
  // this.state.numPads--;
  this.setState({
    numPads: this.state.numPads-1
  })
  // console.log(this.state.numPads);
}

clickPadButtons = (Array) => {
  let newPads = Array;
  this.setState({ pads: newPads });
}

  render() {
    const { open1 } = this.state;
    const { open2 } = this.state;
    return (
      <div className="booty">
        <Layout className="layout">
        <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><LoginModal /> </Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
        </Menu>
        </Header>
        <Content style={{ padding: '50px' }}>
        <div className="App">
          <Pads
            pos={this.state.position}
            pads={this.state.pads}
            toggleActive={this.toggleActive}
            clearRow={this.clearRow}
            deleteRow={this.deleteRow}
            selectedDrum={this.state.selectedDrum}
            createdDrums={this.createSelectItems()}
            onSelectDrum={this.onSelectDrum}
            sampleVolume={this.state.volume}
            changeVolume={this.changeSampleVolume} />
          <Controls
            bpm={this.state.bpm}
            handleChange={this.changeBpm}
            playing={this.state.playing}
            togglePlaying={this.togglePlaying}
            addNewPads={this.addNewPads} />
          {/* <SaveBtn users={this.state.users} pads={this.state.pads} email={this.state.email} pads_users={this.state.pads_users} LoadUserPads={this.LoadUserPads()} clickPadButtons={this.clickPadButtons} /> */}
          <MIDISounds
            ref={(ref) => (this.midiSounds = ref)}
            appElementName="root"
            instruments={[111]}
            // drums={[2, 33, 15, 5, 35, 24]} 
            drums={[5, 25, 20, 35]} 
            />
        </div>
        </Content>
      </Layout>
      </div>
    );
  }

};

