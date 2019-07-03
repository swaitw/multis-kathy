import React from 'react';
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
    flexDirection:'row',
    paddingBottom:5
  },
  p:{
    fontSize:10,
    paddingBottom:5
  },
});

const content =[
  {
    type:'pageTitle',
    text:'COMPANY REGISTER INDEX',
  },
  {
    type:'p',
    text:'The keeping of registers is a mandatory requirement under the Companies Act 1993 (further referred as "the Act"). This register is to be kept at the registered office, or otherwise as notified, and must be presented for inspection and/or reproduction to any person(s) permitted by the Act to inspect any such register.',
    style:{}
  },
  {
    type:'p',
    text:'Although any means of recording and keeping company matters may be used, should the method not be in the form of a bound book, reasonable precautions must be taken to prevent falsification of the records made.',
    style:{}
  },
  {
    type:'p',
    text:'All sections of the Register should be completed in accordance with the Act and the Constitution of the Company.',
    style:{}
  },
  {
    type:'p',
    text:'The following discussion of each section includes:',
    style:{}
  },
  {
    type:'point',
    text:'- Contents of the Section.',
    style:{}
  },
  {
    type:'point',
    text:'- Most relevant sections of the Act (all provisions relating to any aspect could not adequately be quoted and as such in some cases the Law should be more thoroughly consulted by cross reference).',
    style:{}
  },
  {
    type:'point',
    text:'- Brief, practical discussions of the content requirements of each section. Quotes from the Act are indicated and should not be considered the complete requirements of all matters relating to that section.',
    style:{}
  },
  {
    type:'title',
    text:'1. CERTIFICATE(S) OF REGISTRATION OR CHANGE OF NAME',
    style:{}
  },
  {
    type:'p',
    text:'The original Certificate or subsequent Certificates (and copies thereof) should be kept in the company register for safekeeping.',
    style:{}
  },
  {
    type:'title',
    text:'2. MINUTES MEMBERS',
  },
  {
    type:'p',
    text:'Sections 189(1)(b) & 189(1)(d)',
  },
  {
    type:'p',
    text:'Minutes of all proceedings at all members and officers of the company are to be entered under these tabs. Such records must be signed by the chairman of the meeting to ensure that such records are prima facie evidence of the proceedings to which they relate. Failure to comply is an offence.',
  },
  {
    type:'title',
    text:'3. MINUTES DIRECTORS',
  },
  {
    type:'p',
    text:'Sections 189(1)(b) & 189(1)(d)',
  },
  {
    type:'p',
    text:'Minutes of all proceedings at all members and officers of the company are to be entered under these tabs. Such records must be signed by the chairman of the meeting to ensure that such records are prima facie evidence of the proceedings to which they relate. Failure to comply is an offence.',
  },
  {
    type:'title',
    text:`4. DIRECTORS' REGISTERS`,
  },
  {
    type:'subTitle',
    text:`The Register of Directors`,
  },
  {
    type:'p',
    text:`Sections 189(1)(f)`,
  },
  {
    type:'p',
    text:`The Register of Directors is required to contain the names and addresses of current directors. This section should also contain copies of the signed consents to act as a director, which have been lodged with the Companies Office.`,
  },
  {
    type:'subTitle',
    text:`Interests Register`,
  },
  {
    type:'p',
    text:`Sections 189(1)(c)`,
  },
  {
    type:'p',
    text:`The Register of Directors Interests, or Interests Register, must declare the nature and extent of any director's interest in transaction or proposed transaction with the company including:`,
  },
  {
    type:'point',
    text:`- Share dealings in the company or a related company (Section 148).`,
  },
  {
    type:'point',
    text:`- Particulars of interest in transactions of the company (Section 140).`,
  },
  {
    type:'point',
    text:`- Disclosure or use of information acquired by virtue of office in, or employment by a company (Section 145).`,
  },
  {
    type:'point',
    text:` - Particulars of payments and loans to, and the guarantees of debts of directors, or contracts to do any of these (Section 161)`,
  },
  {
    type:'p',
    text:`Entries in this register are disclosed in the annual report to shareholders (Section 211(1)(e)).`,
  },
  {
    type:'subTitle',
    text:`Register of Certificates`,
  },
  {
    type:'p',
    text:`Sections 47, 52, 60, 69, 76, 161, 162, 221`,
  },
  {
    type:'p',
    text:`Under the 1993 Act, certification of decisions is a significant new feature for directors. The certificate forms part of the company's records. What it says depends on what the decision is about, but generally it involves formally recording the grounds for a decision. In the case of a decision requiring that the solvency test is satisfied, the certificate must say that those directors voting in favor of the resolution believe that the company will satisfy the solvency test after the relevant action has been taken and state the grounds for that opinion. The Act requires the opinion to be given on reasonable grounds. Failure to certify, or failure to do so properly, is in some cases an offence, and it can also make the directors concerned personally liable for any loss suffered by the company.`,
  },
  {
    type:'title',
    text:`5. REGISTER OF MEMBERS and SHARE REGISTER`,
  },
  {
    type:'p',
    text:`Section 189(1)(j)`,
  },
  {
    type:'p',
    text:`The share register must record the name and address of every shareholder in alphabetical order and particulars of the issue and transfer of shares. It must state whether there are any restrictions or limitations on the transfer of share and where any document containing these restrictions can be inspected. This register is prima facie evidence of legal title to the shares in the company.`,
  },
  {
    type:'title',
    text:`6. OTHER REGISTERS`,
  },
  {
    type:'subTitle',
    text:`Location of Registered Office, Address for Service Register and Address for Communication Registers`,
  },
  {
    type:'p',
    text:`Section 215 of the Act requires these records to be available for inspection.`,
  },
  {
    type:'subTitle',
    text:`Register of Charges`,
  },
  {
    type:'p',
    text:`This register can be used to keep a copy of every instrument creating a charge or mortgage over any or all of the assets of the company. The charges must also be registered with the Companies Office.`,
  }
]
const RegisterIndex = (props) => {
  return(
    <View style={styles.section} break>
      {
        content.map((item,i)=>{
          const { type,style={},text } = item
          let renderStyle = {}
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
            default:
              renderStyle=style.p
              break
          }
          return <Text key={i} style={{...renderStyle,...style}}>{text}</Text>
        })
      }
    </View>
  )
};

export default RegisterIndex