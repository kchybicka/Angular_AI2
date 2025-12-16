import { Address } from './address';

export interface Person {
  id?: number;
  firstName: string;
  familyName: string;
  age: number;
  address: Address;
}
