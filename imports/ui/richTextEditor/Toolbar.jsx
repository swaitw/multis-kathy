import React,{Component,useState, PureComponent, Fragment, createRef,useEffect} from 'react';
import {
  Button,
  Icon,
  Row,
  Dropdown,
  Select,
  AutoComplete,
  Input,
  Form,
  Modal,
  Card,
  Upload,
  Popover,
  Radio,
} from 'antd'
const { Group:RadioGroup,Button:RadioButton } = Radio
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold,faItalic,faUnderline,faAlignLeft,faAlignCenter,
  faAlignRight,faAlignJustify,faQuoteRight,faCode,faListOl,faList,
  faUndo,faRedo,faEraser,faImage,faIndent,faOutdent,faLink,faFont,faTable
} from '@fortawesome/free-solid-svg-icons'
import InsertImage from '../form/InsertImage'
import InsertLink from './InsertLink'

const { Option:AutoOption } = AutoComplete;
const { Option } =  Select
const getFontSize = ()=>{
  
  return [9,10,11,12,14,16,18,20,22,24,28,32,36,48,64,72,96,120,144].map((i)=>{
    return{
      value:i,
      text:`${i}px`,
      unit:'px'
    } 
  })
}
const getLineHeight = ()=>{
  
  return [1,1.2,1.5,1.75,2,2.5,3,4].map((i)=>{
    return{
      value:i,
      text:`${i}`}
  })
}
const defaultMenus =[
  {
    type:'undo',
    isMark:false,
    isOperation:true,
    icon:faUndo
  },
  {
    type:'redo',
    isMark:false,
    isOperation:true,
    icon:faRedo
  },
  {
    text:'H1',
    isMark:false,
    menuType:'droplist',
    options:[
      {
        type:'heading-one',
        text:'H1',
        isMark:false
      },
      {
        type:'heading-two',
        text:'H2',
        isMark:false
      },
      {
        type:'heading-three',
        text:'H3',
        isMark:false
      },
      {
        type:'heading-four',
        text:'H4',
        isMark:false
      },
      {
        type:'heading-five',
        text:'H5',
        isMark:false
      },
      {
        type:'heading-six',
        text:'H6',
        isMark:false
      },
      {
        type:'paragraph',
        text:'Paragraph',
        isMark:false
      }
    ]
  },
  {
    type:'fontSize',
    isMark:false,
    menuType:'droplist',
    isStyle:true,
    text:'font size',
    addonAfter:'px',
    unit:'px',
    options:getFontSize()
  },
  {
    type:'lineHeight',
    isMark:false,
    menuType:'droplist',
    isStyle:true,
    text:'line height',
    options:getLineHeight()
  },
  {
    type:'color',
    isMark:false,
    icon:faFont
  },
  {
    type:'bold',
    icon:faBold,
    isMark:true
  },
  {
    type:'italic',
    icon:faItalic,
    isMark:true
  },
  {
    type:'underlined',
    icon:faUnderline,
    isMark:true
  },
  {
    type:'align-left',
    icon:faAlignLeft,
    isStyle:true,
    style:{
      textAlign: 'left',
    }
  },
  {
    type:'align-center',
    icon:faAlignCenter,
    isStyle:true,
    style:{
      textAlign: 'center',
    }
  },
  {
    type:'align-right',
    icon:faAlignRight,
    isStyle:true,
    style:{
      textAlign: 'right',
    }
  },
  {
    type:'align-justify',
    icon:faAlignJustify,
    isStyle:true,
    style:{
      textAlign: 'justify',
    }
  },
  {
    type:'textIndent',
    icon:faIndent,
    isMark:false,
    isStyle:true,
  },
  {
    type:'reTextIndent',
    icon:faOutdent,
    isMark:false,
    isStyle:true,
  },
  {
    type:'insertLink',
    icon:faLink,
    isOperation:true,
    isMark:false,
  },
  {
    type:'code',
    icon:faCode,
    isMark:true
  },
  {
    type:'block-quote',
    icon:faQuoteRight,
    isMark:false
  },
  {
    type:'numbered-list',
    icon:faListOl,
    isMark:false
  },
  {
    type:'bulleted-list',
    icon:faList,
    isMark:false
  },
  {
    type:'insert-img',
    isOperation:true,
    icon:faImage,
    isMark:false,
  },
  {
    type:'insert-table',
    isOperation:true,
    icon:faTable,
    isMark:false
  },
  {
    type:'clear',
    icon:faEraser,
    isOperation:true,
    isMark:false
  },

]

const onClickMark = (event, type,toggleMark=()=>{}) => {
  event.preventDefault()
  toggleMark(type)
}

