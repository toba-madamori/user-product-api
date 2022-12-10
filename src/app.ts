import express from 'express'
import config from 'config'
import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes'

const port = config.get<number>('port')

const app = express()


const start = async () => {
    try {
        await connect()
        app.listen(port, () => logger.info(`server is running on port ${port}`))
        routes(app)
    } catch (error) {
        logger.error(error)
    }
}

start()