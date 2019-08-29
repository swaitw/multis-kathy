import React, { PureComponent} from 'react';
import Card from 'antd/lib/card';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { renderRoutes} from '../../../../lib/router/index'
import styled from 'styled-components';
import SideMenu from '../menus/SideMenu'
// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['layout','card','form','row','grid','checkbox','icon','input-number'])
const {Item:FormItem}=Form

class About extends PureComponent{
 

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
            title="About"
          >
            <p>We are 100% New Zealand-owned business.</p>
            <p>We are the first company to have the most complete integration with the NZ Companies Office which lets us deliver the best value for you.</p>
            <p>Our online application is by far the easiest way to apply for a new company registration.</p>
            <p>Our clients include individuals, accountants and lawyers whether for doing business in New Zealand or purchasing property.</p>
            <p>We provide you with the most comprehensive complete company folder.</p>
          </Card>
        </Col>
      </Row>
      
    )
  }
}
export default styled(About)`
.px-3{
  padding-right:calc(var(--spacer));
  padding-left:calc(var(--spacer));
}
`