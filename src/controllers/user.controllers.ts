import { Request, Response } from 'express'
import logger from '../utils/logger'
import { createUser } from '../service/user.service'
import { CreateUserInput } from '../schema/user.schema'
import { omit } from 'lodash'

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const newUser = await createUser(req.body)
        const user = omit(newUser.toJSON(), ['password'])
        return res.status(201).json({ user })
    } catch (error: any) {
        logger.error(error)
        return res.status(409).send(error.message)
    }
}