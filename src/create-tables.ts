import * as pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    // host: 'postgres', // docker bridge
    host: process.env.POSTGRES_HOST as string, //local
    port: 5432,
    database: 'postgres',
});

export const createTables = async() => {
    await pool.query(
          `CREATE TABLE IF NOT EXISTS users(id varchar(255) UNIQUE NOT NULL, login varchar(255), version int, createdAt bigint, updatedAt bigint, password varchar(255));
          CREATE TABLE IF NOT EXISTS albums(id varchar(255) UNIQUE NOT NULL, name varchar(255), year int, artistid varchar(255));
          CREATE TABLE IF NOT EXISTS artists(id varchar(255) UNIQUE NOT NULL, name varchar(255), grammy boolean);
          CREATE TABLE IF NOT EXISTS tracks(id varchar(255) UNIQUE NOT NULL, name varchar(255), artistid varchar(255), albumid varchar(255), duration int);
          CREATE TABLE IF NOT EXISTS artistsIds(id varchar(255));
          CREATE TABLE IF NOT EXISTS albumsIds(id varchar(255));
          CREATE TABLE IF NOT EXISTS tracksIds(id varchar(255));
          ;`
    )
  }