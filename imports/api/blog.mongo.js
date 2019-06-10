import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Blogs = new Mongo.Collection('blogs');

// server only function
if(Meteor.isServer){

  // publish blog data
  Meteor.publish('blogs',function(){
    return Blogs.find({})
  })


  // add new blog
  // todo :
  //        add check authority
  async function addNewBlog(blogData){
    const blogId = await Blogs.insert({
      createAt:new Date(),
      ...blogData
    })
    return blogId
  }

  async function updateBlog(blogId,blogData){
    Blogs.update({_id:blogId},{
      $set:{
        ...blogData
      }
    })
  }

  async function deleteBlog(blogId){
    Blogs.remove({_id:blogId})
  }

  async function getBlog(selector={}){
    
    return Blogs.findOne(selector)
  }

  Meteor.methods({
    'addNewBlog':addNewBlog,
    'updateBlog':updateBlog,
    'deleteBlog':deleteBlog,
    'getBlog':getBlog
  })
}
