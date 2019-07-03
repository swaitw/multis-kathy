import React, { Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {companyInfokeyToLabel} from './keyToLable'
import Table from '../../../../ui/pdf/Table';
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
  },
  column:{
    borderRight:'1 solid #gray',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    padding:5,
    height:'100%',
    fontSize:10
  }
});

const shareHeaderColumns=[
  {
    title:'item',
    key:'item',
    dataIndex:'item',
    width:'30%',
  },
  {
    title:'value',
    key:'value',
    dataIndex:'value',
    style:{
      fontWeight:700
    }
  },
]

const registerColumns = [
  {
    title:'Date',
    key:'date',
    dataIndex:'date',
  },
  {
    title:'Particulars of Application or Transfer',
    key:'particulars',
    dataIndex:'particulars',
  },
  {
    title:'Class of Share',
    key:'class ',
    dataIndex:'class',
  },
  {
    title:'Certificate No',
    key:'certificateNumber',
    dataIndex:'certificateNumber',
  },
  {
    title:`Serial Nos`,
    key:'serialNos',
    dataIndex:'serialNos'
  },
  {
    title:`Shares Acquired`,
    key:'sharesAcquired',
    dataIndex:'sharesAcquired'
  },
  {
    title:`Shares Transferred`,
    key:'sharesTransferred',
    dataIndex:'sharesTransferred'
  },
  {
    title:`Shares Balance`,
    key:'sharesBalance',
    dataIndex:'sharesBalance'
  },
  {
    title:`Amount paid per Share`,
    key:'amountPerShare',
    dataIndex:'amountPerShare'
  },
]

const shareAllotmentColumns =[
  {
    title:'Date Issued',
    key:'inssuedDate',
    dataIndex:'inssuedDate',
  },
  {
    title:'Certificate No',
    key:'certificateNumber',
    dataIndex:'certificateNumber',
  },
  {
    title:'To Whom Issued',
    key:'shareHolder',
    dataIndex:'shareHolder',
  },
  {
    title:'Number of Shares',
    key:'numberOfShares',
    dataIndex:'numberOfShares',
  },
  {
    title:'Class of Share',
    key:'class ',
    dataIndex:'class',
  },
  {
    title:`Serial Nos`,
    key:'serialNos',
    dataIndex:'serialNos'
  },
  {
    title:'Date Of Surrender',
    key:'surrenderDate',
    dataIndex:'surrenderDate',
  },
  {
    title:'Details Of Surrender',
    key:'surrenderDetails',
    dataIndex:'surrenderDetails',
  },
]

const shareDetailColumns =[
  {
    title:'Number',
    key:'number',
    dataIndex:'number',
  },
  {
    title:'Class of Share',
    key:'class ',
    dataIndex:'class',
  },
  {
    title:`Serial Nos`,
    key:'serialNos',
    dataIndex:'serialNos'
  }
]

const transferDetailColumns=[
  {
    title:`Date Transfer Received`,
    key:'transferDate',
    dataIndex:'transferDate'
  },
  {
    title:`Date Board Resolves to Refuse or Delay Registration`,
    key:'resolvesDate',
    dataIndex:'resolvesDate'
  },
  {
    title:`Date Notice or Refusal or Delay sent to Transferor`,
    key:'noticeDate',
    dataIndex:'noticeDate'
  },
  {
    title:`Date Board Approve Registration or Transfer`,
    key:'approveDate',
    dataIndex:'approveDate'
  }
]

const transferShareColumns=[
  {
    title:`Number of Shares Transferred`,
    key:'transferDate',
    dataIndex:'transferDate'
  },
  {
    title:`Identifying Numbers of Shares`,
    key:'identifyingNumbers',
    dataIndex:'identifyingNumbers'
  },
  {
    title:'Class of Share',
    key:'class ',
    dataIndex:'class',
  },
  {
    title:`Identifying Numbers of Share Certificates Presented`,
    key:'identifyingNumbersCertificatesPresented',
    dataIndex:'identifyingNumbersCertificatesPresented'
  }
]

