import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {companyInfokeyToLabel} from './keyToLable'
const styles = StyleSheet.create({
  section: {
    flexDirection:'column',
    fontSize:12,
    lineHeight:1.5
  },
  pageTitle:{
    textAlign:'center',
    fontSize:20,
    padding:'20px 0px'
  },
  title:{
    fontSize:18,
    paddingTop:25,
    paddingBottom:10
  },
  subTitle:{
    fontSize:16,
    paddingTop:10,
    paddingBottom:5,
    fontWeight:700
  },
  row:{
    paddingBottom:5
  },
  p:{
    fontSize:10,
    paddingBottom:5
  },
  input:{
    width:200,
    height:14,
    borderBottom:'1 solid gray'
  }
});


const renderText=(content)=>{
  return content.map((item,i)=>{
    const { type,style={},text } = item
    let renderStyle = {}
    if(type==='view'){
      const { children=[],wrap=true} = item
      return (
        <View style={style} wrap={wrap}>
          {
            renderText(children)
          }
        </View>
      )
    }
    if(type==='row'){
      const { children=[]} = item
      return (
        <Text style={{...styles.row,...style}}>
          {
            renderText(children)
          }
        </Text>
      )
    }
    if(type==='input'){
      return(
        <Text style={{...styles.input,...style}} />
      )
    }
    switch(type){
      case 'pageTitle':
        renderStyle=styles.pageTitle
        break;
      case 'title':
        renderStyle=styles.title
        break;
      case 'subTitle':
          renderStyle=styles.subTitle
          break;
      case 'point':
        const { depth=1 } = item
        renderStyle={
          paddingLeft:20*depth
        }
        break;
      case 'p':
        renderStyle=styles.p
        break
      default:
        break
    }
    return <Text key={i} style={{...renderStyle,...style}}>{text}</Text>
  })
}
const FirstMinutes = (props) => {
  const { 
    registeredAddress='registeredAddress',
    serviceAddress='serviceAddress',
    postAddress='postAddress',
    companyName='MULTISUPPORT LIMITED',
    directorName='SUN, Zhaorong',
  } = props
  const content =[
    {
      type:'pageTitle',
      text:'MINUTES',
    },
    {
      type:'view',
      style:{
        borderTop:'1 solid gray',
        borderBottom:'1 solid gray',
        padding:'10px 0px',
        textAlign:'center'
      },
      children:[
        {
          type:'p',
          text:'Resolutions of the sole director of',
          style:{
            fontSize:'14'
          }
        },
        {
          type:'p',
          text:`${companyName.toUpperCase()}`,
          style:{
            fontSize:'14',
            fontStyle:'italic'
          }
        },
        {
          type:'row',
          children:[
            {
              type:'text',
              text:'dated ',
            },
            {
              type:'text',
              text:'08-Jun-2016',
              style:{
                fontStyle:'italic'
              }
            },
          ]
        },
      ]
    },
    {
      type:'subTitle',
      text:'Registered Office',
    },
    {
      type:'p',
      text:`The registrar of companies had been notified that the registered office of the company is situated at ${registeredAddress}.`,
    },
    {
      type:'subTitle',
      text:'Address For Service',
    },
    {
      type:'p',
      text:`The registrar of companies had been notified that the address for service of the company is situated at ${serviceAddress}.`,
    },
    {
      type:'subTitle',
      text:'Address For Communication',
    },
    {
      type:'p',
      text:`The registrar of companies had been notified that the address for communication of the company is ${postAddress}.`,
    },
    {
      type:'subTitle',
      text:'Bankers',
    },
    {
      type:'p',
      text:`It was resolved that a banking account be opened with ......................................................................... at its ............................................................ branch and operated upon in accordance with the bank authority now produced to and approved by the directors (copy attached).`,
    },
    {
      type:'subTitle',
      text:'Statutory Books Etc',
    },
    {
      type:'p',
      text:`It was resolved that the director be authorised to acquire and establish all necessary books, registers, records and other documentation required by statute to be kept including such books of account as are necessary to record the financial transactions of the company.`,
    },
    {
      type:'view',
      wrap:false,
      children:[
        {
          type:'subTitle',
          text:'Auditor',
        },
        {
          type:'p',
          text:`It was resolved to recommend to shareholders that no auditor be appointed and that they accordingly pass a unanimous resolution as follows:`,
        },
        {
          type:'p',
          text:`Pursuant to section 196 of the Act, I/We the undersigned being all the shareholders of ${companyName.toUpperCase()} at the date hereof resolve that no auditor be appointed.`,
          style:{
            fontStyle:'italic'
          }
        },
        {
          type:'input',
          style:{
            width:200,
            height:14
          }
        },
        {
          type:'row',
          children:[
            {
              type:'text',
              text:'Name: ',
              style:{
                fontWeight:700
              }
            },
            {
              type:'text',
              text:`${directorName}`,
              style:{
                fontWeight:700
              }
            },
          ]
        },
        {
          type:'p',
          text:'Dated:'
        },
      ]
    },
    {
      type:'subTitle',
      text:'Closure',
    },
    {
      type:'p',
      text:'There being no further business the meeting was declared closed.',
    },
  ]
  return(
    <Fragment>
      <View style={{...styles.section}}>
        {
          renderText(content)
        }
      </View>
      <View style={{borderTop:'2 solid gray',position:'absolute',bottom:45,left: 35,right: 35}} fixed>
        <View style={{paddingLeft:'50%'}}>
          <Text style={{...styles.p,fontSize:'9'}}>Signed as a true and correct record of the proceedings of the meeting</Text>
          <Text style={{width:100,borderBottom:'1 solid gray',fontSize:12,height:14}} />
          <Text style={{...styles.p,fontWeight:700,fontSize:12,paddingTop:5}}>Chairman:</Text>
          <Text style={{...styles.p,fontSize:12}}>Dated:</Text>
        </View>
      </View>
    </Fragment>
  )
};

export default FirstMinutes