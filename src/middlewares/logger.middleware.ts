import morgan from 'morgan'
import path from 'path'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FileStreamRotator from 'file-stream-rotator'
import { timeFormat } from '@/utils/helper'
const logDir = path.resolve('logs')
morgan.token('time', () => timeFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSSZ'))
morgan.token('time-short', () => timeFormat(Date.now(), 'HH:mm:ss.SSS'))

morgan.format('app-combined', '[:time] :remote-addr - ":method :url HTTP/:http-version" :status - :response-time ms')
morgan.format('console-combined', '[:time-short] :remote-addr - ":method :url HTTP/:http-version" :status - :response-time ms')

const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logDir, '%DATE%.log'),
    frequency: 'daily',
    verbose: false,
    size: '1g',
    max_logs: '30d',
})
export const consoleLogger = morgan('console-combined', {})
export const fileLogger = morgan('app-combined', { stream: accessLogStream })
