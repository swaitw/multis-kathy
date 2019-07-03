import BlogAppRouters from '../apps/BlogApp/admin.routers' 
import adminRouters from '../apps/admin/routers' 
import websiteAppRouters from '../apps/websiteApp/routers'
import ordersRouters from '../apps/EshopApp/admin.routers'
adminRouters.routes.splice(0,0,...[ordersRouters,BlogAppRouters]) 
const routerConfig = [adminRouters,websiteAppRouters]; 
export default routerConfig