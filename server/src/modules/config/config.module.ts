import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { cwd } from 'process';
import { ConfigHelperService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(cwd(), './.env'),
    }),
  ],
  controllers: [],
  providers: [ConfigHelperService],
  exports: [ConfigHelperService],
})
export class ConfigHelperModule {}
