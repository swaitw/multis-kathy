
import fs from 'fs'
import url from 'url'
import querystring from 'querystring'
import { Meteor } from 'meteor/meteor';
import {Files} from '../../imports/api/file.mongo'
const bathPath = `${process.env['PWD']}/.uploads`
async function downloadFileHandle(req, res, next){
  
  const { params:{id} } = req
  if(!id){
    res.writeHead(404);
    res.end();
  }



  const { path,fileName } = Files.findOne({_id:id})
  const dirPath=`${bathPath}/${path}`
  if(!fs.existsSync(dirPath)){
    res.writeHead(404);
    res.end();
  }
  const filePath=`${dirPath}/${id}_${fileName}`
  const orgtats = fs.statSync(filePath);
  if(!fs.existsSync(filePath)){
    res.writeHead(404);
    res.end();
  }
  if(orgtats.isFile()){
    res.writeHead(200,{
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename='+fileName,
      'Content-Length': orgtats.size
    });
    const stream = fs.createReadStream(filePath)
    stream.on('error',(err)=>{
      console.log(err)
      res.writeHead(404);
      res.end();
    })
    stream.on('end',()=>{
      console.log('end')
      res.end();
    })
    stream.pipe(res)
  } else {
    res.writeHead(404);
    res.end();
  }
}

export {
  downloadFileHandle
}