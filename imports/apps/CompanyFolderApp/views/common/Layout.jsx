import React, { PureComponent, Children } from 'react';
import { Link } from 'react-router-dom'
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
const Layout = (props)=>{
  const {children} = props
  return(
    <Card
      title="Orders"
      className="ant-card-flex-full"
      bodyStyle={{overflow:'hidden',display:'flex',flexDirection:'column'}}
      extra={<Link to='admin/orders/new'><Button icon="plus" type='primary'>Add New Order</Button></Link>}
    >
      {children}
    </Card>
  )
}

export default Layout