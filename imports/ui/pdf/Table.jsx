import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  section: {
    flexDirection:'column',
    fontSize:12,
    lineHeight:1.5
  },
  tableHeader:{
    borderBottom:'1 solid gray',
    borderLeft:'1 solid gray',
    borderRight:'1 solid gray',
    borderTop:'1 solid gray',
    flexDirection:'row',
    alignItems:'center',
    fontWeight:700
  },
  row:{
    borderBottom:'1 solid gray',
    borderLeft:'1 solid gray',
    borderRight:'1 solid gray',
    marginTop:-1.5,
    flexDirection:'row',
    alignItems:'center',
  },
  p:{
    fontSize:10,
    paddingBottom:5
  },
  column:{
    borderLeft:'1 solid gray',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    padding:5,
    height:'100%',
    fontSize:10
  },
  boderLess:{
    borderBottom:0,
    borderLeft:0,
    borderRight:0,
    borderTop:0
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
const Table = (props) => {
  const { style={},dataSource=[],columns=[],showHeader=true,bordered=true} = props

  let rest = 100
  let px = 0 
  const indexs =[]
  const widths = columns.map((column,i)=>{
    if(column.width){
      if(column.width.indexOf('%')===-1){
        px += parseInt(column.width)
      }else{
        rest -= parseInt(column.width)
      }
    }else{
      indexs.push(i)
    }
  })

  styles.column.width=`${(rest/indexs.length).toFixed(4)}%`
  return(
    <View wrap style={style}>
      {
        showHeader&&<View fixed>
          <View
            style={{...styles.tableHeader,...bordered?{}:styles.boderLess}}
          >
            {
              columns.map((column,i)=>{
                const { title,key,width,style={},textStyle={} } =column
                return (
                  <View style={{...styles.column,...i===0?{borderLeft:0}:{},...width?{width}:{},...bordered?{}:styles.boderLess,...style}} key={key} >
                    <Text style={{...textStyle}}>{title}</Text>
                  </View>
                )
              })
            }
          </View>   
        </View>    
      }
      <View>
      {
        dataSource.map((data,i)=>{
          const { key }= data
          return(
            <View key={i} style={{...styles.row,...(!showHeader&&i===0)?{borderTop:'1 solid gray'}:{},...bordered?{}:styles.boderLess}} wrap={false}>
              {
                columns.map((column,j)=>{
                  const { title,key,dataIndex,width,style={},textStyle={} } =column
                  const text = data[dataIndex]||title
                  console.log(text,'text',j)
                  return (
                    <View style={{...styles.column,...j===0?{borderLeft:0}:{},...width?{width}:{},...bordered?{}:styles.boderLess,...style}} key={key}>
                      <Text style={{...textStyle}}>{text}</Text>
                    </View>
                  )
                })
              }
            </View>
          )
        })
      }
    </View>
    </View>
      
  )
};

export default Table