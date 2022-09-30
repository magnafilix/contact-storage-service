import { FastifyRequest, FastifyReply } from 'fastify';

import { Contact } from '../entities/Contact';
import { convertDataStringToTableFormat } from '../utils';
import { ContactRepository } from '../repositories/ContactRepository';
import { ContactValidator } from '../validators/ContactValidator';

export class ContactHandler {
  static upload = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const multipartFile = await request.file();
    const buffer = await multipartFile.toBuffer();
    const dataString = buffer.toString('utf8');

    const { headers, rows: contacts } = convertDataStringToTableFormat(dataString);

    const validContacts: Contact[] = [];

    for await (const { Name, Phone, Email } of contacts) {
      if (Phone) {
        const existingContact = await ContactRepository.findOne({ phone: Phone });

        if (!existingContact) {
          const contact = new Contact(Name, Email, Phone);

          try {
            const isPhoneValid = await ContactValidator.isPhoneValid(contact.phone);

            if (isPhoneValid) {
              contact.isValid = true;
              validContacts.push(contact);
            } else {
              contact.isValid = false;
            }

            ContactRepository.persistAndFlush(contact);
          } catch (error) {
            request.log.error('failed to validate contact phone', contact.phone);
            console.log('failed to validate contact phone', error);
          }
        }
      }
    }

    void reply.code(201).send({
      headers,
      validContacts: validContacts.map((contact) => contact.toJSON()),
    });
  };
}