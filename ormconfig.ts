import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const PORT = process.env.POSTGRES_PORT || "5432";

export default {
    type: "postgres",
    host: process.env.POSTGRES_HOST as string,
    port: parseInt(PORT, 10) as number,
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
    synchronize: false,
    entities: [ 'dist/**/entities/*.entity.js' ],
    migration: [ 'dist/**/migration/*.js' ],
    migrationRun: true,
 } as DataSourceOptions;