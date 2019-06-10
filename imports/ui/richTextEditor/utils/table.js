import { Block,Text } from 'slate'
import { Range } from 'immutable';
const defaultOption={
  typeTable: 'table-container',
  typeRow: 'div',
  typeCell: 'div',
  typeContent: 'paragraph',
  exitBlockType: 'paragraph'
}
const createEmptyContent=(opts=defaultOption)=>{
  return Block.create({
    type: opts.typeContent,
    nodes: [Text.create()]
  });
}

const createCell=(opts=defaultOption)=>{
  return Block.create({
    type:opts.typeCell,
    nodes:[createEmptyContent(opts)]
  })
}

const createRow=(columns,opts=defaultOption)=>{
  const cellNodes = Range(0, columns)
    .map(i =>createCell(opts))
    .toList();
  return Block.create({
      type:opts.typeRow,
      nodes: cellNodes
  });
}

const createTable=({rows=1,columns=1},opts=defaultOption)=>{
  const rowNodes = Range(0, rows)
    .map(i =>
        createRow(
          columns,
          opts,
        )
    )
    .toList();
  return Block.create({
    type: opts.typeTable,
    nodes: rowNodes
  });
}

const insertTable=(editor,options={})=>{
  const { value } = editor
  const { document } = value
  const { key:tableKey,index:targetIndex } = options
  const { rows=2, columns=2 } = options
  const newTable =createTable({columns,rows})
  editor.insertBlock(newTable)
}

const insertRow=(editor,options={})=>{
  const { value } = editor
  const { document } = value
  const { key:tableKey,index:targetIndex } = options
  const currentTable = document.getNode(tableKey)
  const rowIndex = targetIndex?targetIndex+1:value.selection.focus.path.get('1')
  const currentRow = currentTable.nodes.get(rowIndex.toString())
  const columns = currentRow.nodes.size
  const row =createRow(columns)
  editor.insertNodeByKey(tableKey,rowIndex+1,row)
}

const insertColumn=(editor,options={})=>{
  const { value } = editor
  const { document } = value
  const { key:tableKey,index:targetIndex } = options
  const currentTable = document.getNode(tableKey)
  const columnIndex = targetIndex?targetIndex:value.selection.focus.path.get('2')+1
  currentTable.nodes.some((node)=>{
    const cell =createCell()
    editor.insertNodeByKey(node.key,columnIndex,cell)
  })
}

const removeTable=(editor,options={})=>{
  const { value } = editor
  const { document } = value
  const { key:tableKey,index:targetIndex } = options
  editor.removeNodeByKey(tableKey)
}
const removeRow=(editor,options={})=>{
  const { value } = editor
  const { document } = value
  const { key:tableKey,index:targetIndex } = options
  const currentTable = document.getNode(tableKey)
  const rowIndex = targetIndex?targetIndex:value.selection.focus.path.get('1')
  if(currentTable.nodes.size>1){
    const rowKey = currentTable.nodes.get(rowIndex.toString())
    editor.removeNodeByKey(rowKey)
  }else{
    removeTable(editor,options)
  }
}
const removeColumn=(editor,options={})=>{
  const { value } = editor
  const { document } = value
  const { key:tableKey,index:targetIndex } = options
  const currentTable = document.getNode(tableKey)
  const columnIndex = targetIndex?targetIndex:value.selection.focus.path.get('2')
  let lastColumn=false
  currentTable.nodes.some((node)=>{
    if(node.nodes.size>1){
      const columnKey = node.nodes.get(columnIndex.toString())
      editor.removeNodeByKey(columnKey)
    }else{
      lastColumn=true
    }
  })
  if(lastColumn){
    removeRow(editor,options)
  }
}

export {
  insertTable,
  insertRow,
  insertColumn,
  removeTable,
  removeRow,
  removeColumn
}