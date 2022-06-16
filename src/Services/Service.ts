import { PrismaClient } from '@prisma/client';
import HttpException from '../HttpException/HttpException';

export default abstract class Service<T> {
  constructor(protected prisma: PrismaClient) {

  }

  abstract findAll(): Promise<T[] | HttpException>;
  abstract findById(id: string): Promise<T | HttpException>;
  abstract create(data: T): Promise<T | HttpException>;
  abstract update(id: string, data: T): Promise<T | HttpException>;
  abstract delete(id: string): Promise<null>;
}
