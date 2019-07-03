import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import {
  Table, Button
} from 'antd'
import { Meteor } from 'meteor/meteor';
import { Orders } from '../../../api/orders.mongon';
import moment from 'moment';
import { getFullName } from '../../../lib/common/peopleFunctions'
import { Categories } from '../../../api/categories.mongo';

const OrdersList  = (props) =>{
  const { orders=[],clients=[]} =  props
  console.log(clients,'&&director.email!==primaryEamil')
  const columns = [
    {
      title:'Order Id',
      key:'orderId',
      dataIndex:'orderId'
    },
    {
      title:'Company Name',
      key:'companyName',
      dataIndex:'companyName'
    },
    {
      title:'Company No',
      key:'companyNo',
      dataIndex:'companyNo'
    },
    {
      title:'E-mails',
      key:'emails',
      dataIndex:'emails',
      render:(text,record)=>{
        const { emails=[]} = record
        return(
          <Fragment>
            {
              emails.map((emailData,i)=>{
                const { name,email }=emailData
                return(
                  <Fragment key={email}>
                    <span>{i!==0?',':''}</span><a href={`mailto:${email}`} >{name}</a>
                  </Fragment>
                )
              })
            }
          </Fragment>
        )
      }
    },
    {
      title:'Status',
      key:'status',
      dataIndex:'status'
    },
    {
      title:'Actions',
      key:'action',
      render:(text,record)=>{
        console.log(record,'record')
        return(
          <div>
            <Link to={`/admin/orders/${record.orderId}`}><Button icon='edit' /></Link> 
            {
              !record.slug&&<Button onClick={deleteOrder(record.orderId)} icon='delete' type='danger' style={{marginLeft:'0.8rem'}}/>
            }
          </div>
        )
      }
    },
  ]
  const getOrdersData=()=>{
    return orders.map((order)=>{
      const { _id:id,company={},directors=[],status='New',companyId,clientId} = order
      const { preferredName } = company
      const emails = []
      const {profile:{email:primaryEamil,lname,fname}={}} = clients.find((client)=>(client._id===clientId))||{}
      if(primaryEamil){
        emails.push({
          name:(lname||fname)?getFullName({first:fname,last:lname}):primaryEamil,
          email:primaryEamil
        })
      }
      directors.forEach((director)=>{
        const {email,lname,fname } = director
        if(email&&email!==primaryEamil){
          emails.push({
            name:(lname||fname)?getFullName({first:fname,last:lname}):email,
            email
          })
        }
      })
      return{
        key:id,
        orderId:id,
        companyName:preferredName,
        emails,
        status,
      }
    })
  }

  const deleteOrder=(blogId)=>()=>{
    Meteor.call('deleteOrder',blogId)
  }
  return(
    <Table 
      columns={columns}
      dataSource={getOrdersData()}
    />
  )
}

const OrdersListContainer = withTracker(({})=>{
  if(Meteor.isClient){
    const ordersHandle = Meteor.subscribe('orders')
    const usersHandle = Meteor.subscribe('clients')
    const loading = !ordersHandle.ready()&&!usersHandle.ready()
    const orders = Orders.find({}).fetch()
    const clients = Meteor.users.find({}).fetch()
    return{
      orders,
      clients
    }
  }
  return{}
})(OrdersList)
export default OrdersListContainer