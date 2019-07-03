import React, { PureComponent, Fragment } from 'react'
import { Orders } from '../../../api/orders.mongon'
import { withTracker } from 'meteor/react-meteor-data'
import {
  Table, 
  Card, 
  Button,
  Tag,
  Progress,
  Row,
  Icon,
  Menu,
  Col,
  Avatar,
  Form
} from 'antd'
import moment from 'moment';
import styled from 'styled-components'

import Summary from './order/Summary'
import Client from '../../websiteApp/views/pages/forms/PersonalDetail'
import Company from '../../websiteApp/views/pages/forms/CompanyDetails'
import DirectorsDetail from '../../websiteApp/views/pages/forms/Directors'
import ShareholdersDetail from '../../websiteApp/views/pages/forms/Shareholders'
import Services from '../../websiteApp/views/pages/forms/Services'
import CompanyFolder from './CompanyFolder'
import { Meteor } from 'meteor/meteor';

const ClientWihtForm = Form.create()(Client)
const CompanyWihtForm = Form.create()(Company)
const DirectorsWihtForm = Form.create()(DirectorsDetail)
const ShareholdersWihtForm = Form.create()(ShareholdersDetail)
const ServicesWihtForm = Form.create()(Services)
const {Item:MenuItem} = Menu
const {ItemGroup:MenuItemGroup,SubMenu} = Menu;

const getValues=(client={},order,orderId)=>{
  const { profile:person } = client
  const { createAt,_id,clientId,status='NEW',...rest } = order
  const { company={} } = rest
  const adminData=[
    {
      item:'Order submitted on',
      value:moment(createAt).format('DD/MM/YYYY, HH:mm a')
    },
    {
      item:'Name reserved',
      value:company.preferredName||''
    },
    {
      item:'Return Month',
      value:company.annualReturnMonth&&company.annualReturnMonth!=='Please Select'?company.annualReturnMonth:''
    },
    {
      item:'First Annual Return',
      value:''
    },
    {
      item:'Constitution',
      value:company.constitution||''
    },
    {
      item:'Company No',
      value:''
    },
    {
      item:'Company Key',
      value:''
    },
    {
      item:'Order version',
      value:'OR_VERSION_3'
    },
  ]
  const orderStatus=[
    {
      item:'Order No',
      value:orderId,
    },
    {
      item:'Status',
      value:status,
    },
    {
      item:'Time submited',
      value:moment(createAt).format('DD/MM/YYYY, HH:mm a'),
    },
    {
      item:'How did hear about us?',
      value:'',
    },
  ]
  return{
    adminData,
    orderStatus,
    values:{
      person,
      ...rest
    }
  }
}

@withTracker(({match:{params:{orderId}}})=>{
  const orderHandle = Meteor.subscribe('order',orderId)
  const order =  Orders.findOne({_id:orderId})||{}
  const {clientId} = order
  const clientHandle = Meteor.subscribe('client',clientId)
  const client = Meteor.users.findOne({_id:clientId})
  const loading = !orderHandle.ready()&&!clientHandle.ready()
  const { values,adminData,orderStatus } =getValues(client,order,orderId)
  return {
    order,
    orderId,
    client,
    values,
    adminData,
    orderStatus
  }
})
class OrderDetail extends PureComponent{

  state={
    productsTabKey:'summary',
    menuKey:'summary'
  }
  productsTabs=[
    {
      tab:'Mortgage',
      key:'mortgage'
    }
  ]

  menus = [
    {
      label:'Client',
      key:'client'
    },
    {
      label:'Company',
      key:'company'
    },
    {
      label:'Directors',
      key:'directors'
    },
    {
      label:'Shareholders',
      key:'shareholders'
    },
    {
      label:'Services',
      key:'services'
    },
    {
      label:'Invoice',
      key:'invoice'
    }
  ]

  orderMenus=[
    {
      label:'Company Information',
      key:'companyInfo'
    },
    {
      label:"Resolution:Relating to Auditor",
      key:"relatingToAuditor"
    },
    {
      label:'Minutes:First meeting to directors',
      key:'firstMeetingToDirectors'
    },
    {
      label:'Registers:Directors',
      key:'directorsPdf'
    },
    {
      label:'Registers:Members',
      key:'members'
    },
    {
      label:'Registers:Address and Others',
      key:'addressAndOthers'
    }
  ]


