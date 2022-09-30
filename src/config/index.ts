import 'dotenv/config';

export enum MicroOrmDatabaseTypes {
  sqlite = 'sqlite',
  mongo = 'mongo',
  mysql = 'mysql',
  mariadb = 'mariadb',
  postgresql = 'postgresql',
  ['better-sqlite'] = 'better-sqlite',
}

export const APP_PORT = Number(process.env.APP_PORT) || 8080;

export const MICRO_ORM_DATABASE_NAME = process.env.DB_NAME || 'test.db';
export const MICRO_ORM_DATABASE_TYPE = process.env.DB_TYPE as MicroOrmDatabaseTypes || MicroOrmDatabaseTypes.sqlite;

export const VERIPHONE_API_KEY = process.env.VERIPHONE_API_KEY || '';
export const VERIPHONE_URL = process.env.VERIPHONE_URL || 'https://api.veriphone.io/v2/verify';