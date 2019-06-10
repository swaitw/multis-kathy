import fs from 'fs'
import querystring from 'querystring'
import url from 'url'
import { downloadFileHandle } from './file.fun'
import { Meteor } from 'meteor/meteor';
WebApp.connectHandlers.use('/files', (req, res, next) => {
  
  const arg =  url.parse(req.url).query
  req.params = querystring.parse(arg)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader("Access-Control-Allow-Credentials",true);
  next()
});
// WebApp.connectHandlers.use('/documents',checkAuth);
WebApp.connectHandlers.use('/files',downloadFileHandle);
WebApp.connectHandlers.use('/files',(req, res, next)=>{
  res.writeHead(404);
  res.end();
});