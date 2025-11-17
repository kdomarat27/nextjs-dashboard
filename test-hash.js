const bcrypt = require('bcryptjs');

const password = '123456';
const hashFromDatabase = '$2b$10$jZdMoOVuQnKQk.b207aC0OniB9fIeejr/DH/kpKtfzE4EIqu8u4Da';

bcrypt.compare(password, hashFromDatabase).then(match => {
  console.log('Password "123456" matches the hash:', match);
  
  if (match) {
    console.log('✅ Credentials are VALID!');
    console.log('Email: user@nextmail.com');
    console.log('Password: 123456');
  } else {
    console.log('❌ Credentials DO NOT match!');
  }
});