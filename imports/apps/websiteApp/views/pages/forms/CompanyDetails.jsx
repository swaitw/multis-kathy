import React, { PureComponent, Fragment } from 'react'
import {
  Form, 
  Input,
  Card,
  Row,
  Col,
  InputNumber,
  Radio,
  Select,
  Checkbox
} from 'antd'
const { Item:FormItem} = Form
const {Group:RadioGroup} = Radio;
const {Option} = Select
const CompanyDetails =(props)=>{
  const { form:{getFieldDecorator}} = props
  return(
    <Card
      title="Company Details"
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
              getFieldDecorator('preferredName')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('secondName')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('thirdName')(
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
              getFieldDecorator('numberOfDirectors')(
                <InputNumber />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('numberOfShareholders')(
                <InputNumber />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('constitution')(
                <RadioGroup>
                  <Radio value="Standard">Standard</Radio>
                  <Radio value="None">None</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('annualReturnMonth',{
                initialValue:"Please Select"
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
              getFieldDecorator('laqcCheck')(
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
              getFieldDecorator('registeredAddress.street')(
                <Input 
                  placeholder="Street"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('registeredAddress.city')(
                <Input 
                  placeholder="City"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('registeredAddress.area')(
                <Input 
                  placeholder="Area"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('registeredAddress.country')(
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
              getFieldDecorator('serviceAddress.isSame')(
                <Checkbox>Same as Registered Office or:</Checkbox>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('serviceAddress.street')(
                <Input 
                  placeholder="Street"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('serviceAddress.city')(
                <Input 
                  placeholder="City"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('serviceAddress.area')(
                <Input 
                  placeholder="Area"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('serviceAddress.country')(
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
              getFieldDecorator('postAddress.isSame')(
                <Checkbox>Same as Registered Office or:</Checkbox>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('postAddress.street')(
                <Input 
                  placeholder="Street"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('postAddress.city')(
                <Input 
                  placeholder="City"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('serviceAddress.area')(
                <Input 
                  placeholder="Area"
                />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('postAddress.country')(
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
              getFieldDecorator('email.isSame')(
                <Checkbox>Same as Registered Office or:</Checkbox>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('email')(
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