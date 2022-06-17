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

export interface ILoginUser extends IUser {
  token: string;
}
