import { fastify as Fastify } from 'fastify';
import fastifyMultipart from '@fastify/multipart';

import { routes } from './routes';
import database from './database';
import { APP_PORT } from './config';

const fastify = Fastify({ logger: true });

void fastify.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100, // Max field name size in bytes
    fieldSize: 100,     // Max field value size in bytes
    fields: 10,         // Max number of non-file fields
    fileSize: 1000000,  // For multipart forms, the max file size in bytes
    files: 1,           // Max number of file fields
    headerPairs: 2000,  // Max number of header key=>value pairs
  },
});
void fastify.register(routes);

database
  .init()
  .then(() => {
    console.log('MikroORM is intialised');
    fastify.server.emit('ready');
  })
  .catch(err => console.log('error when initialising MikroORM', err));

fastify.server.on('ready', () => {
  fastify.listen({ port: APP_PORT }, (err) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
});
