import JobModel from '../models/job'
import Broker from './broker'
import rabbitmq from '../config/rabbitmq'
import Message from '../../types/message'

const scheduleExecutor = (broker: Broker) => async () => {
  const jobs = await JobModel.find({ time: { $lte: new Date() } }).exec()
  if (jobs.length > 0) {
    await JobModel.deleteMany({ _id: { $in: jobs.map(({ _id }) => _id) } }).exec()

    for (const { message } of jobs) {
      broker.send(message)
    }
  }
}

class Scheduler {
  async start () {
    const channel = await rabbitmq.getChannel()
    const broker = new Broker(channel)
    setInterval(scheduleExecutor(broker), 60000)
  }

  async add (time: Date, message: Message): Promise<string> {
    const { id } = await JobModel.create({ time, message })
    return id
  }
}

export default new Scheduler()
