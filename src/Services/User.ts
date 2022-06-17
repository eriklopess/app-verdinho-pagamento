import { PrismaClient } from '@prisma/client';
import Service from './Service';
import IUser from '../interfaces/User';
import HttpException from '../HttpException/HttpException';

export default class UserService extends Service<IUser> {
  constructor(protected prisma: PrismaClient) {
    super(prisma);
  }

  private async hasEmail(email: string): Promise<boolean> {
    const verifyEmailHasExist = await this.prisma.user.findUnique({ where: { email } });
    if (verifyEmailHasExist) {
      throw new HttpException('User already exist', 400);
    }
    return false;
  }

  private async hasCpf(cpf: string): Promise<boolean | HttpException> {
    const verifyCpfHasExist = await this.prisma.user.findUnique({ where: { cpf } });
    if (verifyCpfHasExist) {
      throw new HttpException('User already exist', 400);
    }
    return false;
  }

  public async create(data: IUser): Promise<IUser | HttpException> {
    await this.hasEmail(data.email);
    await this.hasCpf(data.cpf);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        Account: { create: { balance: 1000 } },
      },
    });
    return user;
  }

  public async find(email: string): Promise<IUser | HttpException> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }
}
