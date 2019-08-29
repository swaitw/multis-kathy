import React, { PureComponent} from 'react'
import Row from 'antd/lib/row';
import Layout from 'antd/lib/layout';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import Header from './Header'
import SideMenu from '../menus/SideMenu'
// const css = getAntCsses(['layout'])
const { Header:HeaderWrapper, Content, Footer,Sider} =  Layout

const WebsiteLayout =(props)=>{
  const { className,content="Content",children,routes } = props||{}
  return(
    <div className={`${className}`}>
      <Layout className="flex flex-column justify-between main-container">
        <HeaderWrapper style={{padding:0}}><Header/></HeaderWrapper>
        <Layout className="overfow-auto" style={{flex:'1 1 100%'}}>
          <Sider className="min-h-100"><SideMenu routes={routes}/></Sider>
          <Layout className="mh-100">
            <Content className="mh-100">{children}</Content>
          </Layout>
        </Layout>
        {/* <Footer>footer</Footer> */}
      </Layout>
    </div>
  )
}
export default styled(WebsiteLayout)`
.ant-layout-header{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background:var(--black);
}
.main-container{
  height:100vh
}
`