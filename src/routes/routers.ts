import express from 'express'
import userRouter from './user.router'
import roleRouter from './role.router'
import permisionsRouter from './permisions.router'
import managementRouter from './management.router'
import cat_typedocumentRouter from './cat_typedocument.router'
const routers = express()
routers.use('/user',userRouter)
routers.use('/role',roleRouter)
routers.use('/permisions',permisionsRouter)
routers.use('/management',managementRouter)
routers.use('/cat_typedocument', cat_typedocumentRouter)
export default routers