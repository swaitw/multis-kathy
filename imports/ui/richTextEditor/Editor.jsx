import React,{Component, Fragment} from 'react';
import { Editor } from 'slate-react'
import { Value,Selection,Data,Range,Inline,KeyUtils,Text } from 'slate'
import Plain from 'slate-plain-serializer'
import HTML from 'slate-html-serializer'
import { ToolBar } from './Toolbar';
import { isKeyHotkey } from 'is-hotkey'
import initialValue from './initialValue.json'
import { html as beautifyHtml } from 'js-beautify'
import clearFormates from './utils/clearformates'
import { insertImage } from './utils/images'
import {insertLink} from './utils/links'
import { insertTable, insertRow, insertColumn, removeTable, removeRow, removeColumn } from './utils/table'
import {
  Button,
  Row,
  Col,
  Radio, 
  Form,
  Input,
  Modal,
  Tooltip,
  Popover
} from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold,faItalic,faUnderline,faAlignLeft,faAlignCenter,
  faAlignRight,faAlignJustify,faQuoteRight,faCode,faListOl,faList,
  faUndo,faRedo,faEraser,faImage
} from '@fortawesome/free-solid-svg-icons'
import rules from './rules'
import InsertImage from '../form/InsertImage'
import InsertLink from './InsertLink'
import './editor.import.less'

const { TextArea } = Input
const { Group:RadioGroup,Button:RadioButton } = Radio
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

const Html = new HTML({ rules })

const checkNodeObj = (document,key)=>{
  const { object:objType} = document.getNode(key)||{}
  return objType
}

