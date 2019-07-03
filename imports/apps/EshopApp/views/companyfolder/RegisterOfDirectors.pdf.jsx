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

const registerColumns = [
  {
    title:'Full Name',
    key:'fullName',
    dataIndex:'fullName',
  },
  {
    title:'Residential address',
    key:'address ',
    dataIndex:'address',
    width:'30%'
  },
  {
    title:'Occupation',
    key:'occupation ',
    dataIndex:'occupation',
  },
  {
    title:'Date appointed',
    key:'date',
    dataIndex:'date',
  },
  {
    title:`Date ceasedto be director`,
    key:'directorDate',
    dataIndex:'directorDate'
  },
]

const generalDisclosureColumns =[
  {
    title:'Name of Director',
    key:'fullName',
    dataIndex:'fullName',
  },
  {
    title:'Date of Entry',
    key:'date',
    dataIndex:'date',
  },
  {
    title:'Position',
    key:'position',
    dataIndex:'position',
  },
  {
    title:'Other Company or Person',
    key:'other',
    dataIndex:'other',
  }
]

const specificDisclosureColumns =[
  {
    title:'Name of Director',
    key:'fullName',
    dataIndex:'fullName',
  },
  {
    title:'Date of Entry',
    key:'date',
    dataIndex:'date',
  },
  {
    title:'Nature and extent of interest ',
    key:'natureAndExtent',
    dataIndex:'natureAndExtent',
  },
  {
    title:`Monetary value of interest (where able to be qualified)`,
    key:'monetaryValue',
    dataIndex:'monetaryValue',
  }
]

const disclosureOfInformationColumns =[
  {
    title:'Name of Director',
    key:'fullName',
    dataIndex:'fullName',
  },
  {
    title:'Date of Entry',
    key:'date',
    dataIndex:'date',
  },
  {
    title:'Date Disclosure Authorised by Board',
    key:'disclosureDate',
    dataIndex:'disclosureDate',
  },
  {
    title:`Particulars of Disclosure, Use, or Act`,
    key:'particulars',
    dataIndex:'particulars',
  }
]

const acquisitionOrDispositionColumns=[
  {
    title:'Name of Director',
    key:'fullName',
    dataIndex:'fullName',
  },
  {
    title:'Date of Entry',
    key:'date',
    dataIndex:'date',
  },
  {
    title:'Acquisition or Disposition',
    key:'type',
    dataIndex:'type',
  },
  {
    title:`Number and Class of Shares`,
    key:'shares',
    dataIndex:'shares',
  },
  {
    title:`Date of Acquisition or Disposition`,
    key:'actionDate',
    dataIndex:'actionDate',
  },
  {
    title:`Considirati on per Share`,
    key:'value',
    dataIndex:'value',
  }
]

const indemnityAndInsuranceColumns=[
  {
    title:'Name of Director',
    key:'fullName',
    dataIndex:'fullName',
  },
  {
    title:'Name and Position of Employee',
    key:'employee',
    dataIndex:'employee',
  },
  {
    title:'Date of Entry',
    key:'date',
    dataIndex:'date',
  },
  {
    title:'Date Board Authorised Indemnity or Insurance',
    key:'boardAuthorisedDate',
    dataIndex:'boardAuthorisedDate',
  },
  {
    title:`Date Directors Certified Cost of Insurance Fair`,
    key:'certifiedDate',
    dataIndex:'certifiedDate',
  },
  {
    title:`Date of Acquisition or Disposition`,
    key:'actionDate',
    dataIndex:'actionDate',
  },
  {
    title:`Particulars of Indemnity or Insurance`,
    key:'particulars',
    dataIndex:'particulars',
  }
]

const certificatesColumns=[
  {
    title:'Section under which certificate given',
    key:'given',
    dataIndex:'given',
  },
  {
    title:'Subject matter',
    key:'subjectMatter',
    dataIndex:'subjectMatter',
  },
  {
    title:'Names of directors signing certificate ',
    key:'directorsName',
    dataIndex:'directorsName',
  },
  {
    title:`Date of certificate`,
    key:'date',
    dataIndex:'date',
  },
  {
    title:`Certificate number`,
    key:'certificateNumber',
    dataIndex:'certificateNumber',
  }
]

const Wrapper = (props)=>{
  const { children,isBreakable,...restProps }  = props
  if(isBreakable){
    return<View break {...restProps}>{children}</View>
  }
  return <View {...restProps}>{children}</View>
}

const Register = (props)=>{
  const { directors,isBreakable=false } = props

  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>REGISTER OF DIRECTORS</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Section 189(f) Companies Act 1993</Text>
      <Table columns={registerColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const GeneralDisclosure = (props)=>{
  const { directors,isBreakable } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>DIRECTORS' INTERESTS REGISTER</Text>
      <Text style={{textAlign:'center',fontSize:14,padding:'5px 0px'}} fixed>General Disclosure of Interest</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Section 140(2)</Text>
      <Table columns={generalDisclosureColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const SpecificDisclosure = (props)=>{
  const { directors,isBreakable } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>DIRECTORS' INTERESTS REGISTER</Text>
      <Text style={{textAlign:'center',fontSize:14,padding:'5px 0px'}} fixed>Specific Disclosure of Interest</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Section 140(1)</Text>
      <Table columns={specificDisclosureColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const DisclosureOfInformation = (props)=>{
  const { directors,isBreakable } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>DIRECTORS' INTERESTS REGISTER</Text>
      <Text style={{textAlign:'center',fontSize:14,padding:'5px 0px'}} fixed>Disclosure of Information to be Disclosed or Used</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Section 145</Text>
      <Table columns={disclosureOfInformationColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const AcquisitionOrDisposition = (props)=>{
  const { directors,isBreakable } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>DIRECTORS' INTERESTS REGISTER</Text>
      <Text style={{textAlign:'center',fontSize:14,padding:'5px 0px'}} fixed>Acquisition or Disposition of Shares</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Companies Act 1993 Section 148</Text>
      <Table columns={acquisitionOrDispositionColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const IndemnityAndInsurance = (props)=>{
  const { directors,isBreakable } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>DIRECTORS' INTERESTS REGISTER</Text>
      <Text style={{textAlign:'center',fontSize:14,padding:'5px 0px'}} fixed>Directors' and Employees' Indemnity and Insurance</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Section 167(2)</Text>
      <Table columns={indemnityAndInsuranceColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const Certificates = (props)=>{
  const { directors,isBreakable } = props
  return(
    <Wrapper isBreakable={isBreakable}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}} fixed>DIRECTORS' INTERESTS REGISTER</Text>
      <Text style={{textAlign:'center',fontSize:9,padding:'5px 0px'}} fixed>Section 189(e) Companies Act 1993</Text>
      <Table columns={certificatesColumns} dataSource={directors}/>
    </Wrapper>
  )
}

const ResisterOfDirectors = (props) => {
  const { directors=[{},{},{},{},{},{},{},{},{},{},{},{},{}],currentPage} = props
  return(
    <Fragment>
      <Register directors={directors}/>
      <GeneralDisclosure directors={directors} isBreakable={true}/>
      <SpecificDisclosure directors={directors} isBreakable={true}/>
      <DisclosureOfInformation directors={directors} isBreakable={true}/>
      <AcquisitionOrDisposition directors={directors} isBreakable={true}/>
      <IndemnityAndInsurance directors={directors} isBreakable={true}/>
      <Certificates directors={directors} isBreakable={true}/>
    </Fragment>
  )
};

export default ResisterOfDirectors