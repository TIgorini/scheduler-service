import mongoose, { Schema, Document } from 'mongoose'

export enum Message {
  Fairies = 'fairies',
  Gnomes = 'gnomes',
  Unicorns = 'unicorns'
}

export interface Job {
  time: Date,
  message: Message
}

export interface JobDoc extends Job, Document {}

const JobSchema: Schema = new Schema({
  time: { type: Date, required: true },
  message: { type: String, enum: Object.values(Message) }
})

export default mongoose.model<JobDoc>('Job', JobSchema)
