import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './scss/styles.scss';

const render = async () => {
  ReactDOM.render(<App />, document.getElementById('app'));
};

render();
