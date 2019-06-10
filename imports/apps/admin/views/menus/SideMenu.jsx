import React, { PureComponent} from 'react';
import { Link,withRouter } from 'react-router-dom'
import Menu from 'antd/lib/menu';
import styled from 'styled-components';
import {matchRoutes} from '../../../../lib/router'
const {Item:MenuItem,ItemGroup:MenuGroup,SubMenu} = Menu
// const css = getAntCsses(['menu'])
const menus = [
  {
    title:"Blog",
    path:'/admin/blog',
    subMenu:[
      {
        title:"Blogs",
        path:'/admin/blog',
      }
    ]
  },
]
const SideMenu = (props)=>{
  const { className,routes=[],location } = props
  
  const selectedKeys = matchRoutes(routes,location.pathname).map((route)=>{
    return route.match.path
  })
  console.log(selectedKeys,'admin side Menu 111111111111111')
  return(
    <div className={`${className}`}>
      <Menu 
        mode="inline"
        defaultOpenKeys={selectedKeys}
        defaultSelectedKeys={selectedKeys}
      >
        {
          routes.filter((menu)=>(menu.show!==false)).map((menu)=>{
            const { title,path,routes:subRoutes=[] } = menu
            
            if(subRoutes&&Array.isArray(subRoutes)){
              
              return(
                <SubMenu
                  key={path}
                  title={<span>{title}</span>}
                >
                  {
                    subRoutes.filter((item)=>(item.show!==false)).map((item)=>{
                      const { path,title } =item
                      console.log(path,title,'item')
                      return(
                        <MenuItem key={path}>
                          <Link to={path} >
                            {title}
                          </Link>
                        </MenuItem>  
                      )
                    })
                  }
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
`