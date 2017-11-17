import React ,{ Component } from 'react';
import {FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap';
import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';

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
    console.log('this.state',this.state);
    const accessToken="BQBret1iQlLivufW4GwgDP1YTkT-To_76NfUGsvclj0uHLaMa8VAZ_TzAre7c9L7eP8lHyu9oKZ_4pJZk3G2sg";
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";

    console.log("FETCH_URL",FETCH_URL);

    fetch(FETCH_URL,{
      method:'GET',
      headers: {
          Authorization: `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      const artist = json.artists.items[0];
      console.log("artist",artist);
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL,{
        method:'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log('artist \'s top tracks',json);
        const {tracks} = json;
        this.setState({tracks});
      })

    })
//     var Spotify = require('node-spotify-api');
//
// var spotify = new Spotify({
//   id: "780b33061f7f4ba4be52af191a20a381",
//   secret: "434bfb96f1c841baa894185ccddafec8"
// });
//
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
//
// console.log(data);
// });
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
