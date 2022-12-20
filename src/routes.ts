import { Express, Request, Response } from 'express'
import { createUserSessionHandler } from './controllers/session.controllers'
import { createUserHandler } from './controllers/user.controllers'
import validateResource from './middleware/validateResource'
import { createSessionSchema } from './schema/session.schema'
import { createUserSchema } from './schema/user.schema'

const routes = (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => {
        res.sendStatus(200)
    })

    app.post('/api/users', validateResource(createUserSchema), createUserHandler)

    app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler)
}

export default routes