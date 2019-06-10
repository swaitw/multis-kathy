import React from 'react';
import { Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import {
  Table, Button
} from 'antd'
import { Meteor } from 'meteor/meteor';
import { Blogs } from '../../../api/blog.mongo';
import moment from 'moment';
import { Categories } from '../../../api/categories.mongo';

const BlogList  = (props) =>{
  const { blogs=[],blogCategories=[] } =  props
  const columns = [
    {
      title:'Title',
      key:'title',
      dataIndex:'title'
    },
    {
      title:'Author',
      key:'author',
      dataIndex:'author'
    },
    {
      title:'Categories',
      key:'categories',
      dataIndex:'categories'
    },
    {
      title:'Tags',
      key:'tags',
      dataIndex:'tags'
    },
    {
      title:'Date',
      key:'date',
      dataIndex:'date'
    },
    {
      title:'Actions',
      key:'action',
      render:(text,record)=>{
        console.log(record,'record')
        return(
          <div>
            <Link to={`/admin/blog/${record.id}`}><Button icon='edit' /></Link> 
            {
              !record.slug&&<Button onClick={deleteBlog(record.id)} icon='delete' type='danger' style={{marginLeft:'0.8rem'}}/>
            }
          </div>
        )
      }
    },
  ]
  const getBlogsData=()=>{
    return blogs.map((blog)=>{
      const { _id:id,title='',createAt,author='',categories=[],tags=[],slug} = blog
      const categoriesName = blogCategories.filter((category)=>(categories.indexOf(category._id)!==-1)).map((category)=>{
        return category.name
      })
      return{
        key:id,
        title,
        id,
        slug,
        date:moment(createAt).format('DD/MM/YYYY hh:mm:ss a'),
        author,
        categories:categoriesName?categoriesName.join(','):'',
        tags:tags?tags.join(','):''
      }
    })
  }

  const deleteBlog=(blogId)=>()=>{
    Meteor.call('deleteBlog',blogId)
  }
  return(
    <Table 
      columns={columns}
      dataSource={getBlogsData()}
    />
  )
}

const BlogListContainer = withTracker(({})=>{
  if(Meteor.isClient){
    const blogsHandle = Meteor.subscribe('blogs')
    const categoriesHandle = Meteor.subscribe('categories','blog')
    const loading = !blogsHandle.ready()&&!categoriesHandle.ready()
    const blogs = Blogs.find({}).fetch()
    const blogCategories = Categories.find({type:'blog'}).fetch()
    return{
      blogs,
      blogCategories
    }
  }
  return{}
})(BlogList)
export default BlogListContainer