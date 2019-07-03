import React, { PureComponent} from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Checkbox,
  InputNumber,
  Modal,
  Spin
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
import { Meteor } from 'meteor/meteor';
// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['layout','card','form','row','grid','checkbox','icon','input-number'])
const {Item:FormItem}=Form
const {confirm} = Modal;
const showConfirm=(type='addShareholder',options={})=>{
  if(type==='addShareholder'){
    const { total,callback} = options
    confirm({
      title: `up to shareholders limited(total:${total})!`,
      content:'Press Ok to force Add this Director to Shareholder or Press Cancel to modify it manually',
      onOk(){
        callback(true)
      },
      onCancel(){
        callback(false)
      }
    })
  }
  if(type==='updateDirectorsNumber'){
    confirm({
      title: `the director data is not empty`,
      content:'please clean director data or delete director manually',
    })
  }
  if(type==='updateShareholdersNumber'){
    confirm({
      title: `the shareholder data is not empty`,
      content:'please clean shareholder data or delete shareholder manually',
    })
  }
  if(type==='emailCheck'){
    confirm({
      title: `Your email has alredy has account`,
      content:'please click OK to login in use this email or Click Cancel change to another email',
      onOk(){
        // todo login redirect
        console.log('need login')
      }
    })
  }
}

class ResisterCompany extends PureComponent{
  state={
    currentView:0,
    currentStep:0,
    userId:null,
    values:{}
  }

  localStorage=Meteor.isClient?window.localStorage:false
  isDataLoaded=false
  componentDidMount() {
    console.log('componentDidMount')
    if(Meteor.isClient){
      console.log(window.localStorage.getItem('company_register_values'),'localStorage')
      this.setState({
        values:JSON.parse(window.localStorage.getItem('company_register_values')||'{}')||{},
        currentStep:parseInt(window.localStorage.getItem('company_register_currentStep'))||0
      })
    }
    this.isDataLoaded=true
  }

  getSteps = ()=>{
    const { values={},currentStep } = this.state
    const {person={},company={},directors=[],shareholders=[],issueSharePrice,services={}}= values
    return [
      {
        title:"Your details",
        content:<PersonalDeatil person={person}  showConfirm={showConfirm}/>
      },
      {
        title:"Company Details",
        content:<CompanyDetails company={company}/>
      },
      {
        title:"Directors of the proposed company",
        content:<Directors 
          directors={directors} 
          toggleDirectorAsShareholder={this.toggleDirectorAsShareholder}
          updateNumber={this.updateNumber}
          clearData={this.clearData}
          showConfirm={showConfirm}
        />
      },
      {
        title:"Shareholders of the proposed company",
        content:<Shareholders
          issueSharePrice={issueSharePrice}
          shareholders={shareholders}
          updateNumber={this.updateNumber}
          showConfirm={showConfirm}
          clearData={this.clearData}
        />
      },
      {
        title:"Services to be rendered",
        content:<Services services={services}/>
      },
      {
        title:"Review the order",
        content:<OrderReview  values={values}/>
      }
    ]
  }

  toggleDirectorAsShareholder=(director,isAdd,force)=>{
    const { values } = {...this.state}
    const {shareholders} = {...values}
    const index = shareholders.findIndex((shareholder)=>(shareholder.lname===director.lname&&shareholder.fname===director.fname))
    if(isAdd&&index===-1){
      const { email,isShareholder,...rest}=director
      const emptyIndex=shareholders.findIndex((shareholder)=>{
        const { lname='',fname=''} = shareholder
        return lname.replace(/\s/g,"").length===0&&fname.replace(/\s/g,"").length===0
      })
      console.log(emptyIndex,'emptyIndex')
      if(emptyIndex!==-1){
        shareholders.splice(emptyIndex,1,rest)
        values.shareholders=shareholders
        this.handleSave({...values})
        return true
      }else if(force){
        shareholders.push(rest)
        values.shareholders=shareholders
        values.company.numberOfShareholders +=1
        this.handleSave({...values})
        return true
      }else{
        console.log(shareholders,'shareholders')
        return shareholders.length
      }
    }
    if(!isAdd&&index!==-1){
      shareholders.splice(index,1)
      values.shareholders=shareholders
      this.handleSave({...values})
      return true
    }
    return true
  }

