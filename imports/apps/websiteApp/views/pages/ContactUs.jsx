import React, { PureComponent} from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Checkbox,
  InputNumber
} from 'antd'
import { renderRoutes} from '../../../../lib/router/index'
import styled from 'styled-components';
import SideMenu from '../menus/SideMenu'
import ContactUsForm from './forms/ContactUsForm';
// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['layout','card','form','row','grid','checkbox','icon','input-number'])
const {Item:FormItem}=Form

class ContactUs extends PureComponent{
 

  render(){
    const { className } = this.props
    const { route:{routes=[]}={} } = this.props
    return(
      <Row className={className}>
        <Col span={6} className="px-3 pt-5">
          <SideMenu />
        </Col>  
        <Col span={18} className="px-3 pt-5">
          <Card
            title="Contact Us"
          >
            <Row type="flex">
              <h4>Phone:</h4><span>+64 9 3099925</span>
            </Row>
            <Row type="flex">
              <h4>Fax:</h4><span>+64 9 3099925</span>
            </Row>
            <Row type="flex">
              <h4>Postal Address:</h4><span>PO Box 105805, Auckland City 1143, New Zealand</span>
            </Row>
            <Row type="flex">
              <h4>Physical Address:</h4><span>1A/6 Viaduct Harbour Ave, Auckland 1010, New Zealand</span>
            </Row>
            <ContactUsForm />
          </Card>
        </Col>
      </Row>
      
    )
  }
}
export default styled(ContactUs)`
.px-3{
  padding-right:calc(var(--spacer));
  padding-left:calc(var(--spacer));
}
`