renderBlockButton = ({type, icon,hasBlock=()=>{},onClickBlock=()=>{},value={},text}) => {
  let isActive = hasBlock(type)

  if (['numbered-list', 'bulleted-list'].includes(type)) {
    const { document, blocks } = value

    if (blocks.size > 0) {
      const parent = document.getParent(blocks.first().key)
      isActive = hasBlock('list-item') && parent && parent.type === type
    }
  }

  return (
    <Button
      type={isActive?"primary":"dashed"}
      onMouseDown={event => onClickBlock(event, type)}
    >
      {
        icon&&<FontAwesomeIcon icon={icon}  />
      }
      {text&&<span>{text}</span>}
    </Button>
  )
}

const renderBlockDroplist = ({options=[],hasBlock=()=>{},onClickBlock=()=>{},isStyle}) =>{
  let selectedMark =options.find((option)=>hasBlock(option.type))
  return(
    <Select
      onChange={type => {
        onClickBlock(null, type)
      }}
      value={selectedMark?selectedMark.type:options[0].type}
      style={{minWidth:120}}
    >
      {
        options.map((option)=>{
          const { text,icon,type} = option
          const isActive = hasBlock(type)
          return(
            <Option value={type} key={type}>
              {
                icon&&<FontAwesomeIcon icon={icon}  />
              }
              {text&&<span>{text}</span>}
            </Option>
          )
        })
      }
    </Select>
  )
}

const renderMarkButton=({type,icon,hasMark=()=>{},toggleMark=()=>{},onClickMark=()=>{},text})=>{
  const isActive = hasMark(type)
  return(
    <Button
      type={isActive?"primary":"dashed"}
      onMouseDown={event => onClickMark(event, type,toggleMark)}
    >
      {
        icon&&<FontAwesomeIcon icon={icon}  />
      }
      {text&&<span>{text}</span>}
    </Button>
  )
}

const renderMarkDroplist=({options=[],hasMark=()=>{},toggleMark=()=>{},onClickMark=()=>{}})=>{
  let selectedMark =options.find((option)=>hasMark(option.type))
  return(
    <Select
      onChange={type => {
        onClickMark(null, type,toggleMark)
      }}
      value={selectedMark?selectedMark.type:options[0].type}
    >
      {
        options.map((option)=>{
          const { text,icon,type} = option
          const isActive = hasMark(type)
          if(isActive){
            selectedMark = type
          }
          return(
            <Option value={type} key={type}>
              {
                icon&&<FontAwesomeIcon icon={icon}  />
              }
              {text&&<span>{text}</span>}
            </Option>
          )
        })
      }
    </Select>
  )
}

const renderStyleDroplist=({options,onClickStyle=()=>{},hasStyle,type,text,addonAfter,unit,currentStyle})=>{
  const selectedStyle =options.find((option)=>{

    if(currentStyle[type]===`${option.value}${unit?unit:''}`){
      return true
    }
    return false
  })||{}
  const selectedValue = selectedStyle.value?selectedStyle.value.toString():''
  const [value ,setValue] = useState(selectedValue)
  const inputProps={}
  if(addonAfter){
    inputProps.addonAfter=addonAfter
  }
  return(
    <Fragment>
      {
        <AutoComplete
          style={{maxWidth:100}}
          dataSource={options}
          optionLabelProp='value'
          value={(value?value:selectedValue)}
          onChange={(value)=>{
            setValue(value)
            onClickStyle(null,type,{[type]:`${value}${unit?unit:''}`})
          }}
          onBlur={
            ()=>{
              setValue(null)
            }
          }

        >
          <Input {...inputProps} placeholder={text} value={value?value:selectedValue} />
        </AutoComplete>
      }
    </Fragment>
  )
}
const renderStyleButton=({type,icon,onClickStyle=()=>{},text,style,hasStyle,currentStyle})=>{
  const status = ()=>{
    if(!style){
      return false
    }
    let result = true
    Object.keys(style).forEach((key)=>{
      if(!currentStyle[key]||!currentStyle[key]!==style[key]){
        result =false
      }
    })
    return result
  }
  return(
    <Button
      type={status()?"primary":"dashed"}
      onMouseDown={event => onClickStyle(event, type,style)}
    >
      {
        icon&&<FontAwesomeIcon icon={icon}  />
      }
      {text&&<span>{text}</span>}
    </Button>
  )
}

