import React, { PureComponent, Fragment } from 'react'
import Steps from 'antd/lib/steps';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';

import styled from 'styled-components'
import moment from 'moment';
const { Step} = Steps
@Form.create()
class MultiPageForm extends PureComponent{

  state={
    currentView:0,
    isSubmitting:false
  }

  handleStepClick=(currentView)=>()=>{
    this.setState({
      currentView
    })
  }

  next=()=>{
    const {next=()=>{} ,form:{getFieldValue ,getFieldsValue,validateFields} ,applicationId } =  this.props
    validateFields((err,values)=>{
      console.log(values,'values',err)
      if(!err){
        const {currentView} = this.state
        this.setState({
          currentView:currentView+1
        })
        next(values)
      }
    })
  }

  prev=()=>{
    const {prev=()=>{}} =  this.props
    const {currentView} = this.state
    this.setState({
      currentView:currentView-1
    })
    prev()
  }

  handleSubmit=()=>{
    const {handleSubmit=()=>{} ,form:{getFieldValue ,getFieldsValue,validateFields} ,applicationId } =  this.props
    validateFields(async(err,values)=>{
      if(!err){
        this.setState({
          isSubmitting:true
        })
        const status = await handleSubmit()
        if(status){
          this.setState({
            submited:true,
            isSubmitting:false
          })
        }
        console.log(status,'handleSubmit')
      }
    })
  }

  render(){
    const { currentView,isSubmitting,submited } = this.state
    const {children,total,submitText="Submit",submittingText='Submitting', steps=[],currentStep=0,className,...restProps} = this.props

    // const  childrenWithProps = React.Children.map(children,(child)=>{

    //   if(child&&child.$$typeof){
    //     return React.cloneElement(child,{...restProps})
    //   }
    //   return child
    // })
    const currentContent = React.cloneElement(steps[currentView].content,{...restProps})
    return(
      <div className={`flex flex-column mh-100 flex-nowrap flex-1-1 ${className}`}>
        <div style={{flex:'0 0'}}>
          <Steps current={currentView} style={{flex:'0 0'}} size="small">
            {steps.map((item,i) => {
                const { title="" } = item
                let status = 'wait'
                if(i<currentStep){
                  status='finish'
                }
                if(i===currentView){
                  status='process'
                }

                return (
                <Step 
                  key={title} 
                  title={title} 
                  status={status}
                  onClick={i<=currentStep?this.handleStepClick(i):null}
                  style={i<=currentStep?{cursor:'pointer'}:{}}
                />)
              })
            }
          </Steps>
        </div>
        <div style={{flex:'1 1 100%',overflow:'auto'}}  className="flex flex-column mh-100 flex-nowrap">
          <div style={{flex:'1 1 100%',overflow:'auto',border:'1px solid #e9e9e9'}}>{currentContent}</div>
          <div style={{display:'flex',flexDirection:'row', flex:'0 0',paddingTop:'1rem',justifyContent:'space-between'}}>
            <div className="flex justify-flex-end w-100">
              {
                currentView>0&&<Button type="primary" onClick={() => this.prev()} className="mr-3">prev</Button>
              }
              {
                currentView<total-1?<Button type="primary" onClick={() => this.next()}>Next</Button>:
                <Button type="primary" onClick={this.handleSubmit} disabled={submited} loading={isSubmitting}>{submited?"Submited":(isSubmitting?submittingText:submitText)}</Button>
              }
            </div>   
          </div>
        </div>
      </div>
    )
  }
}

export default styled(MultiPageForm)`
.ant-steps-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;
  margin: 0px;
  margin-right:0px!important;
}
.ant-steps-item-icon{
  margin:0px;
}
.ant-steps-item-title{
  text-align:center;
  white-space: initial;
  padding-right: 0px;
}
`