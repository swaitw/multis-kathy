import { Meteor } from 'meteor/meteor';
import { loadComp }from '../../lib/router/loadble'
const routers ={
    title:'Blogs',
    path: '/admin/blog',
    component:loadComp({
      component:()=>import('./Index'),
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
        title:'View Blogs',
        path: '/admin/blog/blogs-list',
        component:loadComp({
          component:()=>import('./views/BlogList'),
        }),
      },
      {
        title:'Add New',
        path: '/admin/blog/new',
        component:loadComp({
          component:()=>import('./views/BlogDetail'),
          // initData:()=>{
          //   return new Promise((res,rej)=>{
          //     const blog= Meteor.call('getBlog','5tXQCaqiK5TAj6G64')
          //     res({
                
          //     })
          //   })
          // }
        }),
      },
      {
        title:'Categories',
        path: '/admin/blog/categories',
        component:loadComp({
          component:()=>import('./views/BlogCategories'),
        }),
      },
      {
        title:'View Blogs',
        show:false,
        path: '/admin/blog/:blogId',
        component:loadComp({
          component:()=>import('./views/BlogDetail'),
        }),
      },
    ]
}
export default routers