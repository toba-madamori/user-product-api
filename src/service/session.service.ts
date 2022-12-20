import SessionModel from '../models/session.model'

export const createSession = async (userid:string, userAgent: string) => {
    const session = await SessionModel.create({ user: userid, userAgent })
    return session.toJSON()
}