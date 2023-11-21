import { Pool } from "pg";

export class Contact {
  cid: number;
  name: string;
  surname: string;
  post: string;
  static pool: Pool
  constructor(cid: number, name: string, surname: string, post: string) {
    this.cid = cid;
    this.name = name;
    this.surname = surname;
    this.post = post;
  }
}
