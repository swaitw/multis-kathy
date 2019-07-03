import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import fs from 'fs'
import { Blogs } from './blog.mongo';


const bathPath = `${process.env['PWD']}/.uploads`
export const Files = new Mongo.Collection('files');

const initData =[
  {
    slug:'information',
    title:'Information',
  },
  {
    slug:'offline-company-formation',
    title:'Offline Company Formation',
  },
  {
    slug:'7-reasons-to-choose-company-structure-for-your-business',
    title:'7 reasons to choose company structure for your business',
  },
  {
    slug:'overseas-consent-and-identity-verification',
    title:'Overseas Consent and Identity Verification',
  },
  {
    slug:'company-folder',
    title:'Company Folder',
  },
  {
    slug:'company-guide',
    title:'Company Guide',
  },
  {
    slug:'company-names',
    title:'Company Names',
  },
  {
    slug:'partnership-business-structure',
    title:'Partnership Business Structure',
  },
  {
    slug:'company-business-structure',
    title:'Company Business Structure',
  },
  {
    slug:'statutory-obligations-of-companies-and-their-directors',
    title:'Statutory Obligations of Companies and their Directors',
  },
  {
    slug:'disclaimer',
    title:'Disclaimer',
  },
  {
    slug:'privacy',
    title:'Privacy',
  },
  {
    slug:'refund-policy',
    title:'Refund Policy',
  }
]

if(Meteor.isServer){

  Meteor.startup(()=>{
    init()
    initData.forEach((blog)=>{
      if(Blogs.findOne({slug:blog.slug})){
        return
      }
      Blogs.insert({
        createAt:new Date(),
        ...blog
      })
    })
  })
  function init(){
    if(!fs.existsSync(bathPath)){
      fs.mkdirSync(`${bathPath}`)
      fs.mkdirSync(`${bathPath}/temp`)
    }else if(!fs.existsSync(`${bathPath}/temp`)){
      fs.mkdirSync(`${bathPath}/temp`)
    }
  }

  async function addFile(fileData){
    const fileId = await Files.insert({
      createAt:new Date(),
      ...fileData
    })
    return {fileId}
  }

  async function removeFile(_id){
    await Files.remove({
      _id:_id
    })
    return true
  }

  function checkUploaded(totalFiles,md5){
    const dirPath=`${bathPath}/temp/${md5}`
    console.log('checkUploaded')
    if(!fs.existsSync(dirPath)){
      return {status:false,files:[]}
    }
    const upLoadedFiles = fs.readdirSync(dirPath)
    if(totalFiles===upLoadedFiles.length){
      return {status:true}
    }
    return {
      status:false,
      files:upLoadedFiles
    }
  }

  async function saveRealFile(md5,totalFiles,fileName,fileId){
    console.log('saveRealFile',totalFiles,md5)
    const dirPath=`${bathPath}/temp/${md5}`
    if(!fs.existsSync(`${dirPath}`)){
      console.log('no md5 files')
      return 'unfinished'
    }
    const files = fs.readdirSync(dirPath).sort((a,b)=>(a-b))
    if(files.length!==totalFiles){
      return 'unfinished'
    }
    const fileNames = [...files]
    // console.log( fileNames,'saveRealFile 2')
    const targetPath = `${bathPath}/media/${date}/${fileId}_${fileName}`
    if(!fs.existsSync(`${bathPath}/media/${date}`)){
      fs.mkdirSync(`${bathPath}/media/${date}`)
    }
    const target = fs.createWriteStream(targetPath)
    let length = 0
    const status = await new Promise((res,rej)=>{
      const readTemp = ()=>{
        if(!fileNames.length){
          target.end("Done");
          fs.rmdir(dirPath,(err)=>{
            if(err){
              console.log(err)
              rej(err)
            }
            res(true) 
          })
          return
        }
        const currentTempFile = `${dirPath}/${fileNames.shift()}`
        const source = fs.createReadStream(currentTempFile)
        // console.log(target)
        source.pipe(target,{end: false})
        source.on('data',(chunk)=>{
          length +=chunk.length
        })
        source.on('end',()=>{
          fs.unlink(currentTempFile,(error)=>{
            if(error){
              rej(error)
              console.log('remove error',error)
            }
          })
          readTemp()
        }) 
      }
      readTemp()
    })
    return status
    
}

  async function saveFile(files,fileId,date,md5,totalFiles){

    const { data,size,index,fileName } = files||{}
    if(!md5){
      const targetPath =`${bathPath}/media/${date}/${fileId}_${fileName}`
      if(!fs.existsSync(`${bathPath}/media/${date}`)){
        fs.mkdirSync(`${bathPath}/media/${date}`)
      }
      fs.writeFileSync(targetPath,data,"binary")
      return {status:true}
    }
    let progress=false
    const dirPath=`${bathPath}/temp/${md5}`
    const filePath=`${bathPath}/temp/${md5}/${index}`
    if(!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath)
    }
    const filesBefore = fs.readdirSync(dirPath)
    if(filesBefore.indexOf(index.toString())===-1){
      fs.writeFileSync(filePath,data,"binary")
      const {status}=checkUploaded(totalFiles,md5)
      progress=status
    }
    if(progress){
      saveRealFile(md5,totalFiles,fileName,fileId)
    }
    return {status:true,progress}
  }

  Meteor.methods({
    'addFile':addFile,
    'saveFile':saveFile,
    'removeFile':removeFile
  })
}