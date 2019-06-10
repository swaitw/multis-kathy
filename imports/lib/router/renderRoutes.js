import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable'

const Loading=()=>{
  return(<p>Loading</p>)
}

const renderRoutes = (routes=[], extraProps = {}, switchProps = {}) =>{
  return(
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        return(
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => (
            <route.component {...props} {...extraProps} route={route} />
          )}
        />
      )})}
    </Switch>
  ) }

export default renderRoutes;