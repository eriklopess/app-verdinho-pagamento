import request from 'supertest';
import App from '../../../../src/api/App';
import { createMockContextUser, MockContextUser } from '../../../context';

let mockCtx: MockContextUser;

beforeEach(() => {
  mockCtx = createMockContextUser();
});

describe('/POST', () => {
  const app = new App().getApp();
  it('should create a user', (done) => {
    const userMock = {
      id: '0a5071eb-32a0-48c2-8a4b-c85534056387',
      name: 'John Doe',
      email: 'John@email.com',
      password: '123456',
      cpf: '123',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const user = {
      name: 'John Doe',
      email: 'John@email.com',
      cpf: '123',
      password: '123456',
    };
    mockCtx.prisma.create.mockResolvedValue(userMock);
    request(app)
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect(userMock, done);
  });
});