  updateNumber=(number,type)=>{
    const { values } = {...this.state}
    const { company } = values
    if(values[type].length<number){
      type==='directors'?company.numberOfDirectors = number:company.numberOfShareholders = number
      values[type].push({})
      values.company = company
      this.handleSave({...values})
      return true
    }
    for(let i=0;i<values[type].length-number;i++){
      const index = values[type].findIndex((people)=>{
        const { lname='',fname=''} = people
        return lname.replace(/\s/g,"").length===0&&fname.replace(/\s/g,"").length===0
      })
      if(index!==-1){
        values[type].splice(index,1)
      }else{
        return false
      }
    }
  }

  clearData=(type,i,isDelete)=>{
    if(type){
      const { values } = {...this.state}
        const { company } = values
        if(isDelete){
          values[type].splice(i,1)
          
          type==='directors'?company.numberOfDirectors -=1:company.numberOfShareholders -=1
          console.log(company,'type')
          values.company = company
          this.handleSave({...values})
        }else{
          values[type].splice(i,1,{})
          this.handleSave({...values})
        }
    }
  }

  localSave=(values,currentStep)=>{
    if(Meteor.isServer){
      return
    }
    this.localStorage.setItem('company_register_values',JSON.stringify(values))
    if(currentStep){
      this.localStorage.setItem('company_register_currentStep',currentStep)
    }
  }

  handleSave=(values,currentStep)=>{
    if(currentStep){
      this.localSave(values,currentStep)
      this.setState({values,currentStep})
    }else{
      this.localSave(values)
      this.setState({values})
    }
    
  }

  next=(data)=>{
    const { values,currentStep } = this.state
    const { company,directors,services } = data
    if(company){
      const { numberOfDirectors,numberOfShareholders } = company
      const directors=values.directors||[]
      const shareholders=values.shareholders||[]
      const modifyArrayLength=(targetLength,arry)=>{
        if(targetLength){
          if(targetLength>arry.length){
            for (let i=0; i<targetLength-arry.length;i++){
              arry.push({})
            }
          }
          if(targetLength<arry.length){
            arry.splice(-1,arry.length-targetLength)
          }
        }
        return arry
      }

      data.directors=modifyArrayLength(numberOfDirectors,directors)
      data.shareholders=modifyArrayLength(numberOfShareholders,shareholders)
    }
    if(services){
      data.services=JSON.parse(services)
    }
    const newValues = { ...values,...data}
    this.handleSave(newValues,currentStep+1)
  }

  handleSubmit=async ()=>{
    console.log('createNewOrder')
    const { values } = this.state
    const { person:{email}={}} = values
    const status = await new Promise((res,rej)=>{
      Meteor.call('createNewOrder',values,(err,result)=>{
        console.log(err,result,'createNewOrder')
        if(!err&&result&&Meteor.isClient){
          this.localStorage.removeItem('company_register_values')
          this.localStorage.removeItem('company_register_currentStep')
          res(true)
        }
      })
    })
    return status
  }

  render(){
    const {currentView,currentStep} = this.state
    const { className } = this.props
    console.log(this.state,'ResisterCompany')
    return(
      <Row className={className} style={{overflow:'hidden',display:'flex',flexDirection:'row',flex:'1 1 100%'}}>
        <Col span={6} className="px-3 pt-5">
          <SideMenu />
        </Col>
        <Col span={18} className="px-3 pt-5 overflow-hidden" style={{flex:'1 1 100%'}}>
          <Card
            title={<h4>Register a Company Online</h4>}
            className='ant-card-flex-full'
            bodyStyle={{overflow:'hidden',display:'flex',flexDirection:'column'}}
          >
              {
                this.isDataLoaded?<MultiPageForm 
                  steps = {this.getSteps()}
                  currentStep={currentStep}
                  total = {this.getSteps().length}
                  next={this.next}
                  handleSubmit={this.handleSubmit}
                />
                :<div style={{display:'flex',width:'100%',height:'100%',justifyContent:'center',flexDirection:'column',paddingBottom:'20%'}}><Spin /></div>
              }
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