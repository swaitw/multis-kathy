import React, { Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Plain from 'slate-plain-serializer'
import { html as beautifyHtml } from 'js-beautify'
if(Meteor.isClient){
  import 'braft-editor/dist/index.css'
}
import { toJsStyle } from '../../lib/css/stylesFuncs'
import styled from 'styled-components'
import { Meteor } from 'meteor/meteor';
import { Card, Button,Row,Col,Radio, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DomConvert } from '../../lib/html/domFuncs'
const { Group:RadioGroup,Button:RadioButton } = Radio

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
}) 

@Form.create()
export default class EditorDemo extends React.Component {
  constructor(props){
    super(props)
    this.editor = null
    this.state={
      value:initialValue,
      html:''
    }
  }


  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    const result = await saveEditorContent(htmlContent)
  }

  onChange = ({ value }) => {
    this.setState({ value })
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

  setHtmlStr=()=>{
    const { form:{getFieldValue}}= this.props
    const htmlStr = getFieldValue('htmlStr')
    // const html = htmlStr?minify(htmlStr):""
    const html = (htmlStr&&htmlStr.length>0)? htmlStr.replace(/(?<=\>)[\s\r\n]+(?=\<)/g,""):""
    const node =  document.createElement('div')
    if(html){
      node.innerHTML = html
    }
    
    // this.setState({
    //   editorState:eleRender(node)
    // })
    this.setState({
      value:Plain.deserialize(html),
      html
    })
  }

  render () {
    const { form:{getFieldDecorator}}=this.props
    const { value,editModle,html } = this.state
    console.log(beautifyHtml(html),'tets htmls')
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
              editModle!=='html'&&<Editor value={this.state.value} onChange={this.onChange} />
            }
            {
               editModle==='html'&&<div>
               {
                getFieldDecorator('htmlStr',
                 {
                   initialValue:beautifyHtml(html)
                 }
                 )(
                   <TextArea 
                     autosize={{minRows:10}} 
                     onBlur={this.setHtmlStr}
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
