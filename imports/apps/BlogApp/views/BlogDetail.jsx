import React, { PureComponent } from 'react';
import { withTracker } from 'meteor/react-meteor-data'
import {
  Card,
  Row,
  Col,
  Input,
  Form,
  Button
} from 'antd'
import { Meteor } from 'meteor/meteor';
let Editor={}
if(Meteor.isClient){
  // import TinyEditor from '../../../ui/tinyEditor/TinyEditor'
  // import CKEditor from '../../../ui/CKEditor/CKeditor'
  import SlateEditor from '../../../ui/richTextEditor/Editor'
  Editor=SlateEditor
}
import { Blogs } from '../../../api/blog.mongo';
import CategoriesCard from '../../../ui/addons/CategoriesCard'
import { Categories } from '../../../api/categories.mongo';
@withTracker(({match:{params:{blogId}}})=>{
  
  if(Meteor.isClient){
    const blogsHandle = Meteor.subscribe('blogs')
    const categoriesHandle = Meteor.subscribe('categories','blog')
    const loading = !blogsHandle.ready()&&!categoriesHandle.ready()
    const blog = Blogs.findOne({_id:blogId})||{}
    const categories = Categories.find({}).fetch()
    return{
      blog,
      categories,
      blogId
    }
  }
  return{
    blogId
  }
})
@Form.create()
class BlogDetail extends PureComponent{
  state={
    title:null
  }
  content = null
  blogCategories=null
  handleSave = ()=>{
    const { form:{getFieldValue},blogId,blog:{content,categories:blogCategories}={} } = this.props
    const newContent = this.content||content
    const categories = this.blogCategories ||blogCategories||[]
    const title = getFieldValue('title')
    console.log(blogId,'handleSave')
    if(blogId){
      Meteor.call('updateBlog',blogId,{title,content:newContent,categories})
    }else{
      Meteor.call('addNewBlog',{title,content:this.content,categories:this.blogCategories||[]})
    }
    
  }

  render(){
    const {form:{getFieldDecorator,getFieldValue}, blog:{content,title='',categories:blogCategories=[]}={},loading,blogId,categories } = this.props
    const { title:currentTitle} = this.state
    return(
      <Card
        bordered={false}
        className="ant-card-flex-full "
        bodyStyle={{overflow:'hidden'}}
        title={blogId?getFieldValue('title')||title:'New Blog'}
      >
        <Row className="mh-100 overflow-hidden" style={{display:'flex'}}>
          <Col span={18} className="mh-100 overflow-auto">
            <Card
              bordered={false}
              bodyStyle={{paddingTop:'5px',paddingBottom:'5px'}}
            >
              {
                getFieldDecorator('title',
                  {
                    initialValue:title||''
                  }
                )(
                  <Input
                    placeholder="Enter tiltle here"
                  />
                )
              }
              {
                Meteor.isClient&&!loading&&
                <div style={{paddingTop:'1rem'}}>
                  <Editor
                    title={<h5 style={{padding:0,margin:0}}>Content</h5>}
                    onChange={(content)=>this.content=content} 
                    content={content}
                  />
                </div>
              }
            </Card>
          </Col>
          <Col span={6} className="mh-100 overflow-auto">
            <Card>
              <Button onClick={this.handleSave} type='priamry'>{blogId?'Update':'Publish'}</Button>
            </Card>
            <div>
              <CategoriesCard 
                categories={categories}
                onChange={(blogCategories)=>{
                  this.blogCategories=blogCategories
                }}
                blogCategories={blogCategories}
              />
            </div>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default BlogDetail