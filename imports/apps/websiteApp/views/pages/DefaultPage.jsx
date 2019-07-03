import React, { PureComponent} from 'react';
import { withRouter } from 'react-router-dom'
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
import SideMenu from '../menus/SideMenu';
import BlogPage from '../pages/BlogPage'
// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['layout','card','form','row','grid','checkbox','icon','input-number'])
const {Item:FormItem}=Form

class InfoPage extends PureComponent{
 

  render(){
    const { className } = this.props
    const { route:{routes=[]}={},match } = this.props
    console.log(this.props,'withRouter')
    return(
      <Row className={`overflow-hidden ${className}`}>
        <Col span={6} className="px-3 pt-5">
          <SideMenu />
        </Col>  
        <Col span={18} className="px-3 pt-5 overflow-auto">
          <BlogPage match={match}/>
        </Col>
      </Row>
      
    )
  }
}
export default styled(withRouter(InfoPage))`
display:flex;
.px-3{
  padding-right:calc(var(--spacer));
  padding-left:calc(var(--spacer));
}
`