import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import './index.css';
import App from './App.js';

var index = ReactDOMServer.renderToString(<App />);
//ReactDOM.hydrate(app, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById('root'));
export default index;
