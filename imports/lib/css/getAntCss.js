import fs from 'fs'
import { Meteor } from 'meteor/meteor';
const bathPath = `${process.env['PWD']}/node_modules`
const getPath = (type,name)=>{
  switch(type){
    case 'ant':
      return `${bathPath}/antd/lib/${name}/style/index.css`
    default:
      return
    
  }
}
const getCssStr =({name,type='ant',path})=>{
  if(Meteor.isClient){
    return ``
  }

  const cssFile = path?path:getPath(type,name)
  if(cssFile.indexOf('grid')!==-1){
    console.log(cssFile,fs.existsSync(cssFile),'fs.existsSync(cssFile)')
  }
  if(!fs.existsSync(cssFile)){
    return ``
  }
  const cssStr = fs.readFileSync(cssFile,"utf-8")
  
  return cssStr
}

const getAntCsses=(names=[])=>{
  let cssStr =``
  names.forEach((name)=>{
    cssStr += getCssStr({name})
  })
  return cssStr
}


export {
  getAntCssStr,
  getCssStr,
  getAntCsses
}