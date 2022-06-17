export enum Role {
  USER = 'USER',
  SHOPKEEPER = 'SHOPKEEPER',
}

export default interface IUser {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  role?: Role;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILoginUser extends IUser {
  token: string;
}
