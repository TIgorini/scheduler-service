import JobModel from '../models/job'

const checker = async () => {
  const jobs = await JobModel.find({ time: { $lte: new Date() } }).exec()
  const jobsIds = jobs.map(({ _id }) => _id)
  if (jobsIds.length > 0) {
    await JobModel.deleteMany({ _id: { $in: jobsIds } }).exec()
    console.log('Dispatch messages to consumers: work in progress...')
  }
}

class Scheduler {
  start () {
    setInterval(checker, 1000)
  }

  async add (time: Date, message: string): Promise<string> {
    const { id } = await JobModel.create({ time, message })
    return id
  }
}

export default new Scheduler()
