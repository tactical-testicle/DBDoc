import express from 'express'
import userRouter from './user.router'
import roleRouter from './role.router'
import permisionsRouter from './permisions.router'
import managementRouter from './management.router'
import cat_typedocumentRouter from './cat_typedocument.router'
import cat_agreementRouter from './cat_agreement.router'
import responsibleRouter from './responsible.router'
import cat_responseRouter from './cat_response.router'
import cat_statusRouter from './cat_status.router'
import deputymanagementRouter from './deputymanagement.router'
import areaRouter from './area.router'
const routers = express()
//Catalogos basicos
routers.use('/user',userRouter)
routers.use('/role',roleRouter)
routers.use('/permisions',permisionsRouter)
routers.use('/management',managementRouter)
routers.use('/cat_typedocument', cat_typedocumentRouter)
routers.use('/cat_agreement', cat_agreementRouter)
routers.use('/responsible', responsibleRouter)
routers.use('/cat_response', cat_responseRouter)
routers.use('/cat_status', cat_statusRouter)
// Tablas intermedias
routers.use('/deputymanagement', deputymanagementRouter)
routers.use('/area', areaRouter)
// Tablas principales

// Tablas de auditoria

export default routers