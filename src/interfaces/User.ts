/* eslint-disable import/no-cycle */
import IAccount from './Account';

export default interface IUser {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserWithIAccount {
  Account: IAccount
}

export interface ILoginUser extends IUser {
  token: string;
}

export interface IUserTransfer {
  email: string;
  receiver: string;
  amount: number;
}
