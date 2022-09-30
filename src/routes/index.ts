import type { FastifyInstance } from 'fastify';

import { ContactHandler } from '../handlers/ContactHandler';

export const routes = (fastify: FastifyInstance, opts: unknown, done: (err?: Error) => void): void => {
  fastify.post('/contacts/upload', {}, ContactHandler.upload);

  done();
};