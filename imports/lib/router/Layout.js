import renderRoutes from './renderRoutes';

export default function Layout (props = {}) {
  const {route:{routes=[]}={}} = props
  // console.log(props.route.routes,'props.route.routes')
  return renderRoutes(props.route.routes);
}