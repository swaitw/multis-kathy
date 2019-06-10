import React, { PureComponent, Fragment } from 'react'
import {
  Row,
  Col,
  Form,
  Button,
  Icon,
  Steps
} from 'antd'
import moment from 'moment';
const { Step} = Steps
@Form.create()
class MultiPageForm extends PureComponent{

  state={
    currentView:0
  }

  handleStepClick=(currentView)=>()=>{
    this.setState({
      currentView
    })
  }

  next=()=>{
    const {next ,form:{getFieldValue ,getFieldsValue,validateFields} ,applicationId } =  this.props
    validateFields((err,values)=>{
      // console.log(err,'err')
      if(!err){
        const {currentView} = this.state
        this.setState({
          currentView:currentView+1
        })
        next()
      }
    })
  }

  prev=()=>{
    const {prev} =  this.props
    const {currentView} = this.state
    this.setState({
      currentView:currentView-1
    })
    prev()
  }

  handleSubmit=()=>{
    const {handleSubmit=()=>{} ,form:{getFieldValue ,getFieldsValue,validateFields} ,applicationId } =  this.props
    validateFields((err,values)=>{
      if(!err){
        handleSubmit()
      }
    })
  }

  render(){
    const { currentView } = this.state
    const {children,total,submited,submitText="Submit",steps=[],currentStep=0,...restProps} = this.props

    // const  childrenWithProps = React.Children.map(children,(child)=>{

    //   if(child&&child.$$typeof){
    //     return React.cloneElement(child,{...restProps})
    //   }
    //   return child
    // })
    const currentContent = React.cloneElement(steps[currentView].content,{...restProps})
    return(
      <Row type='flex' className="flex-column mh-100 flex-nowrap">
        <Row>
          <Steps current={currentView} style={{flex:'0 0 auto'}} progressDot>
            {steps.map((item,i) => {
                const { title="" } = item
                let status = 'wait'
                if(i<currentStep){
                  status='finish'
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
        </Row>
        <Row style={{flex:'1 1 auto',overflow:'auto'}}  className="flex flex-column mh-100 flex-nowrap">
          <Row style={{flex:'1 1 auto',overflow:'auto'}}>{currentContent}</Row>
          <Row type='flex' justify='end' style={{flex:'0 0 auto',paddingTop:'1rem'}}>
            <Col>
              {
                currentView>0&&<Button type="primary" onClick={() => this.prev()} className="mr-3">prev</Button>
              }
              {
                currentView<total-1?<Button type="primary" onClick={() => this.next()}>Next</Button>:
                <Button type="primary" onClick={this.handleSubmit} disabled={submited}>{submited?"Submited":submitText}</Button>
              }     
            </Col>
          </Row>
        </Row>
      </Row>
    )
  }
}

export default MultiPageForm