import React ,{useState, PureComponent}from 'react'
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import FileUpload from '../form/filesUpload/Upload'
const { Item:FormItem } = Form

class InsertImage extends PureComponent{
  constructor(props){
    super(props)
    const { block:{key, src=null}={} } = this.props
    this.state={
      tabKey:'online',
      url:src
    }
  }

  tabList = [{
    key:'online',
    tab:'Online Source'
  },{
  key:'medialib',
  tab:'Media Library'
}]

onTabChange = (tabKey)=>{
  this.setState({
    tabKey
  })
}

saveUrl=()=>{
  const { form:{getFieldValue}} = this.props
  console.log(getFieldValue('url'),'getFiledValue')
  this.setState({
    url:getFieldValue('url')
  })
}

handleOk = ()=>{
  const { onOk=()=>{},modify=()=>{},block={},isNew=true} = this.props
  const { url } = this.state
  const { key, src=null } = block
  if(isNew){
    onOk({url})
  }else{
    if(url!==src){
      modify(key,{url,type:'img'})
    }
  }
}

onUploadSuccess=({url})=>{
  const { onOk=()=>{},modify=()=>{},block={}} = this.props
  const { key, src=null } = block
  if(url!==src){
    modify(key,{url,type:'img'})
  }
  onOk({url})
}

  render(){
  const { form:{getFieldDecorator, getFiledValue},block={}} = this.props
  const {tabKey,url } = this.state
  return(
    <Card
      title='Add Image'
      tabList={this.tabList}
      defaultActiveTabKey="online"
      onTabChange= {(key)=>this.onTabChange(key)}
      extra={<FileUpload onSuccess={this.onUploadSuccess}/>}
    >
      {
        tabKey==='medialib'&&
        <div>
          <div></div>
        </div>
      }
      {
        tabKey==='online'&&
        <div>
          <Form>
            <FormItem
             label="Image url"
            >
              {
                getFieldDecorator('url',{
                  initialValue:url
                })(
                  <Input onBlur={this.saveUrl}/>
                )
              }
            </FormItem>
          </Form>
        </div>
      }
      <div className="flex justify-between">
        <div></div>
        <Button type="primary" onClick={this.handleOk}>Ok</Button>
      </div>
    </Card>
  )
  }
}

export default Form.create({})(InsertImage)