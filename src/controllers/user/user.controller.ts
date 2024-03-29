import { User, UserModel } from '@/db/models/User.model'
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Crud } from 'nestjs-mongoose-crud'
import { InjectModel } from 'nestjs-typegoose-next'

@Crud({
    model: User,
})
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(@InjectModel(User) private readonly model: UserModel) {
    }
}
