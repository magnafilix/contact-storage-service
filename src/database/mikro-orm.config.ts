import { Contact } from '../entities/Contact';
import { MICRO_ORM_DATABASE_NAME, MICRO_ORM_DATABASE_TYPE } from '../config';

export default {
  entities: [Contact],
  dbName: MICRO_ORM_DATABASE_NAME,
  type: MICRO_ORM_DATABASE_TYPE,
  migrations: {
    path: './src/database/migrations',
  },
};