const sharesIssuedColumns=[
  {
    title:`Date`,
    key:'date',
    dataIndex:'date'
  },
  {
    title:`Identifying Numbers`,
    key:'identifyingNumbers',
    dataIndex:'identifyingNumbers'
  },
  {
    title:'Class of Share',
    key:'class ',
    dataIndex:'class',
  },
  {
    title:`Issued To`,
    key:'shareholder',
    dataIndex:'shareholder'
  },
  {
    title:`Consideration Payable`,
    key:'considerationPayable',
    dataIndex:'considerationPayable'
  },
  {
    title:`Amounts Paid and Dates Paid`,
    key:'amountsAndDates',
    dataIndex:'amountsAndDates'
  },
]

const Wrapper = (props)=>{
  const { children,isBreakable,...restProps }  = props
  if(isBreakable){
    return<View break {...restProps}>{children}</View>
  }
  return <View {...restProps}>{children}</View>
}

const ShareHeader=(props)=>{
  const { isBreakable=false } = props
  const items = [
    {
      item:'Name:',
      value:'SUN, Zhaorong',
      key:'name',
    },
    {
      item:'Address:',
      value:'Flat 2, 4 Te Koa Road, Panmure, Auckland 1072, New Zealand',
      key:'address'
    },
    {
      item:'Date of Entry as a Member:',
      value:'08-Jun-2016',
      key:'date'
    },
    {
      item:'Date of Cessation As a Member:',
      value:'',
      key:'dateOfCessation'
    },
  ]
  return(
    <Table columns={shareHeaderColumns} dataSource={items} showHeader={false} bordered={false} fixed/>
  )
}

const Register = (props)=>{
  const { directors,isBreakable=false } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>SHARE REGISTER</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Section 87 Companies Act 1993</Text>
      <ShareHeader />
      <Table columns={registerColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const ShareAllotment = (props)=>{
  const { directors,isBreakable=false } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>SHARE ALLOTMENT REGISTER</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Section 87 Companies Act 1993</Text>
      <Text style={{textAlign:'center',fontSize:10,padding:'5px 0px'}} fixed>
        Please refer to the Company's Constitution (if exists) for the restrictions and limitations on the transfer of shares. A copy of the Company's Constitution may be inspected at the Registered Office.
      </Text>
      <Table columns={shareAllotmentColumns} dataSource={directors}/>
    </Wrapper>
  )
}

// const ShareDetails = (props)=>{
//   const { directors,isBreakable=false } = props
//   return(
//     <Table columns={shareDetailColumns} dataSource={directors}/>
//   )
// }

const ShareCertificate = (props)=>{
  const { directors,isBreakable=false } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <View style={{borderBottom:'1 dashed gray',paddingBottom:20}}>
        <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} >SHARE CERTIFICATE</Text>
        <Text style={{textAlign:'center',fontSize:18,paddingBottom:5}} >MULTI SUPPORT LIMITED</Text>
        <Text style={{textAlign:'center',fontSize:14,padding:'5px 0px'}} >Flat 2, 4 Te Koa Road, Pamure</Text>
        <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} >Registered under the Companies Act 1993</Text>
        <Text style={{textAlign:'center',fontSize:14,padding:'5px 0px',fontWeight:700}} >Certificate Number 1</Text>
        <Text style={{textAlign:'center',fontSize:14,padding:'5px 0px'}} >Number of Shares: 10</Text>
        <Text style={{textAlign:'center',fontSize:10,padding:'5px 0px'}} >
          <Text>This is to certify that </Text>
          <Text style={{fontWeight:700}}>SUN, Zhaorong</Text>
          <Text> of </Text>
          <Text style={{fontWeight:700}}>Flat 2, 4 Te Koa Road, Panmure, Auckland 1072, New Zealand</Text> is the registered holder of those shares set out in the panel herein, each fully paid, subject to the Constitution of the Company and the Companies Act 1993.
        </Text>
        <Text style={{fontStyle:'italic'}}>Dated this 08-Jun-2016</Text>
        <Table columns={shareDetailColumns} dataSource={directors}/>
        <Text style={{textAlign:'center',paddingTop:'15px'}}>
          <Text>Director:........................   </Text>
          <Text>Director/Secretary:........................</Text>
        </Text>
      </View>
      <View>
        <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} >SHARE CERTIFICATE</Text>
        <Text style={{textAlign:'center',fontSize:18,paddingBottom:5}} >MULTI SUPPORT LIMITED</Text>
        <Text style={{fontSize:14,padding:'5px 0px'}}>Date Issued: 08-Jun-2016</Text>
        <Text style={{fontSize:14,padding:'5px 0px'}}>Certificate Number: 1</Text>
        <Text style={{fontSize:14,padding:'5px 0px'}}>Received certificate for shares set out in the panel herein</Text>
        <Text style={{fontSize:14,padding:'10px 0px'}}>Signature .....................................</Text>
        <Table columns={shareDetailColumns} dataSource={directors}/>
      </View>
    </Wrapper>
  )
}

