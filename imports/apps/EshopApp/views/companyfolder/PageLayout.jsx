import React from 'react'

const Layout = (props)=>{
  const {children,name='your company name',companyNumber='0000000'} = props
  return(
    <div>
      <div style={{textAlign:'center',color:'gray'}}>
        <h5 style={{color:'gray'}}>
          Company Folder
        </h5>
        <h5 style={{color:'gray'}}>
          {name.toUpperCase()}({companyNumber})
        </h5>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Layout