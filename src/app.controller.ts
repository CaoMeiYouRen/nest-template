import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { HttpError } from './models/HttpError'
import { sleep } from './utils/helper'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('/')
    getHello() {
        return this.appService.getHello()
    }

    @Get('/error')
    getError() {
        throw new HttpError(500, '服务器出现异常')
    }

    @Get('/async-error')
    async getAsyncError() {
        throw new HttpError(500, '服务器出现异步异常')
    }

    @Get('/timeout')
    async timeout() {
        await sleep(11 * 1000)
        return {
            message: '测试请求超时',
        }
    }
}