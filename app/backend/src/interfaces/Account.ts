import IUser from './User';

export default interface IAccount {
  id?: string;
  userId: IUser['id'];
  balance: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  User?: IUser;
}
