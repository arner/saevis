import {Module, OnModuleInit} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { TopicModule } from './topic/topic.module';
import { UsersModule } from './users/users.module';
import { SeederService } from './seeder/seeder.service';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    AuthModule,
    TopicModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      synchronize: true,
      dropSchema: true,
      logging: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
    ContentModule
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule implements OnModuleInit {
  constructor(private seederService: SeederService) {
  }

  async onModuleInit(): Promise<void> {
    await this.seederService.seed();
  }
}
