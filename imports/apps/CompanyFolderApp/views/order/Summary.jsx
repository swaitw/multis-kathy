import React from 'react';
import Table from 'antd/lib/table';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import OrderReview from '../../../websiteApp/views/pages/forms/OrderReview'

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

const Summary = props=>{
  const {values,orderId,adminData=[],orderStatus=[]} = props
  return(
    <Card
      title='Summary'
    >
      <Row>
        <Col span={12}>
          <h4>Administration</h4>
          <Table
            size="small"
            dataSource={adminData}
            columns={columns}
            pagination={false}
            showHeader={false}
          />
        </Col>
        <Col span={12}>
          <h4>Order Status</h4>
          <Table
            size="small"
            dataSource={orderStatus}
            columns={columns}
            pagination={false}
            showHeader={false}
          />
        </Col>
      </Row>
      <div>
        <OrderReview values={values} title={`Order details (OrderId:${orderId})`}/>
      </div>
    </Card>
  )
}

export default Summary