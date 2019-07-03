const toCampleStr = (string)=>{
  if(!string||string===undefined){
    return string
  }
  const keyOri = string.split("-")
  let key =''
  keyOri.forEach((word,i)=>{
    if(word&&word!==undefined){
      if(i>0){
        key += word.slice(0,1).toUpperCase() + word.slice(1)
      }else{
        key += word
      }
    }
  })
  return key
}
const toJsStyle=(styles)=>{
  if(!styles||typeof styles!=='string'){
    return {
      error:'not a style string'
    }
  }
  const styleObj={}
  console.log(styles,'styles')
  const styleArry = styles.split(";")
  styleArry.forEach((item)=>{
    if(item&&item!==undefined){
      const style = item.split(":")
      const key = toCampleStr(style[0])
      styleObj[key] = style[1]
    }
  })
  return{
    style:styleObj,
    error:null
  }
}

export{
  toJsStyle
} 