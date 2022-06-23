import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaModule } from './components/prisma/prisma.module'
import { UserModule } from './components/user/user.module'
import { AuthModule } from './components/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './components/auth/guards/jwt-auth.guard';
import { RoleGuard } from './components/auth/guards/role.guard';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ]
})
export class AppModule { }
