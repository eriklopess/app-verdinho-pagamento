import { PrismaClient } from '@prisma/client';
import Service from './Service';
import IUser, { IUserTransfer, IUserWithIAccount } from '../interfaces/User';
import HttpException from '../HttpException/HttpException';

export default class UserService extends Service<IUser, IUserWithIAccount> {
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
        role: data.role.toLowerCase(),
        Account: { create: { balance: 1000 } },
      },
    });
    return user;
  }

  public async find(email: string): Promise<IUser | HttpException> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  public async findWithAccount(email: string): Promise<IUserWithIAccount | HttpException> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { Account: true },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (!user.Account) {
      throw new HttpException('User has no account', 404);
    }
    return user as IUserWithIAccount;
  }

  public async update(
    email: string,
    receiver: string,
    amount: number,
  ): Promise<IUserTransfer | HttpException> {
    const user = await this.findWithAccount(email);
    const receiverUser = await this.findWithAccount(receiver);
    if (user instanceof HttpException) throw new HttpException('User not found', 404);
    if (receiverUser instanceof HttpException) throw new HttpException('Receiver not found', 404);
    if (user.Account.balance < amount) throw new HttpException('Account balance is out of range', 400);
    await this.prisma.user.update({
      where: { email },
      data: {
        Account:
       { update: { balance: { decrement: amount } } },
      },
    });
    await this.prisma.user.update({
      where: { email: receiver },
      data: {
        Account:
       { update: { balance: { increment: amount } } },
      },
    });
    return { email, receiver, amount };
  }
}
