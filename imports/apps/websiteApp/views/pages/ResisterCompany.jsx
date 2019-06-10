import React, { PureComponent} from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Checkbox,
  InputNumber
} from 'antd'
import MultiPageForm from '../../../../ui/form/MultiPageForm';
import PersonalDeatil from './forms/PersonalDetail'
import CompanyDetails from './forms/CompanyDetails'
import Directors from './forms/Directors'
import Shareholders from './forms/Shareholders'
import Services from './forms/Services'
import OrderReview from './forms/OrderReview'
import styled from 'styled-components';
import SideMenu from '../menus/SideMenu'
// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['layout','card','form','row','grid','checkbox','icon','input-number'])
const {Item:FormItem}=Form

class ResisterCompany extends PureComponent{
  state={
    currentView:0
  }
  steps=[
    {
      title:"Your details",
      content:<PersonalDeatil />
    },
    {
      title:"Company Details",
      content:<CompanyDetails />
    },
    {
      title:"Directors of the proposed company",
      content:<Directors />
    },
    {
      title:"Shareholders of the proposed company",
      content:<Shareholders />
    },
    {
      title:"Services to be rendered",
      content:<Services />
    },
    {
      title:"Review the order",
      content:<OrderReview />
    }
  ]

  next=()=>{
    
  }

  render(){
    const {currentView} = this.state
    const { className } = this.props
    return(
      <Row className={className}>
        <Col span={6} className="px-3 pt-5">
          <SideMenu />
        </Col>  
        <Col span={18} className="px-3 pt-5">
          <Card
            title={<h1>Register a Company Online</h1>}
          >
            <MultiPageForm 
              steps = {this.steps}
              currentStep={2}
              total = {this.steps.length}
            />
          </Card>
        </Col>
      </Row>
      
    )
  }
}
export default styled(ResisterCompany)`
.px-3{
  padding-right:calc(var(--spacer));
  padding-left:calc(var(--spacer));
}
`