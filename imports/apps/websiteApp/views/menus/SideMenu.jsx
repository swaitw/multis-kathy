import React, { PureComponent} from 'react';
import { Link,withRouter } from 'react-router-dom'
import Menu from 'antd/lib/menu';

import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
// if(Meteor.isClient){
//   import 'antd/lib/menu/style/index'
// }
const {Item:MenuItem,ItemGroup:MenuGroup,SubMenu} = Menu
// const css = getAntCsses(['menu'])
const menus = [
  {
    title:"About",
    path:'/about'
  },
  {
    title:"Information",
    path:'/information',
    subMenu:[
      {
        title:"Offline Company Formation",
        path:'/information/offline-company-formation'
      },
      {
        title:"7 reasons to choose company structure for your business",
        path:'/information/7-reasons-to-choose-company-structure-for-your-business'
      },
      {
        title:"Overseas Consent and Identity Verification",
        path:'/information/overseas-consent-and-identity-verification'
      },
      {
        title:"Company Folder",
        path:'/information/company-folder'
      },
      {
        title:"Companies Guide",
        path:'/information/company-guide'
      },  
      {
        title:"Company Names",
        path:'/information/company-names'
      },
      {
        title:"Partnership Business Structure",
        path:'/information/partnership-business-structure'
      },
      {
        title:"Company Business Structure",
        path:'/information/company-business-structure'
      },
      {
        title:"Statutory Obligations of Companies and their Directors",
        path:'/information/statutory-obligations-of-companies-and-their-directors'
      },
    ]
  },
  {
    path:'disclaimer',
    title:'Disclaimer',
  },
  {
    path:'privacy',
    title:'Privacy',
  },
  {
    path:'refund-policy',
    title:'Refund Policy',
  },
  {
    title:"ContactUs",
    path:'/contact-us'
  },
]
const SideMenu = (props)=>{
  const { className } = props
  const onTitleClick = (path)=>()=>{
    const { history } =  props
    history.push(path)
  }
  console.log(props,'SideMenu')
  return(
    <div className={`${className}`}>
      <Menu mode="inline">
        {
          menus.map((menu)=>{
            const { title,path,subMenu } = menu
            if(subMenu&&Array.isArray(subMenu)){
              return(
                <SubMenu
                  key={title}
                  title={<span>{title}</span>}
                  onTitleClick={onTitleClick(path)}
                >
                  <MenuGroup className="submenu">
                  {
                    subMenu.map((item)=>{
                      const { path,title } =item
                      return(
                        <MenuItem key={path}>
                          <Link to={path} >
                          {title}
                          </Link>
                        </MenuItem>  
                      )
                    })
                  }
                  </MenuGroup>
                </SubMenu>
              )
            }

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

export default styled(withRouter(SideMenu))`
.ant-menu-item{
  height:auto;
}
.ant-menu-item>a{
  white-space: normal;
  line-height: 2rem;
}
.submenu .ant-menu-item>a{
  border-bottom:1px solid;
}
`