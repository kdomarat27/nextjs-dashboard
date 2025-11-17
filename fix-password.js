const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.development.local' });  // ← Changed to .env.development.local

console.log('DATABASE_URL being used:', process.env.DATABASE_URL ? 'EXISTS' : 'MISSING');
console.log('First 50 chars:', process.env.DATABASE_URL?.substring(0, 50));

const sql = neon(process.env.DATABASE_URL);

async function fixPassword() {
  const password = '123456';
  const hash = await bcrypt.hash(password, 10);
  
  console.log('\nGenerated hash:', hash);
  
  try {
    // Delete and recreate user
    await sql`DELETE FROM users WHERE email = 'user@nextmail.com'`;
    console.log('Deleted old user');
    
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (
        '410544b2-4001-4271-9855-fec4b6a6442a',
        'Test User',
        'user@nextmail.com',
        ${hash}
      )
    `;
    
    console.log('✅ New user created!');
    
    // Verify
    const result = await sql`SELECT email, password FROM users WHERE email = 'user@nextmail.com'`;
    console.log('Password in DB:', result[0]?.password);
    console.log('Match:', result[0]?.password === hash);
  } catch (error) {
    console.error('Error:', error);
  }
}

fixPassword();