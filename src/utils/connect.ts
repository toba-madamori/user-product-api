import mongoose from "mongoose"
import config from 'config'
import logger from './logger'

const connect = async () => {
    const dbUrl = config.get<string>('dbUrl')
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(dbUrl)
        logger.info('DB connected')
    } catch (error) {
        logger.error('could not connect to the DB')
        logger.error(error)
        process.exit(1)
    }
    
}

export default connect