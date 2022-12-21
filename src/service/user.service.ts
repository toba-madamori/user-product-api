import { DocumentDefinition, FilterQuery } from "mongoose"
import UserModel, { UserDocument } from "../models/user.model"
import { omit } from 'lodash'

export const createUser =async (input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
    try {
        const newUser =  await UserModel.create(input)
        const user = omit(newUser.toJSON(), ['password'])
        return user
    } catch (error: any) {
        throw new Error(error)
    }
}

export const validatePassword = async ({email, password}: {email: string, password: string}) => {
    const oldUser = await UserModel.findOne({ email })
    
    if(!oldUser) {
        return false
    }

    const isValid = await oldUser.comparePassword(password)
    if(!isValid) return false

    const user = omit(oldUser.toJSON(), ['password'])
    return user
}

export const findUser =async (query: FilterQuery<UserDocument>) => {
    return await UserModel.findOne(query).lean()
}