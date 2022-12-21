import { Request, Response } from 'express'
import { createSession, getSessions, updateSession } from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { signJwt } from '../utils/jwt.utils'
import config from 'config'

export const createUserSessionHandler = async (req: Request, res: Response) => {
    // validate user's password

    const user = await validatePassword(req.body)
    if(!user) {
        res.status(401).json({ msg: 'Invalid credentials '})
    }

    // create session

    const session = await createSession(user._id , req.get('user-agent') || '')

    // create access token

    const accessToken = signJwt(
        {...user, session: session._id},
        { expiresIn: config.get<string>('accessTokenTtl')}
    )

    // create refresh token
    const refreshToken = signJwt(
        {...user, session: session._id},
        { expiresIn: config.get<string>('refreshTokenTtl')}
    )

    // return access and refresh token
    return res.send({ accessToken, refreshToken})
}

export const getUserSessionsHandler =async (req: Request, res: Response) => {
    const userId = res.locals.user._id

    const sessions = await getSessions({ user: userId, valid: true})

    return res.status(200).json({ sessions })
}

export const deleteSessionHandler =async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session

    await updateSession({_id: sessionId}, {valid: false})

    res.status(200).json({ accessToken: null, refreshToken: null })
}