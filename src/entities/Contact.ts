import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ContactRepository } from '../repositories/ContactRepository';

export interface IContact {
  id: number
  name: string
  email: string
  phone: string
  isValid: boolean
}

@Entity({ customRepository: () => ContactRepository })
export class Contact extends BaseEntity<Contact, 'id'> {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  phone!: string;

  @Property()
  isValid!: boolean;

  constructor(name = '', email = '', phone = '') {
    super();

    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}