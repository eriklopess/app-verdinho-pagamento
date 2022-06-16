import { PrismaClient } from '@prisma/client';
import HttpException from '../HttpException/HttpException';

export default abstract class Service<T> {
  constructor(protected prisma: PrismaClient) {}
  abstract create(data: T): Promise<T | HttpException>;
}
