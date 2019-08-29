import React, { PureComponent, Fragment } from 'react'
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import { Meteor } from 'meteor/meteor';
const { Item:FormItem} = Form

const PersonalDeatil =(props)=>{
  const { form:{getFieldDecorator,getFieldValue,setFieldsValue},person={}, showConfirm=()=>{},title='Your details',isMultiStep=true} = props
  
  const handleSave = ()=>{
    if(!isMultiStep){
      const { handleSave=()=>{},form:{validateFields}}= props
      validateFields((err,values)=>{
        if(!err){
          handleSave(values)
        }
      })
    }
  }
  console.log(props,'person')
  const { address={} } = person
  const handleCheckEmail = ()=>{
    const email = getFieldValue('person.email')
    Meteor.call('getUserIdByEmail',email,{upsert:false},(err,userId)=>{
      if(!err&&userId){
        showConfirm('emailCheck',{userId})
        setFieldsValue({'person.email':''})
      }
    })
  }
  const extraProps ={}
  if(!isMultiStep){
    extraProps.extra=<Button onClick={handleSave} type='primary'>Save</Button>
  }
  return(
    <Card
      bordered={false}
      title={title}
      {...extraProps}
    > 
      <Row type="flex">
        <Col className="pr-2">
          <FormItem>
            <span>Last Name <span style={{color:'red'}}>*</span>:</span>
          </FormItem>
          <FormItem>
            <span>First Name<span style={{color:'red'}}>*</span>:</span>
          </FormItem>
          <FormItem>
            <span>E-mail<span style={{color:'red'}}>*</span>:</span>
          </FormItem>
          <FormItem>
            <span>Street<span style={{color:'red'}}>*</span>:</span>
          </FormItem>
          <FormItem>
            <span>City<span style={{color:'red'}}>*</span>:</span>
          </FormItem>
          <FormItem>
            <span>Phone<span style={{color:'red'}}>*</span>:</span>
          </FormItem>
          <FormItem>
            <span>Phone2:</span>
          </FormItem>
          <FormItem>
            <span>Fax:</span>
          </FormItem>
        </Col>
        <Col span={18}>
          <FormItem>
            {
              getFieldDecorator('person.lname',{
                initialValue:person.lname||'',
                rules:[
                  {
                    required:true,
                    message:'Please Enter your Last Name'
                  }
                ]
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('person.fname',{
                initialValue:person.fname||'',
                rules:[
                  {
                    required:true,
                    message:'Please Enter your First Name'
                  }
                ]
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('person.email',{
                initialValue:person.email||'',
                rules:[
                  {
                    required:true,
                    message:'Please Enter your email'
                  }
                ]
              })(
                <Input 
                  onBlur={handleCheckEmail}
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('person.address.street',{
                initialValue:address.street||'',
                rules:[
                  {
                    required:true,
                    message:'Please Enter your street'
                  }
                ]
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('person.address.city',{
                initialValue:address.city||'',
                rules:[
                  {
                    required:true,
                    message:'Please Enter your city'
                  }
                ]
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('person.phone',{
                initialValue:person.phone||'',
                rules:[
                  {
                    required:true,
                    message:'Please Enter your phone'
                  }
                ]
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('person.phone2',{
                initialValue:person.phone2||'',
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('person.fax',{
                initialValue:person.fax||'',
              })(
                <Input />
              )
            }
          </FormItem>
        </Col>
      </Row>
    </Card>
  )
}
export default PersonalDeatil