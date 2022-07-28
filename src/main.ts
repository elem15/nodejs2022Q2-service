import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
// import { ValidationPipe } from '@nestjs/common';
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    // host: 'postgres', // docker bridge
    host: process.env.POSTGRES_HOST as string, //local
    port: 5432,
    database: 'postgres',
});

import 'dotenv/config';

const PORT = process.env.PORT || 4000;

const createTable = async() => {

  await pool.query(
        `CREATE TABLE IF NOT EXISTS users(id varchar(255), login varchar(255), version int, createdAt bigint, updatedAt bigint, password varchar(255));
        CREATE TABLE IF NOT EXISTS albums(id varchar(255), name varchar(255), year int, artistid varchar(255));
        CREATE TABLE IF NOT EXISTS artists(id varchar(255), name varchar(255), grammy boolean);`
  )
}

async function bootstrap() {
  await createTable();
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, '..' ,'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
