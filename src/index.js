import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import App from './App';
import { spotifyAuthorization } from './data/spotifyAuthorization'

(async () => {
  let accessToken = await spotifyAuthorization();

  ReactDom.render(
    <React.StrictMode>
      <App accessToken={accessToken} />
    </React.StrictMode>,
    document.getElementById('root')
  );
})()

