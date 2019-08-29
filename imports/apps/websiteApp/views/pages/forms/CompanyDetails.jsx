import React, { PureComponent, Fragment } from 'react'
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import InputNumber from 'antd/lib/input-number';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';
import Checkbox from 'antd/lib/checkbox';
const { Item:FormItem} = Form
const {Group:RadioGroup} = Radio;
const {Option} = Select
const CompanyDetails =(props)=>{
  const { form:{getFieldDecorator},company={},title='Company details',isMultiStep=true} = props
  const { registeredAddress={},serviceAddress={},postAddress={},email={} } = company
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
  const extraProps ={}
  if(!isMultiStep){
    extraProps.extra=<Button onClick={handleSave} type='primary'>Save</Button>
  }
  return(
    <Card
      bordered={false}
      title="Company Details"
      {...extraProps}
    > 
      <h4>Company Names:</h4>
      <Row type="flex">
        <Col className="pr-2" span={6}>
          <FormItem>
            <span>Preferred Name:</span>
          </FormItem>
          <FormItem>
            <span>Second Choice:</span>
          </FormItem>
          <FormItem>
            <span>Third Choice:</span>
          </FormItem>
        </Col>
        <Col span={18}>
          <FormItem>
            {
              getFieldDecorator('company.preferredName',{
                initialValue:company.preferredName||''
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.secondName',{
                initialValue:company.secondName||''
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.thirdName',{
                initialValue:company.thirdName||''
              })(
                <Input />
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4>Incorporation Options:</h4>
      <Row type="flex">
        <Col className="pr-2" span={6}>
          <FormItem>
            <span>Number of Directors:</span>
          </FormItem>
          <FormItem>
            <span>Number of Shareholders:</span>
          </FormItem>
          <FormItem>
            <span>Company Constitution:</span>
          </FormItem>
          <FormItem>
            <span>Annual Return Month:</span>
          </FormItem>
          <FormItem>
            <span>LAQC Check:</span>
          </FormItem>
        </Col>
        <Col span={18}>
          <FormItem>
            {
              getFieldDecorator('company.numberOfDirectors',{
                initialValue:company.numberOfDirectors||''
              })(
                <InputNumber />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.numberOfShareholders',{
                initialValue:company.numberOfShareholders||''
              })(
                <InputNumber />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.constitution',{
                initialValue:company.constitution||''
              })(
                <RadioGroup>
                  <Radio value="Standard">Standard</Radio>
                  <Radio value="None">None</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.annualReturnMonth',{
                initialValue:company.annualReturnMonth||'Please Select'
              })(
                <Select>
                  <Option value="Please Select" disabled>Please Select</Option>
                  <Option value="Auto">Auto</Option>
                  <Option value="Febuary">Febuary</Option>
                  <Option value="March">March</Option>
                  <Option value="April">April</Option>
                  <Option value="May">May</Option>
                  <Option value="June">June</Option>
                  <Option value="July">July</Option>
                  <Option value="August">August</Option>
                  <Option value="September">September</Option>
                  <Option value="October">October</Option>
                  <Option value="November">November</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.laqcCheck',{
                initialValue:company.laqcCheck||true,
                valuePropName:'checked'
              })(
                <Checkbox>do a check to verify a company can be become LAQC</Checkbox>
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4>Company Addresses:</h4>
      <Row type="flex" className="flex-nowrap">
        <Col className="pr-2" span={6}>
          <FormItem>
            <span>Address of Registered Office:</span>
            <p style={{fontSize:9}}>must be physical street address and not a postal centre or document exchange</p>
          </FormItem>
        </Col>
        <Col span={18}>
          <FormItem>
            {
              getFieldDecorator('company.registeredAddress.street',{
                initialValue:registeredAddress.street||''
              })(
                <Input 
                  placeholder="Street"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.registeredAddress.city',{
                initialValue:registeredAddress.city||''
              })(
                <Input 
                  placeholder="City"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.registeredAddress.area')(
                <Input 
                  placeholder="Area"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.registeredAddress.country',{
                initialValue:registeredAddress.country||''
              })(
                <Input 
                  placeholder="Country"
                />
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" className="flex-nowrap">
        <Col className="pr-2" span={6}>
          <FormItem>
            <span>Address for Service:</span>
            <p style={{fontSize:9}}>must be physical street address and not a postal centre or document exchange</p>
          </FormItem>
        </Col>
        <Col span={18}>
          <FormItem>
            {
              getFieldDecorator('company.serviceAddress.isSame',{
                initialValue:serviceAddress.isSame||false,
                valuePropName:'checked'
              })(
                <Checkbox>Same as Registered Office or:</Checkbox>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.serviceAddress.street',{
                initialValue:serviceAddress.street||''
              })(
                <Input 
                  placeholder="Street"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.serviceAddress.city',{
                initialValue:serviceAddress.city||''
              })(
                <Input 
                  placeholder="City"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.serviceAddress.area',{
                initialValue:serviceAddress.area||''
              })(
                <Input 
                  placeholder="Area"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.serviceAddress.country',{
                initialValue:serviceAddress.country||''
              })(
                <Input 
                  placeholder="Country"
                />
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" className="flex-nowrap">
        <Col className="pr-2" span={6}>
          <FormItem>
            <span>Postal Address:</span>
          </FormItem>
        </Col>
        <Col span={18}>
          <FormItem>
            {
              getFieldDecorator('company.postAddress.isSame',{
                initialValue:postAddress.isSame||false,
                valuePropName:'checked'
              })(
                <Checkbox>Same as Registered Office or:</Checkbox>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.postAddress.street',{
                initialValue:postAddress.street||''
              })(
                <Input 
                  placeholder="Street"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.postAddress.city',{
                initialValue:postAddress.city||''
              })(
                <Input 
                  placeholder="City"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.postAddress.area',{
                initialValue:postAddress.area||''
              })(
                <Input 
                  placeholder="Area"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.postAddress.country',{
                initialValue:postAddress.country||''
              })(
                <Input 
                  placeholder="Country"
                />
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" className="flex-nowrap">
        <Col className="pr-2" span={6}>
          <FormItem>
            <span>E-mail:</span>
          </FormItem>
        </Col>
        <Col span={18}>
          <FormItem>
            {
              getFieldDecorator('company.email.isSame',{
                initialValue:email.isSame||false,
                valuePropName:'checked'
              })(
                <Checkbox>Same as Registered Office or:</Checkbox>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('company.email.address')(
                <Input 
                  placeholder="Email"
                />
              )
            }
          </FormItem>
        </Col>
      </Row>
    </Card>
  )
}
export default CompanyDetails