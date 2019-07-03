import React from 'react'
import moment from 'moment'
import {companyInfokeyToLabel} from './keyToLable'
const defaultCompanyInfo ={ name:'',number:'',key:'',dateOfIncorporation:null, annualReturn:'',firstAnnualReturn:'',constitution:'' }
const CompanyInfo =props=>{
  const {companyInfo=defaultCompanyInfo} = props
  const { name='',number='',key='',dateOfIncorporation='', annualReturn='',firstAnnualReturn='',constitution='' } = companyInfo
  return(
    <div style={{padding:'0px calc(50% - 400px)'}}>
      <div style={{textAlign:'center'}}><h3>COMPANY INFORMATION</h3></div>
      <div>
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
              <h4 key={key}>{label}: <strong>{value}</strong></h4>   
            )
          })
        }
      </div>
      <div>
        <div className="flex">
          <h4><strong>WARNING</strong></h4>
          <p>This page contains important information about your company. Please keep this page in a safe place.</p>
        </div>
      </div>
    </div>
  )
}
export default CompanyInfo