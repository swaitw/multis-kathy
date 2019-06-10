import React,{PureComponent} from 'react';
import Loadable from 'react-loadable'
import { renderRoutes } from '../lib/router/index'
const PageTwo=(props)=>{
  const { route:{routes=[]}={} } = props
  // console.log(routes,'routes')
  return(
    <div>
      <h1>PageTwo</h1>
      {
        renderRoutes(routes)
      }
    </div>

  )
}
export default PageTwo