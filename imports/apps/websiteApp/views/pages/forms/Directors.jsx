import React, { PureComponent, Fragment } from 'react'
import {
  Form, 
  Input,
  Card,
  Row,
  Col,
  Checkbox
} from 'antd'
const { Item:FormItem} = Form

const Directors =(props)=>{
  const { form:{getFieldDecorator},directors=[]} = props
  if(directors.length===0){
    directors.push({})
  }
  return(
    <Card
      title="Directors of the proposed company"
    > 
      {
        directors.map((director,i)=>{
          return(
            <Row key={`director-${i+1}`}>
              <h4>{`Director ${i+1}`}</h4>
              <Row type="flex">
                <Col className="pr-2" span={6}>
                  <FormItem>
                    <span>Last Name:</span>
                  </FormItem>
                  <FormItem>
                    <span>First Name:</span>
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem>
                    {
                      getFieldDecorator(`director[${i}].lname`)(
                        <Input />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`director[${i}].fname`)(
                        <Input />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" className="flex-nowrap">
                <Col className="pr-2" span={6}>
                  <FormItem>
                    <span>Residential Address:</span>
                    <p style={{fontSize:9}}>must be physical street address and not a postal centre or document exchange</p>
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem>
                    {
                      getFieldDecorator(`director[${i}].address.street`)(
                        <Input 
                          placeholder="Street"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`director[${i}].address.city`)(
                        <Input 
                          placeholder="City"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`director[${i}].address.area`)(
                        <Input 
                          placeholder="Area"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`director[${i}].address.country`)(
                        <Input 
                          placeholder="Country"
                        />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex">
                <Col className="pr-2" span={6}>
                  <FormItem>
                    <span>E-mail:</span>
                  </FormItem>
                  <FormItem>
                    <span>Is shareholder:</span>
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem>
                    {
                      getFieldDecorator(`director[${i}].email`)(
                        <Input />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`director[${i}].isShareholder`)(
                        <Checkbox>Check if this director is also a shareholder</Checkbox>
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
            </Row>
          )
        })
      }
      
    </Card>
  )
}
export default Directors