import React, { PureComponent, Fragment } from 'react'
import {
  Form, 
  Input,
  Card,
  Row,
  Col,
  Button
} from 'antd'
import {toMoneyStr} from '../../../../../../imports/lib/common/formatedText'
const { Item:FormItem} = Form


const Services =(props)=>{
  const { selectedServices=[] } = props
  selectedServices.push(
    {
      label:"Company Incorporation with Electronic Statutory Documents",
      price:28900
    }
  )
  const services=[
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
  
  return(
    <Card
      title="Services to be rendered"
    >
      <Row>
        <h4>Selected services:</h4>
        {
          selectedServices.map((service)=>{
            const { label,price=0 } =  service
            return(
              <Row key={label} type="flex" justify="space-between" align="middle" style={{padding:'0.5rem 0px'}}>
                <Col span={12}>
                  <span>{label}</span>
                </Col>
                <Col span={6}>
                  <span style={{textAlign:"right",width:"100%",display:'block'}}>{toMoneyStr(price/100,{tofixed:2})}</span>
                </Col>
                <Col span={3}>
                  <Button block>Remove</Button>
                </Col>
              </Row>
            )
          })
        }
      </Row>
      <Row>
        <h4>You can also add:</h4>
        {
          services.map((service)=>{
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
                  <Button block>Add</Button>
                </Col>
              </Row>
            )
          })
        }
      </Row>
      <Row type="flex" justify="end" style={{paddingTop:'1rem',border:'2px solid'}}>
        <h3>{`TOTAL: $24,234.00`}</h3>
        <Col span={3}></Col>
      </Row>
      <Row>
        <p>Please note that for New Zealand tax residents the total price is inclusive of GST.</p>
        <p>Free shipping to orders within New Zealand. Shipping outside of New Zealand will be charged separately.</p>
      </Row>
    </Card>
  )
}
export default Services