const renderColorPickerButton=({type,icon,onClickStyle=()=>{},text,style,hasStyle,currentStyle})=>{
  const { status,color:fontColor,backgroundColor} =currentStyle
  const [bgColor,setBgColor] = useState(null)
  const [color,setColor] = useState(null)
  const [styleName,setStyleName] = useState('color')
  onChangeComplete=(color)=>{
    const style = {
      [styleName]:color.hex
    }
    if(styleName==='color'){
      setColor(color.hex)
    }else{
      setBgColor(color.hex)
    }
    
    if(!color.hex){
      return
    }

    onClickStyle(null,'color',style)
  }

  const getCurrentColor=()=>{

    if(!color&&!bgColor){
      return styleName==='color'?fontColor:backgroundColor
    }else{
      return styleName==='color'?color:bgColor
    }
  }
  
  const Content=()=>{

    return(
      <div style={{textAlign:'center'}}>
        <RadioGroup value={styleName} onChange={(e)=>setStyleName(e.target.value)}>
          <RadioButton value="color" size="small">Font Color</RadioButton>
          <RadioButton value="backgroundColor" size="small">Background Color</RadioButton>
        </RadioGroup>
        <SketchPicker width={280}
          className='sketchPicker-cus'
          color={styleName==='color'?color||fontColor||'#000':bgColor||backgroundColor||'#fff'}
          onChangeComplete={onChangeComplete}
        />
      </div>
    )
  }
  return(
    <Popover placement="bottom" title={text} content={<Content />} trigger="click" onVisibleChange={(visible)=>{
      if(!visible){
        setColor(null)
        setBgColor(null)
      }
      }
    }>
      <Button
        style={color?{color:color||'#000',backgroundColor:bgColor||'#fff'}:{color:fontColor||'#000',backgroundColor:backgroundColor||'#fff'}}
        onClick={event => {
          event.preventDefault()
          onClickStyle(event, type,style)
        }}
      >
        {
          icon&&<FontAwesomeIcon icon={icon}  />
        }
        {text&&<span>{text}</span>}
      </Button>
    </Popover>
  )
}

const renderOperationButton=({type,onClickOperation,icon,text,hasBlock})=>{
  const [modalVisible,setModalVisible] = useState(false)
  return(
    <Fragment>
      <Button
        // type={hasStyle(style)?"primary":"dashed"}
        onMouseDown={(event)=>{
          if(type==='insert-img'||type==='insertLink'){
            setModalVisible(true)
          }else{
            onClickOperation(event, type)
          }
        }}
      >
        {
          icon&&<FontAwesomeIcon icon={icon}  />
        }
        {text&&<span>{text}</span>}
      </Button>
      {
        (type==='insert-img'||type==='insertLink')&&
        <Modal
          visible={modalVisible}
          onCancel={()=>(setModalVisible(false))}
          footer={null}
          style={{minWidth:'50vw'}}
        >
          {
            type==='insert-img'&&<InsertImage 
              onOk={(option) => {
                onClickOperation(null,type,option)
                setModalVisible(false)
              }}
            />
          }
          {
            type==='insertLink'&&
            <InsertLink 
              onOk={(option) =>{
                onClickOperation(null,type,option)
                setModalVisible(false)
              }}
            />
          }
        </Modal>
      }
    </Fragment>
  )
}

const ToolBar = ({
  menus=defaultMenus,
  onClickOperation=()=>{},
  hasStyle=()=>{},
  toggleMark=()=>{},
  hasMark=()=>{},
  onClickBlock=()=>{},
  hasBlock=()=>{},
  value,
  currentStyle={},
  onClickMark=()=>{},
  onClickStyle=()=>{}})=>{
  return(
    <Row type="flex">
      {
        menus.map((menu,i)=>{
          const { type,icon,isMark=false,text,menuType,options=[],isStyle,style,isOperation,addonAfter,unit} = menu
          if(type==="color"){

            return(
              <Fragment key={i}>
                {
                  renderColorPickerButton({type,icon,onClickStyle,text,style,hasStyle,currentStyle})
                }
              </Fragment>
            )
            
          }
          if(isStyle){
            switch(menuType){
              case 'droplist':
                  return (
                    <Fragment key={i}>
                      {renderStyleDroplist({options,onClickStyle,hasStyle,type,text,addonAfter,unit,currentStyle})}
                      {/* <StyleDroplist {...{options,onClickStyle,hasStyle,type,text,addonAfter,unit}}/> */}
                    </Fragment>
                  )
              default :
                return (
                  <Fragment key={i}>
                    {
                      renderStyleButton({type,icon,onClickStyle,text,style,hasStyle,currentStyle})
                    }
                  </Fragment>
                )
            }
          } else if(isOperation){
            return (
              <Fragment  key={i}>
                {renderOperationButton({type,icon,onClickOperation,text,hasBlock})}
              </Fragment>
            )
          }else{
            switch(menuType){
              case 'droplist':
                return (
                  <Fragment key={i}>
                    {
                      isMark?null:renderBlockDroplist({options,hasBlock,onClickBlock})
                    }
                  </Fragment>
                )
              default :
                return (<Fragment key={i}>
                  {
                    isMark?renderMarkButton({type,icon,hasMark,toggleMark,onClickMark,text})
                    :renderBlockButton({type,icon,hasBlock,onClickBlock,value,text})
                  }
                </Fragment>)
            }
          }

        })
      }
    </Row>
  )
}

export {
  ToolBar
}