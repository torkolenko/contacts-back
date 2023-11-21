import winston from 'winston'
import fs from 'fs'
import path from 'path'

const { combine, timestamp, errors, printf, colorize } = winston.format

const myFormat = printf((info) => {
  const { timestamp, label, level } = info as {[k: string]: string}
  return `${timestamp} [${label}] ${level}: ${info.message}`
})

const logger = winston.createLogger({
  level: 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    myFormat
  ),
  transports: [new winston.transports.Console({ format: combine(colorize(), myFormat) })]
})

class Logger {
  private readonly label: string
  private readonly logger: winston.Logger

  constructor (label: string) {
    this.label = label
    this.logger = logger
  }

  public error (message: string, error?: Error) {
    error && error instanceof Error && (message += `\n${error.stack}`)
    this.logger.log({
      level: 'error',
      message,
      label: this.label
    })
  }

  public info (message: string) {
    this.logger.log({
      level: 'info',
      message,
      label: this.label
    })
  }
}

export const appLogger = new Logger('app')
export default Logger
