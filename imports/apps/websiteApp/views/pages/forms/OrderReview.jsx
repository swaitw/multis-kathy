import React, { PureComponent } from 'react';
import Card from 'antd/lib/card';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';
 import { toMoneyStr } from '../../../../../lib/common/formatedText'

 const keyTotitle={
   lname:'Last Name',
   fname:'First Name',
   email:'Email',
   address:'Address',
   phone:'Phone',
   phone2:'Phone2',
   preferredName:'Preferred Name',
   secondName:'Second Name',
   thirdName:'Third Name',
   numberOfDirectors:'Number Of Directors',
   numberOfShareholders:'number Of Shareholders',
   constitution:'Constitution',
   annualReturnMonth:'Annual Return Month',
   laqcCheck:'LAQC Check',
   registeredAddress:'registered Address',
   serviceAddress:'service Address',
   directors:'directors',
   shareholders:'Shareholders',
 }

const columns = [
  {
    title:'item',
    dataIndex:'item',
    key:'item'
  },
  {
    title:'value',
    dataIndex:'value',
    key:'value',
    render:(text,record)=>{
      if(typeof record.value === 'boolean'){
        return record.value?<Icon type="check" />:<Icon type="close" />
      }
      return text
    }
  }
]

const personalDetails=[
  {
    item:'Last name',
    value:null
  },
  {
    item:'First name',
    value:null
  },
]

const companyNames=[
  {
    item:'Preferred Name:',
    value:null
  },
]

const OrderReview = (props)=>{
  const { values,title='Review the order' } = props
  const getData=(item)=>{
    if(!values[item]){
      return[]
    }
    let data=[]
    if(item==='services'){
      data = values[item].map((service,i)=>{
        const { label,price} =service
        return{
          item:label,
          value:toMoneyStr(price/100),
          key:`${item}-${label.replace(/\s/g,"-")}-${i}`
        }
      })
      return data
    }
    if(item==='directors'||item==='shareholders'){
      data = values[item].filter((person)=>(
        (person.lname&&person.lname.replace(/\s/g,"").length!==0)
        ||(person.fname&&person.fname.replace(/\s/g,"").length!==0))).map((person,i)=>{
        const { lname,fname,...rest} =person
        const fullName = `${fname||''}${lname?` ${lname}`:''}`
        const children = Object.keys(rest).map((key)=>{
          return{
            item:keyTotitle[key]||key,
            value:rest[key],
            key:`${item}-${key}-${i}`
          }
        })
        return{
          item:fullName,
          value:"",
          type:'people',
          key:`${item}-${fullName}-${i}`,
          children:children
        }
      })
      return data
    }

    data = Object.keys(values[item]).map((key,i)=>{
      let value =values[item][key]
      if(key.indexOf('ddress')!==-1){
        value = Object.values(value).filter((subValue)=>(typeof subValue !=='boolean'&&subValue!=='')).join(',')
      }
      return{
        item:keyTotitle[key]||key,
        value,
        key:`${item}-${key}-${i}`
      }
    })
    console.log(data,'data')
    return data
  }
  const items =  Object.keys(values)
  if(items.length===0){
    return<div>no Data</div>
  }
  const moveTogother =(target,source)=>{
    const sourceIndex = items.indexOf(source)
    items.splice(sourceIndex,1)
    const targetIndex = items.indexOf(target)
    if(targetIndex===0){
      items.unshift(source)
    }else{
      items.splice(targetIndex,0,source)
    }
  }
  moveTogother('directors','numberofdirectors')
  moveTogother('shareholders','numberOfShareholders')
  moveTogother('numberOfShareholders','issueSharePrice')
  const getTotal=()=>{
    const { services:{selected=[]}={} } = values
    let total =0
    selected.forEach((item)=>{
      total += item.price/100
    })
    return toMoneyStr(total)
  }
  return(
    <Card
      title={title}
    >
      {
       items.map((key)=>{
          if(typeof values[key]==='number'||typeof values[key]==='string'){
            return (
              <div style={{padding:'1rem 0px'}} key={key}>
                <Tag color='blue' style={{color:'#fff'}}><h4 style={{margin:'0px'}}>{`${keyTotitle[key]||key}`}</h4></Tag><span>: {values[key]}</span>
              </div>
            )
          }
          return(
            <Row key={key}>
              <div style={{padding:'1rem 0px'}}>
                <Tag color='blue' style={{color:'#fff'}}><h4 style={{margin:'0px'}}>{keyTotitle[key]||key}</h4></Tag>
              </div>
              <Table
                size="small"
                dataSource={getData(key)}
                columns={columns}
                pagination={false}
                showHeader={false}
              />
            </Row>
          )
        })
      }
      <Row type="flex" justify="end" style={{paddingTop:'1rem',border:'2px solid'}}>
        <h3>{`TOTAL: ${getTotal()}`}</h3>
        <Col span={3}></Col>
      </Row>
    </Card>
  )
}

export default OrderReview