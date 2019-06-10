import React, { PureComponent, Fragment } from 'react'
import {
  Form, 
  Input,
  Card,
  Row,
  Col,
  Checkbox,
  InputNumber
} from 'antd'
const { Item:FormItem} = Form

const Shareholders =(props)=>{
  const { form:{getFieldDecorator},shareholders=[]} = props
  if(shareholders.length===0){
    shareholders.push({})
  }
  return(
    <Card
      title="Shareholders of the proposed company"
    > 
      <Row type="flex">
        <Col className="pr-2" span={6}>
          <FormItem>
            <span>Issue Share Price:</span>
          </FormItem>
          <FormItem>
            <span>Number of Shareholders:</span>
          </FormItem>
        </Col>
        <Col span={18}>
          <FormItem>
            {
              getFieldDecorator('issueSharePrice')(
                <InputNumber
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
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
        </Col>
      </Row>
      {
        shareholders.map((director,i)=>{
          return(
            <Row key={`shareholders-${i+1}`}>
              <h4>{`Shareholder ${i+1}`}</h4>
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
                      getFieldDecorator(`shareholders[${i}].lname`)(
                        <Input />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].fname`)(
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
                      getFieldDecorator(`shareholders[${i}].address.street`)(
                        <Input 
                          placeholder="Street"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].address.city`)(
                        <Input 
                          placeholder="City"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].address.area`)(
                        <Input 
                          placeholder="Area"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].address.country`)(
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
                    <span>IRD:</span>
                    <p>NZ resident individuals must provide IRD number</p>
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].ird`)(
                        <Input />
                      )
                    }
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex">
                <Col className="pr-2" span={6}>
                  <FormItem>
                    <span>Number of Shares:</span>
                  </FormItem>
                  <FormItem>
                    <span>Class of Shares:</span>
                  </FormItem>
                  <FormItem>
                    <span>Overseas Shareholder:</span>
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].numberOfShares`)(
                        <InputNumber />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].classOfShares`,{
                        initialValue:"Ordinary"
                      })(
                        <Input />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].isOverseas`)(
                        <Checkbox>Check if this shareholder is overseas</Checkbox>
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
export default Shareholders