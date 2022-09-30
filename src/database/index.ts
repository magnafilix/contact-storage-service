import { MikroORM, type EntityManager } from '@mikro-orm/core';

class Database {
  private entityManager: EntityManager | null = null;

  async init(): Promise<void> {
    const orm = await MikroORM.init();

    this.entityManager = orm.em;
  }

  getEntityManager(): EntityManager | null {
    if (!this.entityManager) {
      throw new Error('could not find active database connection');
    }

    return this.entityManager.fork();
  }
}

export default new Database();