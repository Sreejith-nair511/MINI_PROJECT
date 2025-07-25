// lib/actions/login.ts
'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  return user.id; // return user ID to redirect from client
}
