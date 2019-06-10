import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
const Logo =(props)=>{
  const {src,size,link,alt="Home Page"}= props
  const style={
    width:size.width||"100%",
    maxWidth:"100%",
    height:size.height||"auto"
  }

  return(
    <div>
      <Link to={link}>
        <img src={src} style={style} alt={alt}/>
      </Link>
    </div>
  )
}
export default Logo