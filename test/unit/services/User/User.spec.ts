import { userMock } from '../../../mocks/user';
import UserService from '../../../../src/Services/User';
import prismaMock from '../../../singleton';
import prisma from '../../../../src/client/client';

describe('create', () => {
  it('should create a user', async () => {
    prismaMock.user.create.mockResolvedValue(userMock);
    const userService = new UserService(prisma);
    const result = await userService.create(userMock);
    expect(result).toEqual(userMock);
  });

  it('should throw an error when user already exists', async () => {
    prismaMock.user.create.mockRejectedValue({
      message: 'User already exists',
      statusCode: 400,
    });
    const userService = new UserService(prisma);
    try {
      await userService.create(userMock);
    } catch (error: any) {
      expect(error.message).toEqual('User already exists');
      expect(error.statusCode).toEqual(400);
    }
  });
});

describe('find', () => {
  it('should find a user by id', async () => {
    prismaMock.user.findUnique.mockResolvedValue(userMock);
    const userService = new UserService(prisma);
    const result = await userService.find(userMock.email);
    expect(result).toEqual(userMock);
  });
  it('should throw an error when user not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    const userService = new UserService(prisma);
    try {
      await userService.find(userMock.email);
    } catch (error: any) {
      expect(error.message).toEqual('User not found');
      expect(error.status).toEqual(404);
    }
  });
});
