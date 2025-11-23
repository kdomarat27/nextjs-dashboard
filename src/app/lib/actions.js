// src/app/lib/actions.js
'use server';

import { signIn, signOut } from '../../auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
  redirect('/dashboard');
}

export async function logout() {
  await signOut({ redirect: true, callbackUrl: '/login' });
}