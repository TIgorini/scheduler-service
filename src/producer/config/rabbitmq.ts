import amqp, { Connection } from 'amqplib'
import config from '.'

class RabbitMQ {
  private connection: Promise<Connection>

  constructor (uri: string) {
    this.connection = amqp.connect(uri)
  }

  getChannel () {
    return this.connection.then((connection) => connection.createChannel())
  }
}

export default new RabbitMQ(config.rabbit.uri)
