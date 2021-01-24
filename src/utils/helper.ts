import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import colors from 'colors'
import Debug from 'debug'
import { TZ, NODE_ENV } from '@/app.config'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(TZ)

/**
 * 延时一段时间
 *
 * @author CaoMeiYouRen
 * @date 2019-08-26
 * @export
 * @param {number} time
 * @returns
 */
export async function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 * 格式化时间
 *
 * @author CaoMeiYouRen
 * @export
 * @param {(number | string | Date)} [date=Date.now()]
 * @param {string} [pattern='YYYY-MM-DD HH:mm:ss.SSS']
 * @returns
 */
export function timeFormat(date: number | string | Date = Date.now(), pattern: string = 'YYYY-MM-DD HH:mm:ss.SSS') {
    if (typeof date === 'number' && date.toString().length === 10) {
        if (date < 1e10) {
            date *= 1000
        }
    }
    return dayjs(date).tz().format(pattern)
}
/**
 *
 * @param {*} str 打印当前时间，可以附加文字
 */
export function printTime(str: any) {
    console.log(`${timeFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSS')} : ${JSON.stringify(str)}`)
}

export const debug = Debug('my-app')

/**
 * 日志模块
 */
export const Log = {
    log(msg: any) {
        if (NODE_ENV === 'development') {
            console.log(`${colors.yellow(timeFormat(Date.now(), 'HH:mm:ss.SSS'))}: ${colors.green(typeof msg === 'string' ? msg : JSON.stringify(msg, null, 4))}`)
        }
    },
    info(msg: any) {
        console.info(`${colors.yellow(timeFormat(Date.now(), 'HH:mm:ss.SSS'))}: ${colors.green(typeof msg === 'string' ? msg : JSON.stringify(msg, null, 4))}`)
    },
    /**
     * 打印错误到控制台
     *
     * @author CaoMeiYouRen
     * @date 2020-05-26
     * @param {*} msg
     */
    error(msg: any) {
        console.error(`${colors.yellow(timeFormat(Date.now(), 'HH:mm:ss.SSS'))}:`, colors.red(msg))
    },
}