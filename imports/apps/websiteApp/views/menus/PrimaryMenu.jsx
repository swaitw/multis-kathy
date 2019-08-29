import React, { PureComponent} from 'react';
import { Link } from 'react-router-dom'
import Menu from 'antd/lib/menu';

import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
const {Item:MenuItem} = Menu
// const css = getAntCsses(['menu'])
// if(Meteor.isClient){
//   import 'antd/lib/menu/style/index'
// }
const menus = [
  {
    title:"Register a companyonline",
    path:'/register-a-company-online'
  },
  {
    title:"Company Folder",
    path:'/company-folder'
  },
  {
    title:"Products & Services",
    path:'/products'
  },
  {
    title:"Contact Us",
    path:'/contact-us'
  }
]
const PrimayMenu = (props)=>{
  const { className } = props
  return(
    <div className={`${className}`}>
      <Menu mode="horizontal" theme="dark">
        {
          menus.map((menu)=>{
            const { title,path } = menu
            return(
              
                <MenuItem key={path}>
                <Link to={path} >
                  {title}
                  </Link>
                </MenuItem>
             
            )
          })
        }
      </Menu>
    </div>
    
  )
}

export default styled(PrimayMenu)`
.ant-menu-dark{
  background:var(--black);
  color:var(--white);
}

`