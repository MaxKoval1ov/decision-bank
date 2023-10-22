import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join, resolve } from 'path';
import { cwd } from 'process';
import { ConfigHelperService } from './config.service';

console.log(resolve(cwd(), './env'));

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
