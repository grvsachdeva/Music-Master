import React ,{ Component } from 'react';
import {FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap';
import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';
import Spotify from './Spotify';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
        query: '',
        artist: null,
        tracks:[]
    }
  }

  search(){
    const accessToken = Spotify.getAccessToken();
   const BASE_URL = 'https://api.spotify.com/v1/search?';
   const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
   const ALBUM_URL = 'https://api.spotify.com/v1/artists';

   // get artist info
   fetch(FETCH_URL, {
       method: "GET",
       headers: {
         Authorization: `Bearer ${accessToken}`
       }
     })
     .then(response => response.json())
     .then(jsonResponse => {
       const artist = jsonResponse.artists.items[0];
       console.log('artist', artist);
       this.setState({artist}); //if key and value are the same, can use one word to depict both

   const FETCH_URL_TOPTRACKS = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;
     //get artist's top tracks
     fetch(FETCH_URL_TOPTRACKS, {
       method: 'GET',
       headers: {
         Authorization: `Bearer ${accessToken}`
       }
     })
     .then(response => response.json())
     .then(jsonResponse => {
       // console.log('artist top tracks:', jsonResponse );
       const tracks = jsonResponse.tracks;
       //set state of the tracks to be the output of tracks
       this.setState({tracks});
     })
     });
 }


  render(){
    return(
      <div className="App" >
        <div className="App-title"> Music Master </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search an Artist"
              value = {this.state.query}
              onChange = {event => {this.setState({query:event.target.value})}}
              onKeyPress = {event => {
                if(event.key === 'Enter'){
                  this.search();
                }
              }}
              />
            <InputGroup.Addon onClick={()=>this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null ?
            <div>
              <Profile
                  artist={this.state.artist}
                />
              <Gallery
                tracks = {this.state.tracks}
              />
            </div>

            :<div></div>
        }
    </div>
    );
  }
}

export default App;
