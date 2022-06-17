import IUser from './User';

export default interface IAccount {
  id?: string;
  userId: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
  User?: IUser;
}
