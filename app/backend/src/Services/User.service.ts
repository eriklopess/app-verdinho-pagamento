import { PrismaClient } from '@prisma/client';
import Service from './Service';
import IUser from '../interfaces/User';

class UserService extends Service<IUser> {
  constructor(private prisma: PrismaClient) {
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
