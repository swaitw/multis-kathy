import React, {PureComponent} from 'react'
import {
  Form, 
  Input,
  Card
} from 'antd'

const { Item:FormItem } = Form
const { TextArea} = Input

@Form.create()
class ContactUsForm extends PureComponent{

  render(){
    const {form:{getFieldDecorator}} = this.props
    return(
      <Card
        title="leave us a message"
      >
        <Form>
          <FormItem
            label="Name"
          >
            {
              getFieldDecorator('name')(
                <Input />
              )
            }
          </FormItem>
          <FormItem
            label="Email"
          >
            {
              getFieldDecorator('email')(
                <Input />
              )
            }
          </FormItem>
          <FormItem
            label="Comment"
          >
            {
              getFieldDecorator('comment')(
                <TextArea row={10}/>
              )
            }
          </FormItem>
        </Form>
        
      </Card>
    )
  }
}

export default ContactUsForm