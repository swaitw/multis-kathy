import React,{PureComponent} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import routerConfig from '../config/router.config';
import { convertRoutes } from '../lib/router/index'
import Loadable from 'react-loadable'
// console.log('223423424')
// const Loading=()=>{
//   return(<p>Loading</p>)
// }
// const PageTwo = Loadable({
//   loader:()=>import('../ui/PageTwo'),
//   loading:Loading
// });
// const PageOne = Loadable({
//   loader:()=>import('../ui/PageOne'),
//   loading:Loading
// });
class App extends PureComponent{

  state={
    text:1
  }

  onclick=()=>{
    const {text } = this.state
    this.setState({
      text:text+1
    })
  }

  render(){
    const { routers=[] } = this.props
    console.log(routers,'routers App')
    return convertRoutes(routers,{app:{},role:""})
  }
}

export default App;
