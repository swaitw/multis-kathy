import { Meteor } from 'meteor/meteor';
import { loadComp }from '../../lib/router/loadble'
const routers ={
    title:'Orders',
    path: '/admin/orders',
    component:loadComp({
      component:()=>import('./Index'),
    }),
    routes:[
      {
        title:'View Orders',
        path: '/admin/orders/orders-list',
        component:loadComp({
          component:()=>import('./views/OrdersList'),
        }),
      },
      // {
      //   title:'Add New',
      //   path: '/admin/orders/new',
      //   component:loadComp({
      //     component:()=>import('./views/OrderDetail'),
      //   }),
      // },
      // {
      //   title:'Categories',
      //   path: '/admin/orders/categories',
      //   component:loadComp({
      //     component:()=>import('./views/OrderCategories'),
      //   }),
      // },
      {
        title:'View Order',
        show:false,
        path: '/admin/orders/:orderId',
        component:loadComp({
          component:()=>import('./views/OrderDetail'),
        }),
      },
    ]
}
export default routers