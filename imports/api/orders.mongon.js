import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export const Orders = new Mongo.Collection('orders');

if(Meteor.isServer){

  Meteor.publish('orders',function(){
    return Orders.find({})
  })
  Meteor.publish('order',function(id){
    return Orders.find({_id:id})
  })

  async function addOrder(orderData){
    const orderId=await Orders.insert({
      createAt:new Date(),
      ...orderData
    })
    return orderId
  }

  async function updateOrder(_id,orderData){
    await Orders.update({_id},{
      $set:{
        ...orderData
      }
    })
  }

  async function createNewOrder(orderData){
    const { person,...companyData } = orderData
    const { email,...rest } =person
    rest.type='client'
    const options ={
      upsert:true,
      userData:rest
    }
    console.log(email,'email')
    const clientId =await Meteor.call('getUserIdByEmail',email,options)
    if(clientId){
  
      companyData.clientId=clientId
      const orderId=await addOrder(companyData)
      console.log(orderId,'orderId')
      return orderId
    }
    return null
  }

  Meteor.methods({
    'createNewOrder':createNewOrder,
    'addOrder':addOrder,
    'updateOrder':updateOrder
  })
}