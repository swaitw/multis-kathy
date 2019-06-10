import { Meteor } from 'meteor/meteor';
import { loadComp }from '../../lib/router/loadble'
const routers ={
    title:'user',
    path: '/',
    component:loadComp({
      component:()=>import('./views/Index'),
      initData:()=>{
        return new Promise((res,rej)=>{
          const links= Meteor.call('getLinks')
          res({
            links
          })
        })
      }
    }),
    routes:[
      {
        title:"Home",
        path:'/',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/HomePage'),
          initData:()=>{
            return new Promise((res,rej)=>{
              const links= Meteor.call('getLinks')
              res({
                links
              })
            })
          }
        }),
      },
      {
        title:"Home",
        path:'/home',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/HomePage'),
          initData:()=>{
            return new Promise((res,rej)=>{
              const links= Meteor.call('getLinks')
              res({
                links
              })
            })
          }
        }),
      },
      {
        title:"Home",
        path:'/about',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/About'),
          initData:()=>{
            return new Promise((res,rej)=>{
              const links= Meteor.call('getLinks')
              res({
                links
              })
            })
          }
        }),
      },
      {
        title:"Home",
        path:'/contact-us',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/ContactUs'),
          initData:()=>{
            return new Promise((res,rej)=>{
              const links= Meteor.call('getLinks')
              res({
                links
              })
            })
          }
        }),
      },
      {
        title:"Information",
        path:'/information',
        component:loadComp({
          component:()=>import('./views/pages/InfoPage'),
          initData:()=>{
            return new Promise((res,rej)=>{
              const links= Meteor.call('getLinks')
              res({
                links
              })
            })
          }
        }),
        routes:[
          {
            title:"Information",
            path:'/information',
            exact:true,
            component:loadComp({
              component:()=>import('./views/pages/BlogPage'),
              initData:()=>{
                return new Promise((res,rej)=>{
                  const blog= Meteor.call('getBlog',{slug:'information'})
                  res({
                    blog
                  })
                })
              }
            }),
          },
          {
            title:"Information",
            path:'/information/:slug',
            exact:true,
            component:loadComp({
              component:()=>import('./views/pages/BlogPage'),
              initData:()=>{
                return new Promise((res,rej)=>{
                  const links= Meteor.call('getLinks')
                  res({
                    links
                  })
                })
              }
            }),
          }
        ]
      },
      {
        title:"Home",
        path:'/products',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/Products'),
          initData:()=>{
            return new Promise((res,rej)=>{
              const links= Meteor.call('getLinks')
              res({
                links
              })
            })
          }
        }),
      },
      {
        title:"Register a companyonline",
        path:'/register-a-company-online',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/ResisterCompany'),
          initData:()=>{
            return new Promise((res,rej)=>{
              const links= Meteor.call('getLinks')
              res({
                links
              })
            })
          }
        }),
      }
    ] 
}

export default routers