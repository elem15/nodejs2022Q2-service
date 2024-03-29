import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
// import { ValidationPipe } from '@nestjs/common';
import { createTables } from './create-tables'

import 'dotenv/config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  await createTables();
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, '..' ,'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