@Form.create()
class SlateEditor extends Component{
  constructor(props){
    super(props)
    const { content:{value={},html=''}={} } = this.props
    console.log(this.props,'content')
    this.state = {
      value: Html.deserialize(''),
      editModle:"visual",
      modalVisible:false,
      modalContent:null,
      currentStyle:{}
    }
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps,'nextProps')
    const { content:{value,html=''}={},onChange=()=>{} } = nextProps
    this.setState({
      value:value?Value.create(value):Html.deserialize('')
    })
    onChange({value,html})
  }
  currentStyle={}
  getNewStyle=false
  
  onKeyDown = (event, editor, next) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }

  onClickMark = (event, type) => {
    if(event){
      event.preventDefault()
    }
    this.editor.toggleMark(type)
  }

  onClickBlock = (event, type) => {
    if(event){
      event.preventDefault()
    }
    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }

  onClickStyle = (event,type,newStyle,options) =>{
    
    if(event){
      event.preventDefault()
    }
    if(!newStyle){
      return
    }
    const { editor } = this
    const { value } = editor
    const { document } = value
    switch(type){
      case 'img-align':
        const newStyleObj = {textAlign:newStyle}
        const {key} = options
        const parentNode = document.getParent(key)||{}
        const {key:parentKey,data} = parentNode
        if(data.get('className').indexOf('img-block')!==-1){
          const style=data.get('style')
          editor.moveTo(parentKey)
          editor.setNodeByKey(parentKey,{
            data:data.set('style',{...style,...newStyleObj})
          })
        }
        break;
      case 'textIndent':
        value.blocks.some(node=>{
          const style=node.data.get('style')
          let textIndent='2rem'
          if(style&&style.textIndent){
            textIndent=`${parseInt(style.textIndent)+2}rem`
          }
          editor.setBlocks({
            data:node.data.set('style',{...style,textIndent})
          })
        })
        break
      case 'reTextIndent':
        value.blocks.some(node=>{
          const style=node.data.get('style')
          if(style&&style.textIndent&&parseInt(style.textIndent)>0){
            const newTextIndent = parseInt(style.textIndent)-2

            const textIndent=newTextIndent<0?'0rem':`${newTextIndent}rem`
            editor.setBlocks({
              data:node.data.set('style',{...style,textIndent})
            })
          }
        })
        break
      default:
       const { selection:{anchor,focus}={}} =value
      if(anchor.key===focus.key){
        console.log('color 1 anchor.key===focus.key')
        editor.wrapInline({
          type:'span',
          data:{
            style:newStyle
          }
        })
        return
      }
      const textNodes = document.getTextsAtRange(Range.create({
        anchor,
        focus
      }))
      value.blocks.some((node)=>{
        if(node.hasNode(anchor.key)||node.hasNode(focus.key)){
          return
        }else{
          const { data } = node
          const style = data.get('style')||{}
          editor.setNodeByKey(node.key,{
            data:data.set('style',{...style,...newStyle})
          })
        }
      })
      value.inlines.some((inline)=>{
        if(inline.key!==anchor.key&&inline.key!==focus.key&&!inline.hasNode(anchor.key)&&!inline.hasNode(focus.key)){
          const { data } = inline
          const style = data.get('style')||{}
          editor.setNodeByKey(inline.key,{
            data:data.set('style',{...style,...newStyle})
          }) 
        }
      })
      textNodes.some((textNode)=>{
        let isWrapped =false
        value.inlines.some((inline)=>{
          if(inline.key!==anchor.key&&inline.key!==focus.key&&!inline.hasNode(anchor.key)&&!inline.hasNode(focus.key)){
            if(inline.hasNode(textNode.key)){
              isWrapped=true
            }
          }
        })
        if(!isWrapped&&textNode.key!==anchor.key&&textNode.key!==focus.key){
          editor.wrapInlineByKey(textNode.key,{
            type:'span',
            data:{
              style:newStyle
            }
          })
        }
      })
      editor.moveTo(anchor.key,anchor.offset)
      switch(checkNodeObj(document,anchor.key)){
        case 'text':
          editor.moveFocusToEndOfText()
          break;
        default:
          editor.moveFocusToEndOfNode()
      }
      editor.wrapInline({
          type:'span',
          data:{
            style:newStyle
          }
        })
      editor.moveTo(focus.key,focus.offset)
      switch(checkNodeObj(document,focus.key)){
        case 'text':
          editor.moveAnchorToStartOfText()
          break;
        default:
          editor.moveAnchorToStartOfNode()
      }
      editor.wrapInline({
          type:'span',
          data:{
            style:newStyle
          }
        })
        break;
    }
    
  }

  onClickOperation = (event,type,options={})=>{
    if(event){
      event.preventDefault()
    }
    const { editor } = this
    const { value } = editor
    const { document } = value
    
    switch(type){
      case 'undo':
        editor.undo()
        break;
      case 'redo':
        editor.redo()
        break;
      case 'clear':
        clearFormates(editor,options)
        break;
      case 'insert-img':
        insertImage(editor,options)
        break;
      case 'insertLink':
        insertLink(editor,options)
      case 'insert-table':
        insertTable(editor,options)
        break;
      case 'insert-row':
        insertRow(editor,options)
        break;
      case 'insert-column':
        insertColumn(editor,options)
        break;
      case 'remove-table':
        removeTable(editor,options)
        break;
      case 'remove-row':
        removeRow(editor,options)
        break;
      case 'remove-column':
        removeColumn(editor,options)
        break;
      default:
        break
    }
  }

  deleteBlock = (key,type) =>{
    const { editor } = this
    const { value } = editor
    const { document } = value
    let Key =key
    if(type==='parent'){
      const {key:parentKey,data} = document.getParent(key)||{}
      if(data.get('data-isAutoWrapper')){
        Key = parentKey
      }
    }
    if(Key){
      editor.removeNodeByKey(Key)
    }
    
  }

  handleSwitchEditModal=(e)=>{
    this.setState({
      editModle:e.target.value
    })
  }

  setHtmlStr=()=>{
    const { form:{getFieldValue}}= this.props
    const htmlStr = getFieldValue('htmlStr')
    // const html = htmlStr?minify(htmlStr):""
    const html = (htmlStr&&htmlStr.length>0)? htmlStr.replace(/(?<=\>)[\s\r\n]+(?=\<)/g,"").replace(/\<\/div\>/g,'</div><p data-is-holder="true"></p>'):""
    const value = Html.deserialize(html)
    this.setState({
      value
    })
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props
    const { data } = node
    const blockProps = {}
    console.log(node.type,'table-container')
    if(data){
      const className = data.get('className')
      const style = data.get('style')
      const isHolder = data.get('isHolder')
      if(isHolder){
        attributes['data-is-holder'] = isHolder
      }
      if(className){
        blockProps.className=className
      }
      if(style){
        blockProps.style=style
      }
    }
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes} {...blockProps}>{children}</blockquote>
      case 'heading-one':
        return <h1 {...attributes} {...blockProps}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes} {...blockProps}>{children}</h2>          
      case 'heading-three':
        return <h3 {...attributes} {...blockProps} >{children}</h3>
      case 'heading-four':
        return <h4 {...attributes} {...blockProps}>{children}</h4>
      case 'heading-five':
        return <h5 {...attributes} {...blockProps} >{children}</h5>
      case 'heading-six':
        return <h6 {...attributes} {...blockProps} >{children}</h6>
      case 'list-item':
        return <li {...attributes} {...blockProps}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes} {...blockProps}>{children}</ol>
      case 'bulleted-list':
          return <ul {...attributes} {...blockProps}>{children}</ul>
      case 'table-container':
          const key = attributes['data-key']
          blockProps.className=`table-container ${blockProps.className||''}`
        return <Popover 
                  placement="top" 
                  content={
                    <div>
                      <Button 
                        onClick={(event)=>{
                          event.preventDefault()
                          this.onClickOperation(null,'insert-row',{key})
                        }}
                      >
                        Add Row
                      </Button>
                      <Button 
                      onClick={(event)=>{
                        event.preventDefault()
                        this.onClickOperation(null,'insert-column',{key})
                      }}
                      >
                        Add Column
                      </Button>
                      <Popover
                        trigger='click'
                        placement="right" 
                        content={<div style={{display:'flex',flexDirection:'column'}}>
                          <Button
                            type='danger'
                            icon='delete'
                            onClick={(event)=>{
                              event.preventDefault()
                              this.onClickOperation(null,'remove-table',{key})
                            }}
                          />
                          <Button
                            type='danger'
                            onClick={(event)=>{
                              event.preventDefault()
                              this.onClickOperation(null,'remove-row',{key})
                            }}
                          >
                            Remove Row
                          </Button>
                          <Button
                            type='danger'
                            onClick={(event)=>{
                              event.preventDefault()
                              this.onClickOperation(null,'remove-column',{key})
                            }}
                          >
                            Remove Column
                          </Button>
                        </div>}
                      >
                        <Button icon='more'/>
                      </Popover>
                    </div>
                  } 
                  trigger='hover'
                >
                  <div {...attributes} {...blockProps}>{children}</div>
                </Popover>
          
        break;
      case 'div':
        return <Fragment>
          <div {...attributes} {...blockProps}>{children}</div>
        </Fragment>
      case 'section':
        return <section {...attributes} {...blockProps}>{children}</section>
      case 'paragraph':
        return <p {...attributes} {...blockProps}>{children}</p>
      case 'img':
        const src = data.get('src')
        return( 
        <Fragment>
          <img {...attributes} {...blockProps} src={src} />
          <div className="edit-bar"><div>
            <Button
              type="danger"
              onClick={()=>{
                this.deleteBlock(key,'parent')
              }}
            >
              Delete
            </Button>
            <Button 
              onClick={()=>{this.onClickStyle(null,'img-align','left',{key})}}
              {...this.hasStyle({textAlign:'left'},'img-align',{key})?{type:'primary'}:{}}
            >
              <FontAwesomeIcon icon={faAlignLeft}/>
            </Button>
            <Button 
              onClick={()=>{this.onClickStyle(null,'img-align','center',{key})}}
              {...this.hasStyle({textAlign:'center'},'img-align',{key})?{type:'primary'}:{}}
            >
              <FontAwesomeIcon icon={faAlignCenter}/>
            </Button>
            <Button 
              onClick={()=>{this.onClickStyle(null,'img-align','right',{key})}}
              {...this.hasStyle({textAlign:'right'},'img-align',{key})?{type:'primary'}:{}}
            >
              <FontAwesomeIcon icon={faAlignRight}/>
            </Button>
            <Button
              type="primary"
              onClick={this.showModal('insert-img',false,{key,src})}
            >
              Edit
            </Button>
          </div></div>
        </Fragment>
        )
      default:
        return next()
    }
  }

  renderInline = (props, editor, next) => {
    const { attributes, children, node } = props
    const { data } = node
    const blockProps = {}
    if(data){
      const className = data.get('className')
      const style = data.get('style')
      if(className){
        blockProps.className=className
      }
      if(style){
        blockProps.style=style
      }
    }
    switch (node.type) {
      case 'span':
          return <span {...attributes} {...blockProps}>{children}</span>
      case 'a':
          const href = data.get('href')
          const target =  data.get('target')
          blockProps.href=href
          blockProps.target = target
          const key = attributes['data-key']
        return <a {...attributes} {...blockProps}>{children}
            <span className="edit-btn-wrapper">
              <Button size='small'
                onClick={(event)=>{
                event.preventDefault()
                this.showModal('insertLink',false,{key,href,target})()
              }}
              >
                Edit
              </Button>
            </span>
          </a>
      default:
        return next()
    }
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes,node } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <pre {...attributes}><code>{children}</code></pre>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  onChange = ({ value }) => {
    const {onChange=()=>{} } = this.props
    this.getNewStyle=false
    const currentStyle = this.getCurrentStyles(value)
    this.setState({ value,currentStyle })
    onChange({value:value.toJSON(),html:Html.serialize(value)})
  }

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  hasBlock = type => {
    console.log('hasBlock')
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  getCurrentStyles=()=>{
    const {value} = this.state
    const { document } = value
    let currentBlockStyles = {}
    let currentInlineStyles ={}
    const currentNodeKey = value.selection.focus.key
    const closestBlock = document.getClosestBlock(currentNodeKey)
    const closestInline = document.getClosestInline(currentNodeKey)
    if(closestBlock){
      currentBlockStyles=closestBlock.data.get('style')||{}
    }
    if(closestInline){
      currentInlineStyles=closestInline.data.get('style')||{}
    }
    return {
      ...currentBlockStyles,
      ...currentInlineStyles
    }
  }

  hasStyle = (style,type,options={}) => {
    let currentStyle={}
    
    if(!this.getNewStyle){
      console.log(currentStyle,this.getNewStyle,'hasStyle get new')
      currentStyle = this.getCurrentStyles()
      this.currentStyle= currentStyle
      this.getNewStyle=true
    }else{
      currentStyle = this.currentStyle
      console.log(currentStyle,this.getNewStyle,'hasStyle get old')
    }
    
    return currentStyle
    // return false
    if(!style){
      return false
    }  
    console.log(type,style,'type')  
    let styleObj = style
    const { value } = this.state
    const { document } = value
    let status = true
    let currentBlockStyles = {}
    let currentInlineStyles ={}
    switch(type){
      case 'img-align':
        
        const {key} = options
        const parentNode = document.getParent(key)||{}
        const {key:parentKey,data} = parentNode
        if(data.get('data-isAutoWrapper')){
          currentBlockStyles=data.get('style')||{}
        }
        break;
      default:
        const currentNodeKey = value.selection.focus.key
        const closestBlock = document.getClosestBlock(currentNodeKey)
        const closestInline = document.getClosestInline(currentNodeKey)
        if(closestBlock){
          currentBlockStyles=closestBlock.data.get('style')||{}
        }
        if(closestInline){
          currentInlineStyles=closestInline.data.get('style')||{}
        }
        break;
    }

    if(type==='color'){
      return {
        status:true,
        color:currentInlineStyles.color||currentBlockStyles.color,
        backgroundColor:currentInlineStyles.backgroundColor||currentBlockStyles.backgroundColor,
      }
    }else if(type==='fontSize'){
      return {
        status:true,
        fontSize:currentInlineStyles.fontSize||currentBlockStyles.fontSize,
      }
    }else if(type==='lineHeight'){
      return {
        status:true,
        fontSize:currentInlineStyles.lineHeight||currentBlockStyles.lineHeight,
      }
    }else{
      Object.keys(styleObj).forEach((styleName)=>{
        if((!currentBlockStyles[styleName]||currentBlockStyles[styleName].replace(/\s+/g,"")!==styleObj[styleName])
        &&(!currentInlineStyles[styleName]||currentInlineStyles[styleName].replace(/\s+/g,"")!==styleObj[styleName])){
          status=false
        }
      })
    }
    return status
  }

  ref = editor => {
    this.editor = editor
  }

  hideModal=(options)=>{
    const { isNew,modalContent } = this.state
    switch(modalContent){
      case 'insert-img':
        isNew?this.onClickOperation(null,'insert-img',options):null
        break;
      default:
        break
    }
    this.setState({
      modalVisible:false,
      modalContent:null,
      isNew:false
    })
  }

  showModal=(modalContent,isNew=false,options={})=>()=>{
    this.setState({
      modalVisible:true,
      modalContent,
      isNew,
      currentEditBlock:options
    })
  }

  modifyBlock=(key,options={})=>{
    
    const { type } = options
    const { editor } = this
    const { value } = editor
    const { document } = value
    const { data } = document.getNode(key)||{}
    switch(type){
      case 'img':
        editor.setNodeByKey(key,{
          data:data.set('src',options.url)
        }).flush()
        break;
      case 'link':
        editor.setNodeByKey(key,{
          data:data.set('target',options.target).set('href',options.url)
        })
        // editor.flush()
          break;
      default:
        break
    }
    // this.setState({ value })
  }

  render(){
    const { value,editModle,modalContent,modalVisible,currentEditBlock,currentStyle } =  this.state
    const { form:{getFieldDecorator},content={},title='Editor',showHtml=true}=this.props
    return (
      <div className="slate-editor">
        <div className="flex justify-between" style={{alignItems:'flex-end'}}>
          <div >{title}</div>
          {
            showHtml&&
            <div>
              <RadioGroup onChange={this.handleSwitchEditModal} value={editModle}>
                <RadioButton value="visual">Visual</RadioButton>
                <RadioButton value="html">Html</RadioButton>
              </RadioGroup>
            </div>
          }
        </div>
        <div>
          {
            editModle==="visual"&&
            <div className='tool-bar'>
              <div className="py-3">
                <ToolBar 
                  onClickMark={this.onClickMark}
                  onClickBlock={this.onClickBlock}
                  hasBlock={this.hasBlock}
                  hasMark={this.hasMark}
                  hasStyle={this.hasStyle}
                  onClickStyle={this.onClickStyle}
                  onClickOperation={this.onClickOperation}
                  showModal={this.showModal}
                  value={value}
                  currentStyle={currentStyle}
                />
              </div>
              <div style={{border:'1px solid #e9e9e9',padding:'10px',maxHeight:'60vh',overflow:'auto'}}>
                <Editor
                  spellCheck
                  autoFocus
                  placeholder="Enter some rich text..."
                  ref={this.ref}
                  // plugins={plugins}
                  value={value}
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  renderBlock={this.renderBlock}
                  renderMark={this.renderMark}
                  renderInline={this.renderInline}
                />
              </div>   
            </div>
          }
          {
            editModle==="html"&&
            <div style={{maxHeight:'60vh',overflow:'auto'}}>
              {
                 getFieldDecorator('htmlStr',
                 {
                   initialValue:value?beautifyHtml(Html.serialize(value)):null
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
        <Modal
          visible={modalVisible}
          onCancel={this.hideModal}
          footer={null}
          style={{minWidth:'50vw'}}
        >
          {
            modalContent==='insert-img'&&
            <InsertImage 
              onOk={this.hideModal}
              block={currentEditBlock}
              modify={this.modifyBlock}
              isNew={false}
            />
          }
          {
            modalContent==='insertLink'&&
            <InsertLink 
              onOk={this.hideModal}
              block={currentEditBlock}
              modify={this.modifyBlock}
              isNew={false}
            />
          }
        </Modal>
      </div>
    )
  }
}

export default SlateEditor