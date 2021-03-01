import { PreauthMiddleware } from './auth/preauth.middlewate';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreauthMiddleware)
    .exclude({
      path: "users/auth",
      method: RequestMethod.ALL
    })
    .forRoutes({
      path: "*",
      method: RequestMethod.ALL
    })
  }
}
