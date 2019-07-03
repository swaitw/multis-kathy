import React, { useState, Fragment } from 'react';
import { Page, Text, View, Document, StyleSheet,Font } from '@react-pdf/renderer';
import PageLayout from './PageLayout.pdf'
import CompanyInfo from './CompanyInfo.pdf'
import RegisterIndex from './CompanyRegisterIndex.pdf'
import FirstMinutes from './FirstMinutes.pdf'
import ResisterOfDirectors from './RegisterOfDirectors.pdf';
import RegisterOfMembers from './RegisterOfMembers.pdf';
// Create styles

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const DocumentLayout = (props) =>{
  const { key } = props
  const renderContent = (key)=>{
    if(key==='companyInfo'){
      return(
        <PageLayout>
          <CompanyInfo />
        </PageLayout>
      )
    }
      return(
        <Fragment>
          <PageLayout>
            <CompanyInfo />
          </PageLayout>
          <PageLayout>
            <RegisterIndex />
          </PageLayout>
          <PageLayout extraFooterSize={50}>
            <FirstMinutes />
          </PageLayout>
          <PageLayout>
            <ResisterOfDirectors />
          </PageLayout>
          <PageLayout>
            <RegisterOfMembers />
          </PageLayout>
        </Fragment>
      )
  }
  return <Document>{renderContent(key)}</Document>
};

export default DocumentLayout