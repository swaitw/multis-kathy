import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
export const Categories = new Mongo.Collection('categories');

if(Meteor.isServer){

  Meteor.publish('categories',function(type){
    return Categories.find({type})
  })

  async function addCategory(categortyData){
    const categoryId = await Categories.insert({
      createAt:new Date(),
      ...categortyData
    })
    return categoryId
  }

  async function updateCategory(categoryId,categortyData){
    Categories.update({_id:categoryId},{
      $set:{
        ...categortyData
      }
    })
  }

  Meteor.methods({
    'addCategory':addCategory,
    'updateCategory':updateCategory
  })
}