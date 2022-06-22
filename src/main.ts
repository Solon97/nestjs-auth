import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
// import { UnauthorizedInterceptor } from './interceptors/UnauthorizedInterceptor';

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  // Interceptors
  // app.useGlobalInterceptors(new UnauthorizedInterceptor());

  await app.listen(3000)
}

bootstrap()
