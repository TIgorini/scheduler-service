import mongoose, { Schema, Document } from 'mongoose'

export interface Job {
  time: Date,
  message: string
}

export interface JobDoc extends Job, Document {}

const JobSchema: Schema = new Schema({
  time: { type: Date, required: true },
  message: { type: String, require: true }
})

export default mongoose.model<JobDoc>('Job', JobSchema)
