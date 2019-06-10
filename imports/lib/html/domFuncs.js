import {toJsStyle} from '../css/stylesFuncs'
import React from 'react'

class DomConvert {
  constructor(props={},DefaultComp,editorProps){
    this.editorBlockIndex=-1
    this.props=props
    this.editorProps=editorProps
    this.texts = DefaultComp?editorProps.block.text.split('\n'):""
    this.DefaultComp = DefaultComp||null
  }
  node2React = (node)=>{
    console.log(!node.getAttribute,node.getAttribute,'typeof node')
    if(!node.getAttribute ){
      if(this.DefaultComp){
        return (props)=>{
          const editorProps =this.editorProps
          this.editorBlockIndex+=1
          console.log(this.texts,this.editorBlockIndex,"hhhhhhhhhhhhhh")
          console.log(editorProps.block.set('text',this.texts[this.editorBlockIndex]),'test text')
          return <this.DefaultComp {...this.editorProps} block={editorProps.block.set('text',this.texts[this.editorBlockIndex])}/>
        }
      }
      return (props)=><p {...props}>{node.textContent}</p>
    }
    
    const classNames = node.getAttribute('class');
    const styles = node.getAttribute('style');
    const id = node.getAttribute('id');
    const eleProps = {}
    if(classNames){
      eleProps.className=classNames
    }
    if(styles){
      const {style:styleObj} = toJsStyle(styles)
      eleProps.style = styleObj
    }
    if(id){
      eleProps.id = id
    }
    console.log(node.nodeName,node,'node.nodeName')
    switch(node.nodeName.toLowerCase()){
      case 'section':
        return (props)=>(<section {...eleProps} {...props}>{props.children}</section>)
      default :
        return (props)=>(<div {...eleProps} {...props}>{props.children}</div>)
    }
  }

  dom2React = (dom) =>{
    const nodes = [...dom.childNodes]
    const Dom = this.node2React(dom,this.DefaultComp)
    if(nodes.length>0){
      const children = nodes.map((node)=>{
        return this.dom2React(node,{},this.DefaultComp)
      })
      return <Dom {...this.props} children={children}/>
    }
    return (
      <Dom {...this.props}/>
    )
  }
}

export {
  DomConvert
}