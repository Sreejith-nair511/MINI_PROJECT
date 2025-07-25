'use server';

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  // Temporary redirect with query param (you can add session logic later)
  redirect(`/dashboard?userId=${user.id}`);
}
