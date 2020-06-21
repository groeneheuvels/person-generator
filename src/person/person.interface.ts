import { Gender } from './gender.type';

export interface Person {
  firstName: string;
  lastName: string;
  birthDate: Date;
  age: number;
  email: string;
  address: string;
  zip: string;
  city: string;
  gender: Gender;
}
