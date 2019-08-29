import React, { PureComponent} from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'

import PrimaryMenu from '../menus/PrimaryMenu'
import Logo from './Logo'
import { Meteor } from 'meteor/meteor';
// if(Meteor.isClient){
//   import 'antd/lib/row/style/index'
//   import 'antd/lib/col/style/index'
// }

// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['row','col'])

class Header extends PureComponent {

  render(){

    return(
      <Row type="flex" justify="space-between" align="middle" style={{flexWrap:'nowrap'}} className="px-15">
        <Col style={{flex:'0 0 auto'}}>
          <Logo 
            src="http://bizoffice.co.nz/wp-content/uploads/2018/11/logo-bizoffice-new.png"
            link="/"
            size={{width:'200px'}}
          />
        </Col>
        <Col style={{flex:'1 1 100%'}}><PrimaryMenu/></Col>
      </Row>
    )
  }
}
export default Header