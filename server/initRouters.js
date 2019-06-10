import { Meteor } from "meteor/meteor";
import fs from 'fs'
const initRouters=()=>{
  console.log('initRouters')
  const bathPath = `${process.env['PWD']}/imports`
  const files = fs.readdirSync(`${bathPath}/apps`)
  let fileContent=''
  const routers =[]
  const adminSubRouters=[]
  files.forEach((file)=>{
    const stats = fs.statSync(`${bathPath}/apps/${file}`)
    // console.log(file,stats)
    if(stats.isDirectory()&&fs.existsSync(`${bathPath}/apps/${file}/routers.js`)){
      const str = `import ${file}Routers from '../apps/${file}/routers' \n`
      routers.push(`${file}Routers`)
      fileContent +=str
    }
    if(stats.isDirectory()&&fs.existsSync(`${bathPath}/apps/${file}/admin.routers.js`)){
      const str = `import ${file}Routers from '../apps/${file}/admin.routers' \n`
      adminSubRouters.push(`${file}Routers`)
      fileContent +=str
    }
  })
  fileContent += `adminRouters.routes = [${adminSubRouters.join(",")}]; \n`
  fileContent+=`const routerConfig = [${routers.join(",")}]; \n`
  fileContent+=`export default routerConfig`
  // fs.writeFileSync(`${bathPath}/config/router.config.js`,fileContent)
  fs.writeFileSync(`${process.env['PWD']}/packages/config/router.config.js`,fileContent)
  console.log('initRouters end')
}

Meteor.methods({
  'initRouters':initRouters
})