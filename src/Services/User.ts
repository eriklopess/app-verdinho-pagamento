import { PrismaClient } from '@prisma/client';
import Service from './Service';
import IUser from '../interfaces/User';
import HttpException from '../HttpException/HttpException';

export default class UserService extends Service<IUser> {
  findAll(): Promise<HttpException | IUser[]> {
    throw new Error('Method not implemented.');
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

  async create(data: IUser): Promise<IUser | HttpException> {
    await this.hasEmail(data.email);
    await this.hasCpf(data.cpf);
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  update(id: string, data: IUser): Promise<IUser | HttpException> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<null> {
    throw new Error('Method not implemented.');
  }

  constructor(protected prisma: PrismaClient) {
    super(prisma);
  }

  public async findById(id: string): Promise<IUser | HttpException> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) throw new HttpException('User not found', 404);
      return user;
    } catch (error) {
      if (error instanceof Error) throw new HttpException(error.message, 400);
      throw new HttpException('Internal server error', 500);
    }
  }
}
