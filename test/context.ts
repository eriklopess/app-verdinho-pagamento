import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import UserService from '../src/Services/User';

export type Context = {
  prisma: PrismaClient
};

export type MockContextPrisma = {
  prisma: DeepMockProxy<PrismaClient>
};

export const createMockContextPrisma = (): MockContextPrisma => ({
  prisma: mockDeep<PrismaClient>(),
});

export type MockContextUser = {
  prisma: DeepMockProxy<UserService>
};

export const createMockContextUser = (): MockContextUser => ({
  prisma: mockDeep<UserService>(),
});
