import { PrismaClient } from '@prisma/client';
import HttpException from '../HttpException/HttpException';
import { IUserTransfer } from '../interfaces/User';

export default abstract class Service<T, U> {
  constructor(protected prisma: PrismaClient) {}
  abstract create(data: T): Promise<T | HttpException>;
  abstract find(email: string): Promise<T | HttpException>;
  abstract findWithAccount(email: string): Promise<U | HttpException>;
  abstract update(
    email: string,
    receiver: string,
    amount: number,): Promise<IUserTransfer | HttpException>;
}
