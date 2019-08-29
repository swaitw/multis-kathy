import React, { PureComponent, Fragment } from 'react'
import InputNumber from 'antd/lib/input-number';
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
const { Item:FormItem} = Form

const Shareholders =(props)=>{
  const { form:{getFieldDecorator,getFieldValue,resetFields},shareholders=[],issueSharePrice,title="Shareholders of the proposed company",isMultiStep=true} = props
  if(shareholders.length===0){
    shareholders.push({})
  }
  const updateShareholdersNumber=()=>{
    const { updateNumber=()=>{},showConfirm=()=>{} } = props
    const currentNumber = parseInt(getFieldValue('numberOfShareholders')||0)
    if(currentNumber!==shareholders.length){
      const status = updateNumber(currentNumber,'shareholders')
      if(!status){
        showConfirm('updateShareholdersNumber')
      }
    }
  }

  const clearData=(i,isDelete)=>()=>{
    const { clearData=()=>{} } = props
    if(!isDelete&&Object.keys(shareholders[i]).length===0){
      resetFields([
        `shareholders[${i}].lname`,
        `shareholders[${i}].fname`,
        `shareholders[${i}].address.street`,
        `shareholders[${i}].address.area`,
        `shareholders[${i}].address.city`,
        `shareholders[${i}].address.country`,
        `shareholders[${i}].email`,
        `shareholders[${i}].isShareholder`,
        `shareholders[${i}].ird`,
        `shareholders[${i}].numberOfShares`,
        `shareholders[${i}].classOfShares`,
      ])
    }
    clearData('shareholders',i,isDelete)
  }
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
      title={title}
      {...extraProps}
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
              getFieldDecorator('issueSharePrice',{
                initialValue:issueSharePrice||''
              })(
                <InputNumber
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              )
            }
          </FormItem>
          <FormItem>
            <div>
              {
                getFieldDecorator('numberOfShareholders',{
                  initialValue:shareholders.length
                })(
                  <InputNumber />
                )
              }
              <Button onClick={updateShareholdersNumber}>Update</Button>
            </div>
          </FormItem>
        </Col>
      </Row>
      {
        shareholders.map((director,i)=>{
          const { address={},fname,lname,ird,numberOfShares,classOfShares,isOverseas} = director
          return(
            <Row key={`shareholders-${i+1}`}>
              <div className='flex justify-between'>
                <h4>{`Shareholder ${i+1}`}</h4>
                <div>
                  <Button size='small' type='danger' onClick={clearData(i)}>Clear Data</Button>
                  <Button size='small' type='danger' onClick={clearData(i,true)}>Delete</Button>
                </div>
              </div>
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
                      getFieldDecorator(`shareholders[${i}].lname`,{
                        initialValue:lname||''
                      })(
                        <Input />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].fname`,{
                        initialValue:fname||''
                      })(
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
                      getFieldDecorator(`shareholders[${i}].address.street`,{
                        initialValue:address.street||''
                      })(
                        <Input 
                          placeholder="Street"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].address.city`,{
                        initialValue:address.city||''
                      })(
                        <Input 
                          placeholder="City"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].address.area`,{
                        initialValue:address.area||''
                      })(
                        <Input 
                          placeholder="Area"
                        />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].address.country`,{
                        initialValue:address.country||''
                      })(
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
                      getFieldDecorator(`shareholders[${i}].ird`,{
                        initialValue:ird||''
                      })(
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
                      getFieldDecorator(`shareholders[${i}].numberOfShares`,{
                        initialValue:numberOfShares||''
                      })(
                        <InputNumber />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].classOfShares`,{
                        initialValue:classOfShares||''
                      })(
                        <Input />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`shareholders[${i}].isOverseas`,{
                        initialValue:isOverseas||''
                      })(
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