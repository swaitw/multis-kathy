import React, { PureComponent, Fragment } from 'react'
import {
  Form, 
  Input,
  Card,
  Row,
  Col
} from 'antd'
const { Item:FormItem} = Form

const PersonalDeatil =(props)=>{
  const { form:{getFieldDecorator}} = props
  return(
    <Card
      title="Your details"
    > 
      <Row type="flex">
        <Col className="pr-2">
          <FormItem>
            <span>Last Name:</span>
          </FormItem>
          <FormItem>
            <span>First Name:</span>
          </FormItem>
          <FormItem>
            <span>E-mail:</span>
          </FormItem>
          <FormItem>
            <span>Street:</span>
          </FormItem>
          <FormItem>
            <span>City:</span>
          </FormItem>
          <FormItem>
            <span>Phone:</span>
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
              getFieldDecorator('lname')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('fname')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('email')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('address.street')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('address.city')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('phone')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('phone2')(
                <Input />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('fax')(
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