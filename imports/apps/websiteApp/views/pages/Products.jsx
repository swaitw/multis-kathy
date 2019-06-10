import React, { PureComponent} from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Checkbox,
  InputNumber,
  Table
} from 'antd'
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
      key:'price'
    }
  ]
  render(){
    const { className } = this.props
    const { route:{routes=[]}={} } = this.props
    return(
      <Row className={className}>
        <Col span={6} className="px-3 pt-5">
          <SideMenu />
        </Col>  
        <Col span={18} className="px-3 pt-5">
          <Table 
            columns={this.columns}
            pagination={false}
          />
          <p>Prices include GST, government fees and discounts.</p>
        </Col>
      </Row>
      
    )
  }
}
export default styled(Products)`
.px-3{
  padding-right:calc(var(--spacer));
  padding-left:calc(var(--spacer));
}
`