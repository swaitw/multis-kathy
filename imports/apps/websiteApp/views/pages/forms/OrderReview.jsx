import React, { PureComponent } from 'react';
import { 
  Card,
  Row,
  Col,
  Table
 } from 'antd';

const columns = [
  {
    title:'item',
    dataIndex:'item',
    key:'item'
  },
  {
    title:'value',
    dataIndex:'value',
    key:'value'
  }
]

const personalDetails=[
  {
    item:'Last name',
    value:null
  },
  {
    item:'First name',
    value:null
  },
]

const companyNames=[
  {
    item:'Preferred Name:',
    value:null
  },
]

const OrderReview = (props)=>{

  return(
    <Card
      title="Review the order"
    >
      <Row>
        <h4>Your details</h4>
        <Table
          size="small"
          dataSource={personalDetails}
          columns={columns}
          pagination={false}
          showHeader={false}
        />
      </Row>
      <Row>
        <h4>Company details</h4>
        <h6 style={{paddingLeft:'0.25rem'}}>Company Names</h6>
        <Table
          size="small"
          dataSource={companyNames}
          columns={columns}
          pagination={false}
          showHeader={false}
        />
      </Row>
    </Card>
  )
}

export default OrderReview