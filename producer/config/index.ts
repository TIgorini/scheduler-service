import fs from 'fs'
import dotenv from 'dotenv'

export interface Config {
  mongo: { uri: string },
  rabbit: { uri: string },
  port: number
}

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' })
} else {
  dotenv.config({ path: '.env.example' })
}

const config: Config = {
  mongo: {
    uri: <string>process.env.MONGODB_URI
  },
  rabbit: {
    uri: <string>process.env.RABBITMQ_URI
  },
  port: parseInt(<string>process.env.PORT, 10)
}

export default config
