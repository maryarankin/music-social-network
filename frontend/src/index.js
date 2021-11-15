import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import { Context } from './Context';
import { FirebaseContext } from './components/firebase/FirebaseContext';
import { database } from './components/firebase/firebase';
import App from './App';
import { spotifyAuthorization } from './data/spotifyAuthorization'
import { Auth0Provider } from "@auth0/auth0-react";

(async () => {
  let accessToken = await spotifyAuthorization();

  ReactDom.render(
    <React.StrictMode>
      <FirebaseContext.Provider value={{ database }}>
        <Context.Provider value={{ accessToken }}>
          <Auth0Provider
            domain="dev-7usm6-an.us.auth0.com"
            clientId="DXWB2AL7IjGKf4qQMf90cUKzD9GrWcav"
            redirectUri={window.location.origin}
          >
            <App accessToken={accessToken} />
          </Auth0Provider>
        </Context.Provider>
      </FirebaseContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
})()

