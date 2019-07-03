import React, { PureComponent} from 'react'
import { Layout,Row,Col} from 'antd'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import Header from './Header'
// const css = getAntCsses(['layout'])
const { Header:HeaderWrapper, Content, Footer} =  Layout

const WebsiteLayout =(props)=>{
  const { className,content="Content",children } = props||{}
  return(
    <div className={`${className}`}>
      <Layout className="flex flex-column justify-between min-h-100v mh-100v">
        <HeaderWrapper><Header/></HeaderWrapper>
        <Content className="px-15 overflow-hidden" style={{flex:'1 1 100%',display:'flex',flexDirection:'column'}}>{children}</Content>
        <Footer style={{background:'black'}}>
          <Row type="flex" justify="space-between" className="px-15" style={{color:'#fff'}}>
            <Col>
              <span>© 2002-2017 BizOffice Company Services Limited</span>
            </Col>
            <Col>
              <Link to='/privacy' style={{paddingRight:10}}>Privacy</Link>
              <Link to='/disclaimer'>Disclaimer</Link>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </div>
  )
}
export default styled(WebsiteLayout)`
.ant-layout{
  min-height:100vh
}
.ant-layout-header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:var(--black);
}
`