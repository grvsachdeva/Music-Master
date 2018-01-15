const clientId = '780b33061f7f4ba4be52af191a20a381';
const uriRedirect = 'https://lit-oasis-39948.herokuapp.com/';
let accessToken;

// Module that provides authorization to use the Spotify API
const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    const tokenFound = window.location.href.match(/access_token=([^&]*)/);
    const expireTime = window.location.href.match(/expires_in=([^&]*)/);

    if(tokenFound && expireTime) {
      accessToken = tokenFound[1];

      const tokenExpires = Number(expireTime[1]);

      window.setTimeout(() => accessToken = '', tokenExpires * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;

    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${uriRedirect}`;

      window.location = accessUrl;

    }
  }, // end of getAccessToken method
} //end of Spotify module

export default Spotify;
