import React, { PureComponent} from 'react';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
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
            <Row type="flex" className='info-row'>
              <h6>Phone:</h6><span>+64 9 3099925</span>
            </Row>
            <Row type="flex" className='info-row'>
              <h6>Fax:</h6><span>+64 9 3099925</span>
            </Row>
            <Row type="flex" className='info-row'>
              <h6>Postal Address:</h6><span>PO Box 105805, Auckland City 1143, New Zealand</span>
            </Row>
            <Row type="flex" className='info-row' style={{marginBottom:30}}>
              <h6>Physical Address:</h6><span>1A/6 Viaduct Harbour Ave, Auckland 1010, New Zealand</span>
            </Row>
            <ContactUsForm  />
          </Card>
        </Col>
      </Row>
      
    )
  }
}
export default styled(ContactUs)`
.info-row h6{
  margin:0;
}
.info-row {
  padding:10px 0px;
  align-items:center;
}
.px-3{
  padding-right:calc(var(--spacer));
  padding-left:calc(var(--spacer));
}
`