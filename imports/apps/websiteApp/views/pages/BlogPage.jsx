import React from 'react';
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor';
import { Blogs } from '../../../../api/blog.mongo';

const BlogPage =(props)=>{
  const { blog={} } = props
  return(
    <div>
      {
        blog.title&&<h4>{blog.title}</h4>
      }
      {
        blog.content&&blog.content.html&&<div dangerouslySetInnerHTML={{__html:blog.content.html}}></div>
      }
    </div>
  )
}

const BlogPageContainer = withTracker(({match:{params:{slug='information'}}})=>{
  if(Meteor.isClient){
    const blogsHandle = Meteor.subscribe('blogs')
    const loading = !blogsHandle.ready()
    const blog = Blogs.findOne({slug})
    return {
      blog
    }
  }
  return{

  }
})(BlogPage)

export default BlogPageContainer