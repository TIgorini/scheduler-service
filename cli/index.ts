#!/usr/bin/env node

import got from 'got'
import config from '../producer/config'
import parser, { Arguments } from 'yargs-parser'

interface ScheduledResponse {
  jobId: string
}

const toMinutes = (delay: string) => parseInt(delay, 10) * 1000 * 60

const exec = async (cliArgs: Arguments) => {
  if (cliArgs._.length >= 2) {
    const [delay, message] = cliArgs._
    const time = new Date(Date.now() + toMinutes(delay))

    const response: ScheduledResponse = await got
      .post(`http://localhost:${config.port}`, { json: { time, message } })
      .json()
    console.log(`Scheduled as ${response.jobId} at ${time}.`)
  } else {
    console.log('Command format: scheduler <delay> <message>')
  }
}

exec(parser(process.argv.slice(2))).catch((err) => console.error(err))
