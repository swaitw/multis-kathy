import React,{PureComponent} from 'react';
import { convertRoutes } from '../lib/router/index'
import { Meteor } from 'meteor/meteor';
// import './theme.import.less'
class App extends PureComponent{

  render(){
    const { routers=[] } = this.props
    return convertRoutes(routers,{app:{},role:""})
  }
}

export default App;
