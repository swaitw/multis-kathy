import React, { PureComponent, Children } from 'react';
import { Link } from 'react-router-dom'
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';

const Layout = (props)=>{
  const {children} = props
  return(
    <Card
      title="Blog"
      className="ant-card-flex-full"
      bodyStyle={{overflow:'hidden'}}
      extra={<Link to='admin/blog/new'><Button icon="plus" type='primary'>Add New Blog</Button></Link>}
    >
      {children}
    </Card>
  )
}

export default Layout