global.Buffer = global.Buffer || require("buffer").Buffer;
import React from 'react';
import ReactDOM from 'react-dom';
import { onPageLoad } from 'meteor/server-render';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable'
import routers from '../imports/config/router.config'
import './theme.import.less'
import { Meteor } from 'meteor/meteor';
import App from '../imports/apps/App'
onPageLoad(async sink => {
  // const App = (await import('../imports/apps/App')).default;
  await Loadable.preloadAll()
  ReactDOM.hydrate(
    <BrowserRouter>
      <App routers={routers}/>
    </BrowserRouter>,
    document.getElementById('app')
  );
});