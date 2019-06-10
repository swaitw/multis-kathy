import '../imports/api/index'
import './initRouters'
import './restful/index.api'
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { matchRoutes } from '../imports/lib/router/index'
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable'
import { Meteor } from 'meteor/meteor';
import { ServerStyleSheet } from "styled-components"
import { getCssStr } from "../imports/lib/css/getAntCss"
import lessToCss from '../imports/lib/css/lessToCss'
import styled from 'styled-components'

const Loading=()=>{
  return(<p>Loading 222</p>)
}
Meteor.startup(
  ()=>{
  }
)
const App = Loadable.Map({
  loader:{
    App:()=>import('../imports/apps/App'),
    routers:()=>{
      return new Promise(async(res,rej)=>{
          const routersFunc =( await import('../imports/config/router.config')).default
          console.log(routersFunc,'routersFunc')
          res(routersFunc)
      })
    }
  },
  loading:Loading,
  render(loaded,props){
    let App = loaded.App.default
    let routers = loaded.routers
    return <App routers={routers}/>
  }
})
  Loadable.preloadAll().then(()=>{
    onPageLoad(async(sink) => {
      const sheet = new ServerStyleSheet();
      const context = {};
      const mainStyle = getCssStr({path:`${process.env['PWD']}/client/main.css`});
      // const antStyle=getCssStr({path:`${process.env['PWD']}/node_modules/antd/lib/style/index.css`});
         const antStyle=getCssStr({path:`${process.env['PWD']}/node_modules/antd/dist/antd.min.css`});
      const StyledApp = styled((props)=>{
        const {className} = props
        return (
          <StaticRouter location={sink.request.url} context={context} className={`${className}`}>
            <App />
          </StaticRouter>
        )
      })`${mainStyle}`
      sink.appendToHead(`<style>${antStyle}</style>`);
        sink.renderIntoElementById('app',sheet.interleaveWithNodeStream(renderToNodeStream(sheet.collectStyles(
          <StyledApp />
        ))));
    });
  })


