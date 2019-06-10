const insertLink = (editor,options={})=>{
  const { value } = editor
  const { document } = value
  const { selection:{anchor,focus}}=value
  editor.wrapInline(Inline.create({
    type:'a',
    data:{
      'href':options.url,
      'target':options.target
    }
  }))
}

export {
  insertLink
}