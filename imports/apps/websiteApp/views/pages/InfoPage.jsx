import React, { PureComponent} from 'react';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { renderRoutes} from '../../../../lib/router/index'
import styled from 'styled-components';
import SideMenu from '../menus/SideMenu'
// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['layout','card','form','row','grid','checkbox','icon','input-number'])
const {Item:FormItem}=Form

class InfoPage extends PureComponent{
 

  render(){
    const { className } = this.props
    const { route:{routes=[]}={} } = this.props
    return(
      <Row className={`overflow-hidden ${className}`}>
        <Col span={6} className="px-3 pt-5">
          <SideMenu />
        </Col>  
        <Col span={18} className="px-3 pt-5 overflow-auto">
          {renderRoutes(routes)}
        </Col>
      </Row>
      
    )
  }
}
export default styled(InfoPage)`
display:flex;
.px-3{
  padding-right:calc(var(--spacer));
  padding-left:calc(var(--spacer));
}
`