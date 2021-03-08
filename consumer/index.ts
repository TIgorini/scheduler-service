import rabbitmq from '../producer/config/rabbitmq'

class Main {
  private static readonly queue = 'schedule'

  static async start () {
    const channel = await rabbitmq.getChannel()

    channel.assertQueue(this.queue, { durable: true })
    channel.consume(this.queue, (message) => {
      if (message) {
        console.log(`Got scheduled message: ${message.content.toString()}`)
        channel.ack(message)
      }
    }, { noAck: false })
  }
}

Main.start()
