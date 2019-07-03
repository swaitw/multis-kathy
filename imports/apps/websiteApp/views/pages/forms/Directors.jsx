import React, { PureComponent, Fragment } from 'react'
import {
  Form, 
  Input,
  Card,
  Row,
  Col,
  Checkbox,
  Button
} from 'antd'
const { Item:FormItem} = Form

const Directors =(props)=>{
  const { form:{getFieldDecorator,getFieldsValue,getFieldValue, setFieldsValue,resetFields},directors=[],isMultiStep=true,title="Directors of the proposed company"} = props
  console.log(props,'Directors')
  if(directors.length===0){
    directors.push({})
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
  const toggleDirectorAsShareholder =(i)=>(e)=>{
    const { toggleDirectorAsShareholder=()=>{},showConfirm=()=>{} } = props
    const {directors} = getFieldsValue()
    const directorData = directors[i]
    const status=toggleDirectorAsShareholder(directorData,e.target.checked)
    console.log(status,'status')
    if(typeof status ==='number'){
      showConfirm('addShareholder',{
        total:status,
        callback:(ok)=>{
          console.log(ok,'ok')
          if(ok){
            toggleDirectorAsShareholder(directorData,e.target.checked,true)
          }else{
            setFieldsValue({[`directors[${i}].isShareholder`]:false})
          }
        }
      })
    }
  }

  const updateDirectorsNumber=()=>{
    const { updateNumber=()=>{},showConfirm=()=>{} } = props
    const currentNumber = parseInt(getFieldValue('numberofdirectors')||0)
    if(currentNumber!==directors.length){
      const status = updateNumber(currentNumber,'directors')
      if(!status){
        showConfirm('updateDirectorsNumber')
      }
    }
  }

  const clearData=(i,isDelete)=>()=>{
    const { clearData=()=>{} } = props
    if(!isDelete&&Object.keys(directors[i]).length===0){
      resetFields([
        `directors[${i}].lname`,
        `directors[${i}].fname`,
        `directors[${i}].address.street`,
        `directors[${i}].address.area`,
        `directors[${i}].address.city`,
        `directors[${i}].address.country`,
        `directors[${i}].email`,
        `directors[${i}].isShareholder`,
      ])
    }
    clearData('directors',i,isDelete)
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
      <FormItem
        label='Number of directors'
      >
        <div className="flex">
          {
            getFieldDecorator('numberofdirectors',{
              initialValue:directors.length
            })(
              <Input type="number" style={{width:'6rem'}}/>
            ) 
          }
          <Button onClick={updateDirectorsNumber}>Update</Button>
        </div>
      </FormItem>
      {
        directors.map((director,i)=>{
          const { address={},email,fname,isShareholder,lname} = director
          return(
            <Row key={`directors-${i+1}`}>
              <div className='flex justify-between'>
                <h4>{`Director ${i+1}`}</h4>
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
                      getFieldDecorator(`directors[${i}].lname`,{
                        initialValue:lname||''
                      })(
                        <Input />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`directors[${i}].fname`,{
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
                      getFieldDecorator(`directors[${i}].address.street`,{
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
                      getFieldDecorator(`directors[${i}].address.city`,{
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
                      getFieldDecorator(`directors[${i}].address.area`,{
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
                      getFieldDecorator(`directors[${i}].address.country`,{
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
                    <span>E-mail:</span>
                  </FormItem>
                  <FormItem>
                    <span>Is shareholder:</span>
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem>
                    {
                      getFieldDecorator(`directors[${i}].email`,{
                        initialValue:email||''
                      })(
                        <Input />
                      )
                    }
                  </FormItem>
                  <FormItem>
                    {
                      getFieldDecorator(`directors[${i}].isShareholder`,{
                        initialValue:isShareholder||false,
                        valuePropName:'checked'
                      })(
                        <Checkbox
                          onChange={toggleDirectorAsShareholder(i)}
                        >
                          Check if this directors is also a shareholder
                        </Checkbox>
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