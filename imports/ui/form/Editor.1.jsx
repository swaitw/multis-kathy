import React, { Fragment } from 'react'
import BraftEditor from 'braft-editor'
import { html as beautifyHtml } from 'js-beautify'
if(Meteor.isClient){
  import 'braft-editor/dist/index.css'
}
import { toJsStyle } from '../../lib/css/stylesFuncs'
import styled from 'styled-components'
import { ContentUtils } from 'braft-utils'
import { Meteor } from 'meteor/meteor';
import { Card, Button,Row,Col,Radio, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Immutable from 'immutable'
import { DomConvert } from '../../lib/html/domFuncs'
const { Group:RadioGroup,Button:RadioButton } = Radio

const testNode = ()=>{
  const dom =  document.createElement('div')
  dom.innerHTML="<div><p>testp</p></div>"
  console.log(dom,'dom')
  return dom
}
const Div = (props)=>{
  return<div id="test">{props.children}</div>
}
const extendBlocks =   {
  'div': {
    element:'div',
  },
  'section':{
    element: 'section',
  }
}
const blockRenderMap = Immutable.Map(extendBlocks)
const blockImportFn = (nodeName,node)=>{
  const {elType} = node.dataset
  const isCustomer = (elType||extendBlocks[nodeName])?true:false
  if(isCustomer){
    return{
      type:elType?elType:nodeName,
      data:{
        isCustomer:true,
        node,
        elType,
        ...node.dataset
      },
    }
  }
}

// const entityImportFn = (nodeName,node,createEntity)=>{
//   console.log(createEntity,nodeName,'createEntity')
//   const isCustomer = (elType||extendBlocks[nodeName])?true:false
//   if(isCustomer){
//     console.log(createEntity,'createEntity')
//   }
// }

const blockExportFn = (contentState, block) => {
  const { data:{node,isCustomer,elType,...restData}={},type} = block
  if(isCustomer){
    const classNames = node.getAttribute('class');
    const styles = node.getAttribute('style');
    const result = elType?{}:{
      start:`<${type}${classNames?` class="${classNames}"`:""}${styles?` style="${styles}"`:""}>${node.innerHTML}<<`,
      end:`>></${type}>`
    }
    return result
  }

}


const eleRender = (props)=>{
  const { draft:{EditorBlock}} = BraftEditor
  const { block={},contentState } = props
  const {data,type='div'}=block
  const node = data.get('node')
  const classNames = node.getAttribute('class');
  const styles = node.getAttribute('style');
  // const testData = contentState.getEntity(block.getEntityAt(0)).getData();

  console.log(props,'data',node)

  const eleProps = {}
  if(classNames){
    eleProps.className=classNames
  }
  
  if(styles){
    const {style:styleObj} = toJsStyle(styles)
    eleProps.style = styleObj
  }
  // const DefaultComp =(editorProps)=>{

  //   return (<EditorBlock {...editorProps} />)
  // }
  const domCovert = new DomConvert(eleProps,EditorBlock,props)
  return domCovert.dom2React(node)
  
}
const blockRendererFn = (block, { editor, editorState }) => {
  const isCustomer = extendBlocks[block.type]?true:false
  if(isCustomer){
    return{
      component:eleRender,
      editable: true,
      props: { editor, editorState }
    }
  }
}

function decorator(contentBlock, callback, contentState){
  if(contentBlock.getType()==='div'){
    const text = contentBlock.getText(); 
    const textArry = text.split("\n")
    console.log(textArry,'compositeDecorator textArry')
    const index = text.indexOf(textArry[0])
    console.log(contentBlock,'compositeDecorator test')
    callback(0,textArry[0].length)
  }
  
}
const TestComp = (props)=>{
  console.log(props,'compositeDecorator props')
  return <span {...props}>{props.children}</span>
}

@Form.create()
export default class EditorDemo extends React.Component {
  constructor(props){
    super(props)
    this.compositeDecorator = new BraftEditor.draft.CompositeDecorator([
      {
        strategy:decorator,
        component: TestComp
      }
    ]);
    
    const editorState = BraftEditor.createEditorState()
    BraftEditor.draft.EditorState.set(editorState,{decorator:this.compositeDecorator})
    this.state = {
      editorState,
      editModle:"visual"
  }
  }
  

  async componentDidMount () {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    // this.setState({
    //   editorState: BraftEditor.createEditorState(htmlContent)
    // })
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    const result = await saveEditorContent(htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }
  editModle=[
    {
      key:'visual',
      tab:'Visual'
    },
    {
      key:'html',
      tab:'Html'
    }
  ]
  handleSwitchEditModal=(e)=>{
    this.setState({
      editModle:e.target.value
    })
  }

  getHtmlStr=()=>{
    const { form:{getFieldValue}}= this.props
    const {draft:{convertFromHTML,ContentState,EditorState}={}}=BraftEditor||{}
    const htmlStr = getFieldValue('htmlStr')
    // const html = htmlStr?minify(htmlStr):""
    const html = (htmlStr&&htmlStr.length>0)? htmlStr.replace(/(?<=\>)[\s\r\n]+(?=\<)/g,""):""
    const editorState = BraftEditor.createEditorState(html,{blockImportFn,blockExportFn})
    EditorState.set(editorState,{decorator:this.compositeDecorator})
    this.setState({
      editorState
    })
  }

  render () {
    const { form:{getFieldDecorator}}=this.props
    const { editorState,editModle } = this.state
    console.log(editorState,'BraftEditor')
    return (
      <div className="py-3">
        <div className="flex justify-between">
          <div><h3>Content</h3></div>
          <div>
            <RadioGroup onChange={this.handleSwitchEditModal} value={editModle}>
              <RadioButton value="visual">Visual</RadioButton>
              <RadioButton value="html">Html</RadioButton>
            </RadioGroup>
          </div>
        </div>
        <div style={{border:'1px solid #e8e8e8'}}>
          {
            editModle==="visual"?
            <BraftEditor
              value={editorState}
              language="en"
              onChange={this.handleEditorChange}
              // blockRendererFn={blockRendererFn}
              onSave={this.submitContent}
              blockRenderMap={blockRenderMap}
              converts={{ blockImportFn,blockExportFn }}
              onDelete={(teste,arg2)=>{
                console.log(teste,arg2,'onDelete arguments' )
              }}
            />
            :<div>
              {
                getFieldDecorator('htmlStr',
                {
                  initialValue:editorState?beautifyHtml(editorState.toHTML().replace(/(?=\<\<)[\s\S]+(?<=\>\>)/g,"")):null
                }
                )(
                  <TextArea 
                    autosize={{minRows:10}} 
                    onBlur={this.getHtmlStr}
                  />
                )
              }
             
            </div>
          }
        </div>
        
      </div>
    )

  }

}
