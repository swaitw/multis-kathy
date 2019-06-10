const clearFormates=(editor,options={})=>{
  const { value } = editor
  const { document } = value
  value.blocks.some(node=>{
    editor.setBlocks({
      type:'p',
      data:node.data.set('style',{}).set('className',"")
    })
    if(node.text===''){
      const parentNode = document.getClosestBlock(node.key)
      editor.unwrapNodeByKey(node.key)
      if(parentNode.text===''){
        editor.unwrapNodeByKey(parentNode.key)
      }
    }
})
}
export default clearFormates