import crypto from 'crypto'

const sliceData =(data,limitedSize,fileName)=>{
  const md5=crypto.createHash('md5');
  const dataAfterSlice=[]
  const totalSize = data.length
  // const fileMd5=md5.update(data).digest('hex')
  const slicer= (data)=>{
    md5.update(data.substr(0,limitedSize))
    dataAfterSlice.push({
      data:data.substr(0,limitedSize),
      // md5:fileMd5,
      index:dataAfterSlice.length,
      size:limitedSize,
      totalSize:totalSize,
      fileName,
    })
    const restData = data.substr(limitedSize)
    if(restData.length>limitedSize){
      slicer(restData)
    }else{
      md5.update(restData)
      dataAfterSlice.push({
        data:restData,
        index:dataAfterSlice.length,
        // md5:fileMd5,
        size:restData.length,
        totalSize:totalSize,
        fileName
      })
    }
  }
  slicer(data) 
  return {dataAfterSlice,md5:md5.digest('hex')}
}

const readFile =(file)=>{
  const reader=new FileReader()
  return new Promise((res,rej)=>{
    reader.onload=async(e)=>{
      const data = e.target.result
      let dataAfterSlice=[]
      let md5
      const limitedSize= 1*1024*1024
      if(data.length>limitedSize){
        const { dataAfterSlice:dataAfter, md5:md5Str}=sliceData(data,limitedSize,file.name)
        dataAfterSlice=dataAfter
        md5 = md5Str
      }
      // console.log(dataAfterSlice,'dataAfterSlice')
      if(dataAfterSlice.length>0){
        res({data:dataAfterSlice,md5,fileName:file.name}) 
      }
       res({
        data:{
          data,
          size:data.length,
          totalSize:data.length,
          fileName:file.name
        },
        fileName:file.name
       })
      
    }
    reader.readAsBinaryString(file)
  })
  
}

export {
  sliceData,
  readFile
}