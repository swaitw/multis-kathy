import React, { useState, Fragment,useEffect, Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import {
  Card, Button, Spin,message
} from 'antd'
import CompanyInfo from './companyfolder/CompanyInfo'
import PageLayout from './companyfolder/PageLayout'
import { Meteor } from 'meteor/meteor';
import { PDFViewer,Document } from '@react-pdf/renderer';
import DocumentLayout from './companyfolder/Document'
import CompanyInfoPdf from './companyfolder/CompanyInfo.pdf';
import PageLayoutPdf from './companyfolder/PageLayout.pdf';
import PdfView from './companyfolder/PdfView';
import RegisterIndex from './companyfolder/CompanyRegisterIndex.pdf';
import FirstMinutes from './companyfolder/FirstMinutes.pdf';
import RegisterOfMembers from './companyfolder/RegisterOfMembers.pdf';
import ResisterOfDirectors from './companyfolder/RegisterOfDirectors.pdf';
import { node } from 'prop-types';

const Wrapper =(props)=>{
  const { children } = props
  return <PDFViewer style={{width:'100%',height:'100%'}}>{children}</PDFViewer>
}

class CompanyFolder extends Component{
  state={
    isPdfView:false,
    loading:true,
  }
  componentWillReceiveProps(){
    // console.log('companyInfo 2')
    this.setState({loading:true})
    this.setState({isPdfView:false},()=>{
      setTimeout(()=>{
        this.setState({isPdfView:true})
      })
    })
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({isPdfView:true})
    })
  }

  renderContent(currentKey){
    console.log('companyInfo 3')
    switch (currentKey){
      case 'companyInfo':
        return(
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');this.setState({loading:false})}}>
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
          <Document onRender={(blob)=>{console.log(blob,'onRender');this.setState({loading:false})}}>
          <PageLayoutPdf>
            <FirstMinutes  paddingBottom={85}/>
          </PageLayoutPdf>
          </Document>
          </PDFViewer>
        )
      case 'directorsPdf':
        return(
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');this.setState({loading:false})}}>
          <PageLayoutPdf>
            <ResisterOfDirectors />
          </PageLayoutPdf>
          </Document>
          </PDFViewer>
        )
      case 'members':
        return(
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');this.setState({loading:false})}}>
          <PageLayoutPdf>
            <RegisterOfMembers />
          </PageLayoutPdf>
          </Document>
          </PDFViewer>
        )
      default :
        return (
          <PDFViewer style={{width:'100%',height:'100%'}}>
          <Document onRender={(blob)=>{console.log(blob,'onRender');this.setState({loading:false})}}>
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

  onLodading=(status)=>{
    this.setState({
      loading:status
    })
  }

  render(){
    const { company={},currentKey } = this.props
    const { isPdfView,loading,isTest } = this.state
   const { name='Your Company Name', companyNumber='0000000'}=company
   console.log('companyInfo 6')
    return(
      <Card
        title='Company Folder'
        className="ant-card-flex-full"
        bodyStyle={{position:'relative'}}
        // extra={<Button onClick={()=>{
        //   setIsPdfView(!isPdfView)
        // }}>{isPdfView?'Page View':'PDF Preview'}</Button>}
      >
        {
          loading&&<div 
          style={{
            display:'flex',
            position:'absolute',
            background:'#ffffff',
            flexDirection:'column',
            justifyContent:'center',
            width:'100%',
            paddingBottom:'20%',
            top:'1px',
            bottom:'1px'
          }}
        >
          <Spin size="large"/>
        </div>
        }
        {
          isPdfView?<PdfView currentKey={currentKey} onLodading={this.onLodading}/>:null
        }
      </Card>
    )
  }
}

export default CompanyFolder