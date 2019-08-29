import React,{ PureComponent } from 'react';
import styled from 'styled-components'
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
// import { getAntCsses } from '../../../../lib/css/getAntCss'
// const css = getAntCsses(['row','grid','icon'])

class HomePage extends PureComponent{

  infoList=[
    '10 minutes to complete our easy online application',
    'No commission for company formation itself',
    'Compliant with the New Zealand Companies Act',
    'Statutory documentation required by law included',
    'Choice of 3 names',
    'Constitution optional',
    'Professional support team',
    'More'
  ]

  render(){
    const { className } =  this.props
    // console.log(this.props,'this.props')
    return(
      <Row className={`${className}`} >
        <div className="full-row bg-image-cover" style={{height:"450px",backgroundImage:'url("http://bizoffice.co.nz/images/hilight.png")'}}>
          <Row className="px-15 h-100 flex flex-column justify-center align-item-center">
            <Row className="w-100 flex">
              <Col span={12} className="flex justify-center">
                <Row>
                  <h2>Register a company</h2>
                  {
                    this.infoList.map((info)=>{
                      return(
                        <Row key={info} type="flex" align="middle" style={{fontSize:'1rem',padding:'0.25rem 0px'}}>
                          <Icon type="check" className="pr-1"/><h6 style={{margin:0,padding:0}}>{info}</h6>
                        </Row>
                      )
                    })
                  }
                </Row>
              </Col>
              <Col span={12} className="flex align-item-end">
                <Row>
                  <Button type="primary" style={{height:'auto'}}><h3 style={{margin:0,color:'#fff'}}>Register A Company</h3></Button>
                  <Row type="flex" align="middle">
                    <Col>
                      <h2>$289</h2>
                    </Col>
                    <Col>
                      <ul>
                        <li>Includes tax and government fees</li>
                        <li>Pay by VISA, MasterCard, Direct Credit or Cheque</li>
                      </ul>
                    </Col>
                  </Row>
                </Row>
              </Col>
            </Row>
          </Row>
        </div>
        <div className="full-row">
          <Row className="px-15 py-3 mb-3 flex-nowrap check-available" type="flex" justify="center" align='middle'>
            <h3 style={{margin:0,paddingRight:10}}>Company name available?</h3>
            <Input style={{flex:'0 0 50%'}}/><Button>Check Now</Button>
          </Row>
        </div>
        <div>
          <Row type="flex" className="flex-nowrap" gutter={16}>
            <Col span={8} className="flex-full">
              <Card
                bordered={false}
                title="Company folder"
                className="flex-full-card"
              >
                <div className="flex-full"><p>You have an existing company, but you do not have statutory documentation to go with. Order Company Folder or risk fines of up to $10,000.</p>
                </div>
                <div><Button type="primary">Order Now</Button></div>
              </Card>
            </Col>
            <Col span={8} className="flex-full">
              <Card
                bordered={false}
                title="Easy online setup"
                className="flex-full-card"
              >
                <div className="flex-full"><p>You can setup your new company right here, right now, 5-10 minutes.</p></div>
                <div><Button type="primary">Start Setup</Button></div>
              </Card>
            </Col>
            <Col span={8} className="flex-full">
              <Card
                bordered={false}
                title="Why form a company?"
                className="flex-full-card"
              >
                <div className="flex-full"><p>Company incorporation can be a tricky process requiring specific knowledge. Please visit our information section.</p>
                </div>
                <div><Button type="primary">Learn More</Button></div>
              </Card>
            </Col>
          </Row>
        </div>
      </Row>
    )
  }
}

export default styled(HomePage)`
  .check-available{
    box-shadow: 0px 0px 14px 1px #c9c9c9;
  }
  .full-row{
    width:100vw;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  .h-100{
    height:100%
  }
  .flex{
    display:flex;
  }
  .flex-nowrap{
    flex-wrap:nowrap;
  }
  .bg-image-cover{
    background-size: cover;
    background-position: center;
  }
  .flex-full{
    flex:1 1 100%
  }
  .flex-full-card{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .flex-full-card > .ant-card-head{
    flex: 0 0 auto;
  }
  .flex-full-card > .ant-card-body{
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`