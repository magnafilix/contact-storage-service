import { EntityRepository } from '@mikro-orm/sqlite';
import { Loaded } from '@mikro-orm/core';
import database from '../database';
import { Contact, IContact } from '../entities/Contact';

export class ContactRepository extends EntityRepository<Contact> {
  static persistAndFlush(contact: Contact): void {
    const em = database.getEntityManager();

    em?.persist(contact).flush();
  }

  static async findOne(filter: Partial<IContact> = {}): Promise<Loaded<Contact, never> | null | undefined> {
    const em = database.getEntityManager();

    const contact = await em?.getRepository(Contact).findOne(filter);

    return contact;
  }
}