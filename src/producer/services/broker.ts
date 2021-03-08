import { Channel } from 'amqplib'
import Message from '../../types/message'

export default class Broker {
  private channel: Channel
  private readonly queue = 'schedule'

  constructor (channel: Channel) {
    this.channel = channel
  }

  send (message: Message) {
    this.channel.assertQueue(this.queue, { durable: true })
    this.channel.sendToQueue(this.queue, Buffer.from(message), { persistent: true })
  }
}
