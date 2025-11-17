// src/auth.js
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL);

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('=== AUTHORIZE CALLED ===');
        console.log('Email:', credentials?.email);
        console.log('Password:', credentials?.password);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        try {
          const result = await sql`SELECT * FROM users WHERE email=${credentials.email}`;
          const user = result[0];
          
          console.log('User found:', !!user);
          if (user) {
            console.log('Password from DB:', user.password);
          }

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log('Password match:', passwordsMatch);

          if (passwordsMatch) {
            console.log('LOGIN SUCCESS!');
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }

          console.log('Password mismatch');
          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
});