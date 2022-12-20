import { FilterQuery } from 'mongoose'
import SessionModel, { SessionDocument } from '../models/session.model'

export const createSession = async (userid:string, userAgent: string) => {
    const session = await SessionModel.create({ user: userid, userAgent })
    return session.toJSON()
}

export const getSessions =async (query: FilterQuery<SessionDocument>) => {
    return SessionModel.find(query).lean()
} 