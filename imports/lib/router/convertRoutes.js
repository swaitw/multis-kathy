import renderRoutes from './renderRoutes';
import convertRoutesConfig from './convertRoutesConfig';
export default function convertRoutes (routes = [], { app = {},role } = {}) {
  const routesForRender = convertRoutesConfig(routes, { app,role })
  return renderRoutes(routesForRender);
}