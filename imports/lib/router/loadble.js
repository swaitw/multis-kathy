import Loadable from 'react-loadable'
import React from 'react'
const loadComp = ({component,initData,test=""})=>{
  const Loading=()=>{
    return(<p>Loading{test}</p>)
  }
  if(Meteor.isClient){
    return Loadable({
      loader:component,
      loading:Loading,
    })
  }
  return Loadable.Map({
    loader:{
      Comp:component,
      initData,
    },
    loading:Loading,
    render(loaded,props){
      let Comp = loaded.Comp.default
      let initData = loaded.initData
      return <Comp {...props} {...initData} />
    }
  })
}

export {
  loadComp
}