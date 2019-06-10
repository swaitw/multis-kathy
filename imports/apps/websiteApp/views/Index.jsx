import React, { PureComponent} from 'react'
import WebsiteLayout from './common/Layout'
import { renderRoutes} from '../../../lib/router'

class Index extends PureComponent{

  render(){
    const { route:{routes=[]}={} } = this.props
    // console.log(this.props,'index')
    return(
      <WebsiteLayout>
        {renderRoutes(routes)}
      </WebsiteLayout>
    )
  }
}

export default Index