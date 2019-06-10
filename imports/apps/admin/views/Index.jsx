import React, { PureComponent} from 'react'
import AdminLayout from './common/Layout'
import { renderRoutes} from '../../../lib/router'

class Index extends PureComponent{

  render(){
    const { route:{routes=[]}={} } = this.props
    return(
      <AdminLayout routes={routes}>
        {renderRoutes(routes)}
      </AdminLayout>
    )
  }
}

export default Index