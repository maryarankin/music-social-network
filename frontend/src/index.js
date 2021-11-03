import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import { Context } from './Context';
import App from './App';
import { spotifyAuthorization } from './data/spotifyAuthorization'

(async () => {
  let accessToken = await spotifyAuthorization();

  ReactDom.render(
    <React.StrictMode>
      <Context.Provider value={{ accessToken }}>
        <App accessToken={accessToken} />
      </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
})()

