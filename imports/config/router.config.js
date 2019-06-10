import BlogAppRouters from '../apps/BlogApp/admin.routers' 
import adminRouters from '../apps/admin/routers' 
import websiteAppRouters from '../apps/websiteApp/routers' 
adminRouters.routes = [BlogAppRouters]; 
const routerConfig = [adminRouters,websiteAppRouters]; 
export default routerConfig