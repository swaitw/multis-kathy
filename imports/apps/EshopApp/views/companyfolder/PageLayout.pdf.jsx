import React from 'react';
import { Page, Text, View, Document, StyleSheet,Font } from '@react-pdf/renderer';
Font.register({ family: 'Roboto', fonts: [
  { src: '/fonts/Roboto/Roboto-Regular.ttf' }, // font-style: normal, font-weight: normal
  { src: '/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 700 },
  { src: '/fonts/Roboto/Roboto-Medium.ttf', fontStyle: 400 },
  { src: '/fonts/Roboto/Roboto-Light.ttf', fontWeight: 100 },
  { src: '/fonts/Roboto/Roboto-Italic.ttf', fontStyle: 'italic' },
  { src: '/fonts/Roboto/Roboto-LightItalic.ttf', fontStyle: 'italic', fontWeight: 100 },
  { src: '/fonts/Roboto/Roboto-MediumItalic.ttf', fontStyle: 'italic', fontWeight: 400 },
  { src: '/fonts/Roboto/Roboto-BoldItalic.ttf', fontStyle: 'italic', fontWeight: 700 },
 ]});
const styles = StyleSheet.create({
  page: {
    paddingTop:35,
    paddingBottom:35,
    paddingHorizontal: 35,
    fontSize:12,
    fontFamily: 'Roboto',
    height:'100%'
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: 'justify',
  },
  header:{
    fontSize:10
  },
  content:{},
  footer:{
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  }
});

const PageLayoutPdf = (props) => {
  
  const {children,name='your company name',companyNumber='0000000',extraFooterSize=0,updateCurrentPage=()=>{},paddingBottom} = props
  if(paddingBottom){
    styles.page.paddingBottom = paddingBottom
  }
  return(
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <View style={{textAlign:'center',color:'gray'}}>
          <Text style={{paddingBottom:'5px'}}>Company Folder</Text>
          <Text style={{paddingBottom:'5px'}} render={()=>(
            `${name.toUpperCase()}(${companyNumber})`
          )}/>
        </View>
      </View>
      {children}
      <Text style={styles.footer} fixed
        render={({ pageNumber, totalPages }) => {
          console.log(pageNumber,'pageNumber')
          updateCurrentPage(pageNumber)
          return `${pageNumber} / ${totalPages}`
        }}/>
    </Page>
  )
};

export default PageLayoutPdf