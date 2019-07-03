import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  Card, Button
} from 'antd'
import { Meteor } from 'meteor/meteor';
import { PDFViewer,Document } from '@react-pdf/renderer';
import DocumentLayout from './Document'
import CompanyInfoPdf from './CompanyInfo.pdf';
import PageLayoutPdf from './PageLayout.pdf';
import RegisterIndex from './CompanyRegisterIndex.pdf';
import FirstMinutes from './FirstMinutes.pdf';
import RegisterOfMembers from './RegisterOfMembers.pdf';
import ResisterOfDirectors from './RegisterOfDirectors.pdf';
const PdfView =props=>{
  const { company={},currentKey,onLodading=()=>{} } = props
  const { name='Your Company Name', companyNumber='0000000'}=company
  const renderContent=(currentKey)=>{
    switch (currentKey){
      case 'companyInfo':
        return(
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');onLodading(false)}}>
            <PageLayoutPdf>
              <CompanyInfoPdf />
              <RegisterIndex />
            </PageLayoutPdf>
          </Document>
          </PDFViewer>
        )
      case 'firstMeetingToDirectors':
        return(
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');onLodading(false)}}>
          <PageLayoutPdf>
            <FirstMinutes  paddingBottom={85}/>
          </PageLayoutPdf>
          </Document>
          </PDFViewer>
        )
      case 'directorsPdf':
        return(
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');onLodading(false)}}>
          <PageLayoutPdf>
            <ResisterOfDirectors />
          </PageLayoutPdf>
          </Document>
          </PDFViewer>
        )
      case 'members':
        return(
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');onLodading(false)}}>
          <PageLayoutPdf>
            <RegisterOfMembers />
          </PageLayoutPdf>
          </Document>
          </PDFViewer>
        )
      default :
        return (
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');onLodading(false)}}>
            <PageLayoutPdf>
              <CompanyInfoPdf />
              <RegisterIndex />
            </PageLayoutPdf>
            <PageLayoutPdf paddingBottom={85}>
              <FirstMinutes />
            </PageLayoutPdf>
            <PageLayoutPdf>
              <ResisterOfDirectors />
            </PageLayoutPdf>
            <PageLayoutPdf>
              <RegisterOfMembers />
            </PageLayoutPdf>
            </Document>
            </PDFViewer>
        )
          
    }
    
  }
  return renderContent(currentKey)
}
export default PdfView