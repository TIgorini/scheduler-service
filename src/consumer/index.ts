import {
  defaultHandler,
  fairiesHandler,
  gnomesHandler,
  unicornsHandler
} from './handlers'

import rabbitmq from '../producer/config/rabbitmq'
import Message from '../types/message'

const handleMessage = (message: string) => {
  switch (message) {
    case Message.Fairies:
      fairiesHandler()
      break
    case Message.Gnomes:
      gnomesHandler()
      break
    case Message.Unicorns:
      unicornsHandler()
      break
    default: defaultHandler()
  }
}

class Main {
  private static readonly queue = 'schedule'

  static async start () {
    const channel = await rabbitmq.getChannel()

    channel.assertQueue(this.queue, { durable: true })
    channel.consume(this.queue, (message) => {
      if (message) {
        handleMessage(message.content.toLocaleString())
        channel.ack(message)
      }
    }, { noAck: false })
  }
}

Main.start()
