import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Links = new Mongo.Collection('links');
if(Meteor.isServer){
  Meteor.publish('testlinks',function(){
    return Links.find({})
  })
}

Meteor.methods({
  'getLinks':()=>{
    return Links.find({}).fetch()
  },
  'test':()=>{
  },
  'fortest':()=>{
    return 'fortest'
  }
})