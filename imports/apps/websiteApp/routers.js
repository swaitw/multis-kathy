import { Meteor } from 'meteor/meteor';
import { loadComp }from '../../lib/router/loadble'
const routers ={
    title:'user',
    path: '/',
    component:loadComp({
      component:()=>import('./views/Index'),
    }),
    routes:[
      {
        title:"Home",
        path:'/',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/HomePage'),
        }),
      },
      {
        title:"Home",
        path:'/home',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/HomePage'),
        }),
      },
      {
        title:"Home",
        path:'/about',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/About'),
        }),
      },
      {
        title:"Home",
        path:'/contact-us',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/ContactUs'),
        }),
      },
      {
        title:"Information",
        path:'/information',
        component:loadComp({
          component:()=>import('./views/pages/InfoPage'),
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
        }),
      },
      {
        title:"Register a companyonline",
        path:'/register-a-company-online',
        exact:true,
        component:loadComp({
          component:()=>import('./views/pages/ResisterCompany'),
        }),
      },
      {
        title:'user',
        path: '/:slug',
        component:loadComp({
          component:()=>import('./views/pages/DefaultPage'),
        })
      }
    ]
}

export default routers