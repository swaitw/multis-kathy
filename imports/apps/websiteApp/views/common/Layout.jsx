import React, { PureComponent} from 'react'
import { Layout,Row} from 'antd'
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import Header from './Header'
// const css = getAntCsses(['layout'])
const { Header:HeaderWrapper, Content, Footer} =  Layout

const WebsiteLayout =(props)=>{
  const { className,content="Content",children } = props||{}
  return(
    <div className={`${className}`}>
      <Layout className="flex flex-column justify-between min-h-100v">
        <HeaderWrapper><Header/></HeaderWrapper>
        <Content className="px-15 overfow-auto" style={{flex:'1 1 100%'}}>{children}</Content>
        <Footer>footer</Footer>
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