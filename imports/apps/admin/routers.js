import { Meteor } from 'meteor/meteor';
import { loadComp }from '../../lib/router/loadble'
const routers ={
    title:'user',
    path: '/admin',
    component:loadComp({
      test:'admin',
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
    ]
}

export default routers