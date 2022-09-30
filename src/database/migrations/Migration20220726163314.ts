/* eslint-disable @typescript-eslint/require-await */
import { Migration } from '@mikro-orm/migrations';

export class Migration20220726163314 extends Migration {
  async up(): Promise<void> {
    this.addSql('create table `contact` (`id` integer not null primary key autoincrement, `name` text not null, `email` text not null, `phone` text not null, `is_valid` integer not null);');
  }
}