  getContent=(key)=>{
    // const { applicationId } = this.props
    const {client,orderId,adminData=[],values={},orderStatus=[] } = this.props

    switch(key){
      case "client":
        return (
          <ClientWihtForm 
            person={values.person} 
            isMultiStep={false} 
            title='Client Detail'
            handleSave={this.handleSave}
          />)
      case 'company':
        return(
          <CompanyWihtForm
            company={values.company}
            isMultiStep={false} 
            title='Company Detail'
            handleSave={this.handleSave}
          />
        )
      case 'directors':
        return(
          <DirectorsWihtForm 
            directors={values.directors}
            isMultiStep={false} 
            title='Directors Detail'
            handleSave={this.handleSave}
          />
        )
      case 'shareholders':
        return(
          <ShareholdersWihtForm 
            shareholders={values.shareholders}
            isMultiStep={false} 
            title='Shareholders Detail'
            handleSave={this.handleSave}
          />
        )
      case 'services':
        return(
          <ServicesWihtForm 
            services={values.services}
            isMultiStep={false} 
            title='Services'
            handleSave={this.handleSave}
          />
        )
      case 'companyFolder':
      case 'companyInfo':
      case 'relatingToAuditor':
      case 'firstMeetingToDirectors':
      case 'directorsPdf':
      case 'members':
      case 'addressAndOthers':
        console.log('companyInfo')
        return(
          <CompanyFolder currentKey={key}/>
        )
      default :
        return <Summary values={values} orderStatus={orderStatus} adminData={orderStatus} orderId={orderId}/>
    }
  }

  handleMenuClick=(menuKey)=>()=>{
    this.setState({
      menuKey
    })
  }

  handleOpenApplication=()=>{
    const { history } =  this.props
    history.push("/client/application")
  }

  handleSave=(values={})=>{
    console.log(values.person)
    const { person,...rest}=values
    if(person){
      const { client:{_id}={} } = this.props 
      console.log(values.person,_id)
      Meteor.call('updateProfile',_id,values.person)
    }
    if(Object.keys(rest).length>0){
      console.log(values,'values')
      const { order:{_id}={}} = this.props
      Meteor.call('updateOrder',_id,values)
    }
  }
  render(){
    const {route = {},className} = this.props
    const { productsTabKey,menuKey } = this.state
    console.log(this.props, 'application 1111111111111111111111111111111111')
    return(
      <Row className={`full-height-box-h h-100 ${className}`} style={{height:'100%'}}>
        <Col span={4} className="h-100 full-height-box-h" >
          <Menu className="full-height-box-s h-100" style={{border:'1px solid #e9e9e9'}} mode="inline">
            <MenuItemGroup 
              title='Overview' 
              className="border-bottom"
            >
              <MenuItem
                onClick={this.handleMenuClick('summary')}
              >
                Order Summary
              </MenuItem>
            </MenuItemGroup>
            <MenuItemGroup 
              title='Order execution'           
              className="border-bottom"
            >
              {
                this.menus.map((menu)=>{
                  const { label, key } =menu
                  return (
                    <MenuItem
                      key={label}
                      onClick={this.handleMenuClick(key)}
                    >
                      {label}
                    </MenuItem>
                  )
                })
              }
            </MenuItemGroup>
            <SubMenu 
              title='Company Folder' 
              className="border-bottom"
              onTitleClick={this.handleMenuClick('companyFolder')}
            >
              {
                this.orderMenus.map((menu)=>{
                  const { label, key } =menu
                  return (
                    <MenuItem
                      key={label}
                      onClick={this.handleMenuClick(key)}
                    >
                      {label}
                    </MenuItem>
                  )
                })
              }
            </SubMenu >
          </Menu>
        </Col>
        <Col span={20} className="h-100 full-height-box-s">
            <div id='content' className="h-100 full-height-box-s">
            { this.getContent(menuKey)}
            </div>
        </Col>
      </Row>
    )
  }
}

export default styled(OrderDetail)`
.ant-menu-inline .ant-menu-item{
  width: 100%;
}
`