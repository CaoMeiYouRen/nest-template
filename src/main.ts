import { PORT } from './app.config'
import path from 'path'
import moduleAlias from 'module-alias'
moduleAlias.addAlias('@', path.join(__dirname, './'))
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const options = new DocumentBuilder()
        .setTitle('nest template docs')
        .setDescription('nest template docs')
        .setVersion('0.1.0')
        // .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)

    app.enableCors({})
    await app.listen(PORT)
    console.log(`Listen http://127.0.0.1:${PORT}/docs`)
}

bootstrap()