import React, {PureComponent} from 'react'
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';

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
        <Row type='flex' justify="end">
          <Button type='primary' onClick={()=>{
            message.config({
              top:'40%'
            })
            message.loading('Sending...').then(()=>{
              message.success('Success')
            })
          }}>Submit</Button>
        </Row>
      </Card>
    )
  }
}

export default ContactUsForm