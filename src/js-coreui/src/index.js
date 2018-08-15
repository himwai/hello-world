import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CoreUi from './CoreUi';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CoreUi />, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
