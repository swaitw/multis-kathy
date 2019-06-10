import React, { PureComponent} from 'react'
import BlogLayout from './views/common/Layout'
import { renderRoutes} from '../../lib/router'

class Index extends PureComponent{

  render(){
    const { route:{routes=[]}={} } = this.props
    console.log(this.props,'index')
    return(
      <BlogLayout>
        {renderRoutes(routes)}
      </BlogLayout>
    )
  }
}

export default Index