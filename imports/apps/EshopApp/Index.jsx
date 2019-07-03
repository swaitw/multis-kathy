import React, { PureComponent} from 'react'
import Layout from './views/common/Layout'
import { renderRoutes} from '../../lib/router'

class Index extends PureComponent{

  render(){
    const { route:{routes=[]}={} } = this.props
    console.log(this.props,'index')
    return(
      <Layout>
        {renderRoutes(routes)}
      </Layout>
    )
  }
}

export default Index