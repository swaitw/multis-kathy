import React,{PureComponent} from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Links } from '../api/links'
const PageOne=(props)=>{
  console.log(props,'props.............')
  const {links=[]} = props
  return(
    <div>
      <h1>page One</h1>
      {
        links.map((link)=>{
          return(
            <div>
              <h1>{`title:${link.title}`}</h1>
            </div>
          )
        })
      }
    </div>

  )
}
const helper = ({links:initlinks=[]})=>{
  if(Meteor.isClient){
    const linksHandle = Meteor.subscribe('testlinks');
    const loading = !linksHandle.ready();   
    const links=Links.find({}).fetch()
    return{
      loading,
      links,
    }
  }
  return{}
}

export default withTracker(helper)(PageOne)