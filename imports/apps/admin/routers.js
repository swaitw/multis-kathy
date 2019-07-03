import { Meteor } from 'meteor/meteor';
import { loadComp }from '../../lib/router/loadble'
const routers ={
    title:'user',
    path: '/admin',
    component:loadComp({
      component:()=>import('./views/Index'),
      initData:()=>{
        if(Meteor.isClient){
          console.log('loading /admin')
        }
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
        title:'Settings',
        path: '/admin/settings',
        routes:[
          {
            title:'Site Settings',
            path: '/admin/settings/site',
            component:loadComp({
              component:()=>import('./views/SiteSettings')
            })
          }
        ]
      }
    ]
}

export default routers