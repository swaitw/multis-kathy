import React, { PureComponent, Fragment } from 'react';
import moment from 'moment'
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import { Meteor } from 'meteor/meteor';
import { sliceData, readFile } from '../../../lib/common/files'

const {Dragger} = Upload;

const initFileData=async(options,userId='')=>{
  const { file,filename:fileType} = options
  const {data:filesData,md5,fileName} = await readFile(file)
  const date = moment(new Date()).format('DD-MM-YYYY')
  const path = `media/${date}`
  const fileData={
    path,
    type:fileType,
    fileName,
    createdBy:userId||'',
  }
  return {
    filesData,
    md5,
    fileName,
    date,
    fileData
  }
}

const getFileId =async(fileData)=>{
  const fileId = await new Promise((res,rej)=>{
    Meteor.call('addFile',fileData,(err, {fileId})=>{
      if(err){
        rej(err)
      }else{
        res(fileId)
      }
    })
  })
  return fileId  
}

const saveFile = async(options,{filesData,md5,fileId,date})=>{
  const { onProgress,onSuccess} = options
  let sum = 0
  if(md5&&Array.isArray(filesData)){
    let uploadFiles = filesData
    uploadFiles.forEach((file)=>{
      console.log(md5,file.totalSize,'saveFile')
      Meteor.call('saveFile',file,fileId,date,md5,filesData.length,(err,result)=>{
        if(err){
          return
        }
        sum +=file.size
        onProgress({percent:sum/file.totalSize*100})
        if(sum===file.totalSize){
          onSuccess(null,true)
        }
        })
    })
  }else{
    const file = filesData
    Meteor.call('saveFile',file,fileId,date,(err,result)=>{
      if(err){
        return
      }
      sum +=file.size
     onProgress({percent:sum/file.totalSize*100})
     if(sum===file.totalSize){
       onSuccess(null,true)
     }
    })
  }
}

class FileUpload extends PureComponent{
  _isMounted=false
  state={
    fileId:null,
  }
  updoad=async(options)=>{
    const { onSuccess=()=>{} } =  this.props
    const { filesData,md5,fileName,fileData,date } = await initFileData(options)
    const fileId = await getFileId(fileData)
    this.setState({
      fileId
    })
    await saveFile(options,{filesData,md5,fileId,date})
    onSuccess({fileId,url:Meteor.absoluteUrl(`files?id=${fileId}`)})
  }
  componentDidMount() {
    this._isMounted=true
  }
  componentWillMount(){
    this._isMounted=false
  }
  draggerProps = {
    multiple: true,
    customRequest:this.updoad,
    onChange:(info)=>{
      const status = info.file.status;
      if(!this._isMounted){
        return
      }
    },
  };

  render(){
    return( 
      <Upload {...this.draggerProps}> 
        <Button>
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    )
  }
}

export default FileUpload