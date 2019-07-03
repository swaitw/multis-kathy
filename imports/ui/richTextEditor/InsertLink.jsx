import React, { PureComponent } from 'react';
import {
  Card,
  Form, Input, Select,Button
} from 'antd'

const { Item:FormItem } = Form
const { Option } =  Select

@Form.create()
class InsertLink extends PureComponent{
  constructor(props){
    super(props)
    const {block:{href,target}={}} = this.props
    this.state={
      url:href,
      target:target||'_self'
    }
  }

  targets = [
    {
      value:'_blank',
      label:'blank'
    },
    {
      value:'_self',
      label:'self'
    },
    {
      value:'_parent',
      label:'parent'
    },
    {
      value:'_top',
      label:'top'
    },
  ]

  handleOk = ()=>{
    const {  form:{getFieldsValue},onOk=()=>{},modify=()=>{},block={},isNew=true,} = this.props
    const { url,target } = getFieldsValue()
    if(isNew){
      onOk({url,target})
    }else{
      if(url!==block.href||target!==block.target){
        modify(block.key,{url,type:'link',target})
      }
    }
  }

  render(){
    const { form:{getFieldDecorator},block:{href, target}={}} =this.props
    console.log(this.props,'InsertLink')
    return(
      <Card>
        <Form>
          <FormItem
            label="Link:"
          >
            {
              getFieldDecorator('url',{
                initialValue:href||''
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem
            label="target:"
          >
            {
              getFieldDecorator('target',{
                initialValue:target||'_self'
              })(
                <Select>
                  {
                    this.targets.map((target)=>{
                      const { value,label} = target
                      return(
                        <Option value={value} key={value}>{label}</Option>
                      )
                    })
                  }
                </Select>
              )
            }
          </FormItem>
        </Form>
        <div className="flex justify-between">
          <div></div>
          <Button type="primary" onClick={this.handleOk}>Ok</Button>
        </div>
      </Card>
    )
  }
}

export default InsertLink