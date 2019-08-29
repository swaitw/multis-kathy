import Loadable from 'react-loadable'
import React,{Fragment} from 'react'
import Spin from 'antd/lib/spin';
const loadComp = ({component,initData})=>{
  const Loading=()=>{
    return(<Spin style={{position:"absolute",bottom:'50%',left:'50%',transform: 'translateX(-50%)'}}/>)
  }
  if(Meteor.isClient){
    return Loadable({
      loader:component,
      loading:Loading,
    })
  }
  const loader={
    Comp:component
  }
  if(initData){
    loader.initData=initData
  }
  return Loadable.Map({
    loader,
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