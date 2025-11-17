// src/app/lib/hash.js
import bcrypt from 'bcrypt';

async function hashPassword() {
  const password = '123456';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword);
  console.log('\nCopy this SQL to create a test user:');
  console.log(`
INSERT INTO users (id, name, email, password)
VALUES (
  '410544b2-4001-4271-9855-fec4b6a6442a',
  'Test User',
  'user@nextmail.com',
  '${hashedPassword}'
);
  `);
}

hashPassword();