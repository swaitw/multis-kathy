import React from 'react'
import { toJsStyle } from '../../lib/css/stylesFuncs'
const DEFAULT_NODE = 'paragraph'
const BLOCK_TAGS = {
  p: 'paragraph',
  div:'div',
  blockquote: 'quote',
  pre: 'code',
  h3:'heading-three',
  h4:'heading-four',
  h5:'heading-five',
  h6:'heading-six',
  img:'img',
  ul:'ul',
  ol:'ol',
  li:'li'
}
const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
}

const INLINE_TAGS = {
  span:'span',
  a:'a'
}

const rules = [
  // Add our first rule with a deserializing function.
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      console.log(type,'deserialize')
      if (type) {
        const {style,error} = toJsStyle(el.getAttribute('style'))
        const data ={
          className: el.getAttribute('class'),
          src:el.getAttribute('src'),
          isHolder:el.getAttribute('data-is-holder')
        }
        if(!error){
          data.style = style
        }
        return {
          object: 'block',
          type: type,
          data,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      
      if (obj.object == 'block') {
        const blockProps ={}
        const isHolder = obj.data.get('isHolder')
        if(isHolder){
          return null
        }
      
        const className=obj.data.get('className')
        const style = obj.data.get('style')
        console.log(obj.type,className,'obj.type')
        if(className){
          blockProps.className = className
        }
        if(style){
          blockProps.style = style
        }
        console.log(obj.type,'serialize')
        switch (obj.type) {
          case 'paragraph':
            return <p {...blockProps}>{children}</p>
          case 'numbered-list':
              return <ol {...blockProps}>{children}</ol>
          case 'bulleted-list':
              return <ul {...blockProps}>{children}</ul>
          case 'list-item':
              return <li {...blockProps}>{children}</li>
          case 'quote':
            return <blockquote {...blockProps}>{children}</blockquote>
          case 'div':
            return <div {...blockProps}>{children}</div>
          case 'pre':
            return (
              <pre {...blockProps}>
                <code>{children}</code>
              </pre>
            )      
          case 'heading-one':
            return <h1 {...blockProps} >{children}</h1>
          case 'heading-two':
            return <h2 {...blockProps}>{children}</h2>
          case 'heading-three':
            return <h3 {...blockProps}>{children}</h3>
          case 'heading-four':
            return <h4 {...blockProps}>{children}</h4>
          case 'heading-five':
            return <h5 {...blockProps}>{children}</h5>
          case 'heading-six':
            return <h6 {...blockProps}>{children}</h6> 
          case 'img':
              return <img {...blockProps} src={obj.data.get('src')}/>
          case 'table-container':
              blockProps.className=`table-container ${ blockProps.className? blockProps.className:''}`
              return <div {...blockProps}>{children}</div>
          case 'ul':
            return <ul {...blockProps}>{children}</ul>
          case 'ol':
            return <ol {...blockProps}>{children}</ol>
          case 'li':
            return <li {...blockProps}>{children}</li> 
          default :
            return <p {...blockProps}>{children}</p>
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underlined':
            return <u>{children}</u>
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          default :
            return null
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const type = INLINE_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'inline',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object == 'inline') {
        const blockProps ={}
        const className=obj.data.get('className')
        const style = obj.data.get('style')
        if(className){
          blockProps.className = className
        }
        if(style){
          blockProps.style = style
        }
        switch (obj.type) {
          case 'a':
              return <a {...blockProps} href={obj.data.get('href')} target={obj.data.get('target')}>{children}</a>
          case 'span':
              return <span {...blockProps} >{children}</span>
          default :
            return null
        }
      }
    },
  },
]

export default rules