import UserService from '../../../../src/Services/User';
import { MockContext, Context, createMockContext } from '../context';

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

describe('Create', () => {
  it('should create a user', async () => {
    const user = {
      id: '0a5071eb-32a0-48c2-8a4b-c85534056387',
      name: 'John Doe',
      email: 'John@email.com',
      password: '123456',
      cpf: '123',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockCtx.prisma.user.create.mockResolvedValue(user);
    const userService = new UserService(ctx.prisma);
    const result = await userService.create(user);
    expect(result).toEqual(user);
  });

  it('should throw an error when user already exists', async () => {
    const user = {
      id: '0a5071eb-32a0-48c2-8a4b-c85534056387',
      name: 'John Doe',
      email: 'John@email.com',
      password: '123456',
      cpf: '123',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockCtx.prisma.user.create.mockRejectedValue({
      message: 'User already exists',
      statusCode: 400,
    });
    const userService = new UserService(ctx.prisma);
    try {
      await userService.create(user);
    } catch (error: any) {
      expect(error.message).toEqual('User already exists');
      expect(error.statusCode).toEqual(400);
    }
  });
});
