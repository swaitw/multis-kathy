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
  try{
    await Loadable.preloadAll()
  }catch(err){

  }
  
  // await Loadable.preloadReady()
  // const antStyle=await Assets.getText('css/theme.css')
  // sink.appendToHead(`<style>${antStyle}</style>`);
  ReactDOM.hydrate(
    
    <BrowserRouter>
      <App routers={routers}/>
    </BrowserRouter>,
    document.getElementById('app')
  );
  
});