const Journal =(props)=>{
  const { directors,isBreakable=false } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} >SHARE CERTIFICATE</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} >Section 87 Companies Act 1993</Text>
      <Text style={{textAlign:'center',fontSize:10,padding:'5px 0px'}} >Please refer to the Company's Constitution (if exists) for the restrictions and limitations on the transfer of shares. A copy of the Company's Constitution may be inspected at the Registered Office.</Text>
      <View style={{width:'100%',paddingBottom:20,marginBottom:10 ,borderBottom:'1 dashed gray'}}>
        <Text >Transfer Number:</Text>
      </View>
      <View style={{width:'100%',paddingBottom:30,marginBottom:10,borderBottom:'1 dashed gray'}}>
        <Text >Transferor's Name, Address and Occupation:</Text>
      </View>
      <View style={{width:'100%',paddingBottom:30,marginBottom:10,borderBottom:'1 dashed gray'}}>
        <Text >Transferee's Name, Address and Occupation:</Text>
      </View>
      <View style={{width:'100%',paddingBottom:50,marginBottom:10, borderBottom:'1 dashed gray'}}>
        <Text >Comment:</Text>
      </View>
      <Table columns={transferDetailColumns} dataSource={directors}/>
      <Table style={{paddingTop:10}} columns={transferShareColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const TransferOfShares=(props)=>{
  const { directors,isBreakable=false } = props
  return(
    <Wrapper isBreakable={isBreakable} style={{lineHeight:1.5}}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} >TRANSFER OF SHARES</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} >Section 87 Companies Act 1993</Text>
      <Text style={{textAlign:'center',fontSize:10,padding:'5px 0px'}} >Please refer to the Company's Constitution (if exists) for the restrictions and limitations on the transfer of shares. A copy of the Company's Constitution may be inspected at the Registered Office.</Text>
      <Text >I, .......................................................................................................... </Text>
      <Text >of ............................................................................................................... (the transferor) in consideration of the sum of $............ paid to me </Text>
      <Text style={{paddingBottom:30}}>by .......................................................................................................... (hereinafter called the transferee) do hereby transfer .................... share(s) numbered .................... in the undertaking called
      <Text style={{fontStyle:'italic'}}> MULTI SUPPORT LIMITED </Text>to hold unto the transferee, subject to the several conditions on which I hold the same. And I, the transferee do hereby agree to take the said shares subject to the conditions aforesaid.</Text>
      <Text >AS WITNESS our hands this SIGNED by the Transferor: ..............................................</Text>
      <Text >in the presence of: .............................................. </Text>
      <Text >SIGNED by the Transferee: .............................................. </Text>
      <Text >in the presence of: .............................................. </Text>
    </Wrapper>
  )
}

const SharesIssued = (props)=>{
  const { directors,isBreakable=false } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>SHARES ISSUED AND PAYMENTS MADE REGISTER</Text>
      <Table columns={sharesIssuedColumns} dataSource={directors}/>
    </Wrapper>
  )
}


const RegisterOfMembers = (props) => {
  const { directors=[{},{},{},{},{}],currentPage} = props
  return(
    <Fragment>
      <Register directors={directors}/>
      <ShareAllotment directors={directors} isBreakable={true}/>
      <ShareCertificate directors={[{},{}]} isBreakable={true}/>
      <Journal directors={[{}]} isBreakable={true}/>
      <TransferOfShares directors={[{}]} isBreakable={true}/>
      <SharesIssued directors={directors} isBreakable={true}/>
    </Fragment>
  )
};

export default RegisterOfMembers