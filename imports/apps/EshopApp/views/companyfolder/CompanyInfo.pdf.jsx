import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {companyInfokeyToLabel} from './keyToLable'
const styles = StyleSheet.create({
  section: {
    flexDirection:'column',
    fontSize:12
  },
  row:{
    flexDirection:'row',
    padding:'5px 0px'
  }
});
const defaultCompanyInfo ={ name:'',number:'',key:'',dateOfIncorporation:null, annualReturn:'',firstAnnualReturn:'',constitution:'' }
const CompanyInfoPdf = (props) => {
  const {companyInfo=defaultCompanyInfo} = props
  const { name='',number='',key='',dateOfIncorporation='', annualReturn='',firstAnnualReturn='',constitution='' } = companyInfo
  return(
    <View style={styles.section}>
      <Text style={{textAlign:'center',fontSize:20,padding:'20px 0px'}}>COMPANY INFORMATION</Text>
      {
        Object.keys(companyInfo).map((key)=>{
          const label = companyInfokeyToLabel[key]||key
          let value = companyInfo[key]
          if(key==='name'){
            value = value.toUpperCase()
          }
          if(key==='dateOfIncorporation'){
            value=value?moment(value).format('DD-MM-YYYY'):''
          }
          return(
            <View key={key} style={styles.row}>
              <Text>{label} :</Text><Text>{value}</Text>
            </View>
          )
        })
      }
      <Text style={{fontSize:12,textAlign:'center',padding:'5px 30px',margin:'30px 0px',borderTop:'1 solid gray',borderBottom:'1 solid gray'}}>
        <Text style={{fontWeight:900}}>WARNING: </Text>
        <Text>This page contains important information about your company. Please keep this page in a safe place.</Text>
      </Text>
    </View>
  )
};

export default CompanyInfoPdf