import axios from 'axios';

import { VERIPHONE_URL, VERIPHONE_API_KEY } from '../config';

export interface VeriphoneReply {
  phone_valid: boolean;
}

export class ContactValidator {
  static async isPhoneValid(phone: string): Promise<boolean> {
    if (!phone) {
      return false;
    }

    const { data: { phone_valid: phoneValid } } = await axios.get<VeriphoneReply>(VERIPHONE_URL, {
      params: {
        key: VERIPHONE_API_KEY,
        phone: phone,
      },
    });

    return phoneValid;
  }
}