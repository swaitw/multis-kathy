import React, { PureComponent, Fragment, useState } from 'react'
import {
  Form, 
  Input,
  Card,
  Row,
  Col,
  Button
} from 'antd'
// import {toMoneyStr} from '../../../../../../imports/lib/common/formatedText'
import { toMoneyStr } from '../../../../../lib/common/formatedText'
const { Item:FormItem} = Form


const Services =(props)=>{
  const { form:{getFieldDecorator,getFieldsValue,setFieldsValue},
    title="Services to be rendered",isMultiStep=true,
    services:selected=[]
  } = props
  if(Array.isArray(selected)&&selected.length===0){
    selected.push(
      {
        label:"Company Incorporation with Electronic Statutory Documents",
        price:28900,
        required:true,
      }
    )
  }
  const defualtServices=[
    {
      label:'Executive Company Folder with hard copies of statutory documents',
      price:4900
    },
    {
      label:'Standard Constitution',
      price:7900
    },
    {
      label:'Trade Mark Search',
      price:7900
    },
    {
      label:'Internet Domain Registration (.co.nz, 1 year)',
      price:19900
    },
    {
      label:'Registered Address (annual fee)',
      price:19900
    },
    {
      label:'Postal Address (annual fee)',
      price:19900
    },
    {
      label:'Document Notarization, Authentication and Apostile',
      price:49900
    }
  ]
  const [currentServices, setCurrentServices] = useState({
    selected:Array.isArray(selected)?selected:[],
    services:defualtServices.filter(
      (item)=>(
        !Array.isArray(selected)||selected.findIndex(
          (selectedItem)=>(selectedItem.label===item.label)
        )===-1
      )
    )
  })
  const addSelectedServices=(i)=>()=>{
    const service = currentServices.services[i]
    const newSelected = currentServices.selected?[...currentServices.selected]:[]
    const newServices = currentServices.services?[...currentServices.services]:[]
    newSelected.push(service)
    newServices.splice(i,1)
    setCurrentServices({selected:newSelected,services:newServices})
    setFieldsValue({
      'services':JSON.stringify(newSelected)
    })
  }
  const removeSelectedServices=(i)=>()=>{
    const service = currentServices.selected[i]
    const newSelected = currentServices.selected?[...currentServices.selected]:[]
    const newServices = currentServices.services?[...currentServices.services]:[]
    newServices.push(service)
    newSelected.splice(i,1)
    setCurrentServices({selected:newSelected,services:newServices})
    setFieldsValue({
      'services':JSON.stringify(newSelected)
    })
    // setFieldsValue({
    //   'services':JSON.stringify({selected:[],services:[]})
    // })
  }

  const getTotal=()=>{
    const { selected } = currentServices
    let total =0
    selected.forEach((item)=>{
      total += item.price/100
    })
    return toMoneyStr(total)
  }

  const handleSave = ()=>{
    if(!isMultiStep){
      const { handleSave=()=>{},form:{validateFields,getFieldValue}}= props
      const value = getFieldValue('services')
      handleSave({services:JSON.parse(value)})
    }
  }
  const extraProps ={}
  if(!isMultiStep){
    extraProps.extra=<Button onClick={handleSave} type='primary'>Save</Button>
  }
  
  return(
    <Card
      title={title}
      {...extraProps}
    >
      <Row>
        <h4>Selected services:</h4>
        {
          currentServices.selected.map((service,i)=>{
            const { label,price=0,required } =  service
            return(
              <Row key={label} type="flex" justify="space-between" align="middle" style={{padding:'0.5rem 0px'}}>
                <Col span={12}>
                  <span>{label}</span>
                </Col>
                <Col span={6}>
                  <span style={{textAlign:"right",width:"100%",display:'block'}}>{toMoneyStr(price/100,{tofixed:2})}</span>
                </Col>
                <Col span={3}>
                  {
                    !required&&<Button block onClick={removeSelectedServices(i)}>Remove</Button>
                  }
                </Col>
              </Row>
            )
          })
        }
      </Row>
      <Row>
        <h4>You can also add:</h4>
        {
          currentServices.services.map((service,i)=>{
            const { label,price=0 } =  service
            return(
              <Row key={label} type="flex" justify="space-between" align="middle" style={{padding:'0.5rem 0px'}}>
                <Col span={12}>
                  <span>{label}</span>
                </Col>
                <Col span={6} >
                  <span style={{textAlign:"right",width:"100%",display:'block'}}>{toMoneyStr(price/100,{tofixed:2})}</span>
                </Col>
                <Col span={3}>
                  <Button block onClick={addSelectedServices(i)}>Add</Button>
                </Col>
              </Row>
            )
          })
        }
      </Row>
      <Row type="flex" justify="end" style={{paddingTop:'1rem',border:'2px solid'}}>
        <h3>{`TOTAL: ${getTotal()}`}</h3>
        <Col span={3}></Col>
      </Row>
      <Row>
        <p>Please note that for New Zealand tax residents the total price is inclusive of GST.</p>
        <p>Free shipping to orders within New Zealand. Shipping outside of New Zealand will be charged separately.</p>
      </Row>
      {
        getFieldDecorator('services',{
          initialValue:JSON.stringify(Array.isArray(selected)?[...selected]:[])
        })(
          <Input type='hidden'/>
        )
      }
    </Card>
  )
}
export default Services