import React, { PureComponent} from 'react';
import Table from 'antd/lib/table';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { renderRoutes} from '../../../../lib/router/index'
import styled from 'styled-components';
import SideMenu from '../menus/SideMenu'
// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['layout','card','form','row','grid','checkbox','icon','input-number'])
const {Item:FormItem}=Form

class Products extends PureComponent{
 
  columns=[
    {
      title:'Description',
      dataIndex:'description',
      key:'description'
    },
    {
      title:'Price(NZD)',
      dataIndex:'price',
      key:'price',
      render:(text)=>(<div style={{textAlign:'right'}}>{text}</div>)
    }
  ]
  services=[
    {
      description:'Company Incorporation with Electronic Statutory Documents',
      key:'0',
      price:'$289.00'
    },
    {
      description:'Executive Company Folder with hard copies of statutory documents',
      key:'c-0',
      price:'$89.00'
    },
    {
      description:'IRD Registration together with company incorporation',
      key:'c-1',
      price:'$99.00'
    },
    {
      description:'GST Registration together with company incorporation',
      key:'c-2',
      price:'$99.00'
    },
    {
      description:'Standard Constitution if ordered with company incorporation',
      key:'c-3',
      price:'$49.00'
    },
    {
      description:'Internet Domain Registration (.co.nz, 1 year) if ordered with company incorporation',
      key:'c-4',
      price:'$79.00'
    },
    {
      description:'Trade Mark Search if ordered with company incorporation',
      key:'c-5',
      price:'$199.00'
    },
    {
      description:'Registered Address (annual fee) if ordered with company incorporation',
      key:'c-6',
      price:'$199.00'
    },
    {
      description:'Postal Address (annual fee) if ordered with company incorporation',
      key:'c-7',
      price:'$199.00'
    },
    {
      description:'Document Notarization, Authentication and Apostille',
      key:'c-8',
      price:'$499.00'
    },
    {
      description:'New Shares Issue',
      key:'c-9',
      price:'$149.00'
    },
    {
      description:'Company Maintenance (per change) director appointment; director resignation; change of ownership',
      key:'c-10',
      price:'$99.00'
    },
    {
      description:'New Zealand Corporate bank account opening',
      key:'c-11',
      price:'$1,000.00'
    },
    {
      description:'FSP Registration',
      key:'1',
      price:'From $20,000.00'
    },
    {
      description:'FMA Registration',
      key:'2',
      price:'From $50,000.00'
    },
    {
      description:'Bilingual Website Design&Building (3-5 pages)',
      key:'3',
      price:'From $999.00'
    },
    {
      description:'Website Maintenance (per year)',
      key:'4',
      price:'From $499.00'
    },
    {
      description:'Company Folder for existing company',
      key:'5',
      price:'$199.00'
    },
    {
      description:'IRD Registration for existing company',
      key:'6',
      price:'$199.00'
    },
    {
      description:'GST Registration for existing company',
      key:'7',
      price:'$199.00'
    },
  ]
  render(){
    const { className } = this.props
    const { route:{routes=[]}={} } = this.props
    return(
      <Row className={`overflow-hidden ${className}`}>
        <Col span={6} className="px-3 pt-5">
          <SideMenu />
        </Col>  
        <Col span={18} className="px-3 pt-5 overflow-auto">
          <Table 
            size="small"
            style={{background:'#fff'}}
            columns={this.columns}
            dataSource={this.services}
            pagination={false}
          />
          <div className="py-3">
            <p>Prices include GST, government fees and discounts.</p>
            <p>For other services please refer to <a href='/contact-us'>Contact Us</a>.</p>
          </div>
        </Col>
      </Row>
      
    )
  }
}
export default styled(Products)`
display:flex;
.ant-table-small > .ant-table-content > .ant-table-body{
  margin:0px;
}
.ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th,
.ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-tbody > tr > td{
  padding:8px 16px;
}
.ant-table-small > .ant-table-content > .ant-table-body > table > .ant-table-tbody > tr:nth-child(even){
  background:#f8f8f8;
}
.px-3{
  padding-right:calc(var(--spacer));
  padding-left:calc(var(--spacer));
}
`