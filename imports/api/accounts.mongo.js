import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

if(Meteor.isServer){

  Meteor.publish('clients',function(){
    return Meteor.users.find({'profile.type':'client'},{fields:{
      'profile.type':0
    }})
  })

  Meteor.publish('client',function(clientId){
    return Meteor.users.find({_id:clientId},{fields:{
      'profile.type':0
    }})
  })

  async function addUser(userData){
    const { email,username,password,...profile } = userData
    if(email||username){
      const options={}
      if(email){
        options.email=email
      }
      if(username){
        options.username=username
      }
      if(password){
        options.password=password
      }
      profile.email=email
      options.profile=profile
      const userId=await Accounts.createUser(options)
      return {
        status:true,
        userId
      }
    }
  }

  async function updateProfile(_id,profile){
    console.log(profile,'profile')
    const set = {}
    Object.keys(profile).forEach((key)=>{
      set[`profile.${key}`]=profile[key]
    })
    Meteor.users.update({_id},{
      $set:{...set}
    })
  }

  async function getUserIdByEmail(email,{upsert,userData}){
    if(!email){
      return null
    }
    const {_id} = Accounts.findUserByEmail(email)||{}
    console.log(_id,'_id')
    if(_id){
      return _id
    }else if(upsert){
      const {userId,status} = await addUser({email,...userData})||{}
      if(status&&userId){
        return userId
      }else{
        return null
      }
    }
  }

  Meteor.methods({
    'addUser':addUser,
    'getUserIdByEmail':getUserIdByEmail,
    'updateProfile':updateProfile
  })
}