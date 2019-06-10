import React, { PureComponent} from 'react';
import { Link,withRouter } from 'react-router-dom'
import Menu from 'antd/lib/menu';
import styled from 'styled-components';
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
        path:'/products'
      },
      {
        title:"Company Folder",
        path:'/products'
      },
      {
        title:"Companies Guide",
        path:'/products'
      },  
      {
        title:"Company Names",
        path:'/products'
      },
      {
        title:"Partnership Business Structure",
        path:'/products'
      },
      {
        title:"Company Business Structure",
        path:'/products'
      },
      {
        title:"Statutory Obligations of Companies and their Directors",
        path:'/products'
      },
    ]
  },
  {
    title:"Disclaimer",
    path:'/products'
  },
  {
    title:"Privacy",
    path:'/contact-us'
  },
  {
    title:"Refund Policy",
    path:'/contact-us'
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