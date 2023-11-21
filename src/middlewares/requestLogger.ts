import { Middleware } from 'koa'
import Logger from '../utils/Logger'

const logger = new Logger('request')

export const requestLogger: Middleware = async (ctx, next) => {
  const start = Date.now()
  const method = ctx.method.padEnd(6, ' ')
  const url = ctx.url.padEnd(20, ' ')
  return await next()
    .then(() => {
      logger.info(`${method} ${url} - ${buildBody(ctx.request.body)} - ${getMs(start)} ms - ${ctx.status} - ${buildBody(ctx.response.body, 100)}`)
    })
    .catch(err => {
      const errString = `${method} ${url} - ${buildBody(ctx.request.body)} - ${getMs(start)} ms - ${err.status} - ${err.message}`
      logger.error(errString, err)
      ctx.throw(err)
    })
}

function getMs (start: number) {
  let ms = (Date.now() - start).toString()
  ms = ms.length > 3 ? ms : ms.padStart(3)
  return ms
}

export function buildBody (body: any, maxLength: number = 0) {
  let result = body ? JSON.stringify(body) : ''
  if (maxLength !== 0) {
    result.length > maxLength - 3
      ? result = result.slice(0, maxLength - 3).concat('...')
      : result = result.padEnd(maxLength, ' ')
  }
  return result
}
