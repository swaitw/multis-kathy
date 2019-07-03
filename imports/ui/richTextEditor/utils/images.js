import { Range ,Data} from 'slate'
const insertImage = (editor,options) =>{
  const { value } = editor
  const { document } = value
  console.log(document,'document')
  const index =  document.nodes.size
  editor.insertBlock({
    type:'paragraph',
    data:{
      isHolder:true
    }
  }).wrapBlockAtRange(Range.create({anchor:value.selection.anchor,focus:value.selection.focus}),{
    type:'div',
    data:Data.create({
      'data-isAutoWrapper':true,
      'className':'img-block'
    })
  }).setBlocksAtRange(Range.create({anchor:value.selection.anchor,focus:value.selection.focus}),{
    type:'img',
    data:Data.create({
      src:options.url
    })
  })
}

export {
  insertImage
}