import Layout from './Layout';
import Redirect from './Redirect';

// import dynamic from 'dva/dynamic';
import _isArray from 'lodash/isArray';
import _isBoolean from 'lodash/isBoolean';
import _isFunction from 'lodash/isFunction';
import _isString from 'lodash/isString';
import _set from 'lodash/set';
import React,{ Fragment } from 'react';
import Loadable from 'react-loadable'

const Loading=()=>{
  return(<p>Loading</p>)
}
const asyncComponent = (loadComponent,path) => (

  class AsyncComponent extends React.Component {

      constructor(...args){
          super(...args);
        
          this.state = {
              Component: null,
          };
          this._isMounted=false
          this.hasLoadedComponent = this.hasLoadedComponent.bind(this);
      }
      componentDidMount() {
          this._isMounted=true
          if(this.hasLoadedComponent()){
              return;
          }
          loadComponent()
              .then(module => module.default ? module.default : module)
              .then(Component => {
                  // console.log('setState')
                  if(this._isMounted){
                    this.setState({
                      Component
                    });
                  }
                  
              })
              .catch(error => {
                  /*eslint-disable*/
                  console.error('cannot load Component in <AsyncComponent>');
                  /*eslint-enable*/
                  throw error;
              })
      }
      componentWillUnmount(){
        this._isMounted=false
      }
      hasLoadedComponent() {
          return this.state.Component !== null;
      }
      render(){
          const {
              Component
          } = this.state;
         return (Component) ? <Component {...this.props} /> : null;
      }
  }
);

// export default function convertRoutesConfig (routes = [], { app = {},role } = {}) {
//   return routes.filter((route)=>((route.roles&&route.roles.indexOf(role)!==-1)||!route.roles)).map((route) => {
//     const { path, component, models, routes, exact, redirect,title,icon,show,innerShow,showChildren,roles } = {...route};
//     const state = {};
//     const dynamicParams = { app };
//     _isString(path) && _set(state, 'path', path);
//     _isString(title) && _set(state, 'title', title);
//     _isString(icon) && _set(state, 'icon', icon);
//     _isBoolean(exact) && _set(state, 'exact', exact);
//     _isBoolean(show) && _set(state, 'show', show);
//     _isBoolean(innerShow) && _set(state, 'innerShow', innerShow);
//     _isBoolean(showChildren) && _set(state, 'showChildren', showChildren);
//     _isArray(roles) && _set(state, 'roles', roles);
//     //  记录 model
//     // if (_isFunction(models)){
//     //   _set(dynamicParams, 'models', models);
//     // }
    
//     if (_isString(redirect)) {
//       //  记录 redirect 组件
//       // _set(dynamicParams, 'component', () => () => Redirect({ exact, path, redirect }));
//       _set(state, 'component', ()=>Redirect({ exact, path, redirect }));
//     } else if (_isFunction(component)) {
//       //  记录 配置中的组件
//       // _set(dynamicParams, 'component', component);
//       _set(state, 'component', Loadable({loader:component,loading:Loading}));
//     } else {
//       //  记录 预设Layout 组件
//       // _set(dynamicParams, 'component', () => Layout);
//       _set(state, 'component', Layout);
//     }
//     //  异步挂载组件（第一次挂载组件时会注册对应的 models ）
//     // _set(state, 'component', dynamic(dynamicParams));
//     //  子路由配置
//     if (_isArray(routes) && routes.length > 0) {
//       _set(state, 'routes', [...convertRoutesConfig([...routes], { app,role })]);
//     }
//     return {...state};
//   });
// };

export default function convertRoutesConfig (routes = [], { app = {},role } = {}) {
  return routes.filter((route)=>((route.roles&&route.roles.indexOf(role)!==-1)||!route.roles)).map((route) => {
    const { path, component, models, routes, exact, redirect,title,icon,show,innerShow,showChildren,roles } = {...route};
    const state = {};
    const dynamicParams = { app };
    _isString(path) && _set(state, 'path', path);
    _isString(title) && _set(state, 'title', title);
    _isString(icon) && _set(state, 'icon', icon);
    _isBoolean(exact) && _set(state, 'exact', exact);
    _isBoolean(show) && _set(state, 'show', show);
    _isBoolean(innerShow) && _set(state, 'innerShow', innerShow);
    _isBoolean(showChildren) && _set(state, 'showChildren', showChildren);
    _isArray(roles) && _set(state, 'roles', roles);
    //  记录 model
    // if (_isFunction(models)){
    //   _set(dynamicParams, 'models', models);
    // }
    
    if (_isString(redirect)) {
      //  记录 redirect 组件
      // _set(dynamicParams, 'component', () => () => Redirect({ exact, path, redirect }));
      _set(state, 'component', ()=>Redirect({ exact, path, redirect }));
    } else if (_isFunction(component)) {
      //  记录 配置中的组件
      // _set(dynamicParams, 'component', component);
      const loadComponent = Loadable({loader:component,loading:Loading})

      _set(state, 'component',component );
    } else {
      //  记录 预设Layout 组件
      // _set(dynamicParams, 'component', () => Layout);
      _set(state, 'component', Layout);
    }
    //  异步挂载组件（第一次挂载组件时会注册对应的 models ）
    // _set(state, 'component', dynamic(dynamicParams));
    //  子路由配置
    if (_isArray(routes) && routes.length > 0) {
      _set(state, 'routes', [...convertRoutesConfig([...routes], { app,role })]);
    }
    return {...state};
  });
};