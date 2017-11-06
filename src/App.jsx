import React ,{ Component } from 'react';
import {FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap';
import './App.css';

class App extends Component{
  render(){
    return(
      <div className="App" >
        <div className="App-title"> Music Master </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search an Artist"
              />
            <InputGroup.Addon>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>

        <div className="Profile">
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div className="Gallery">Gallery</div>
      </div>
    );
  }
}

export default App;
