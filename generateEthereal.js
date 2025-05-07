// generateEthereal.js
const nodemailer = require('nodemailer');

async function createTestAccount() {
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('✅ Ethereal test account created:\n');
    console.log('SMTP credentials:');
    console.log(`  user: ${testAccount.user}`);
    console.log(`  pass: ${testAccount.pass}`);
    console.log('\nPaste this in your .env.local:\n');
    console.log(`EMAIL_SERVER=smtp://${testAccount.user}:${testAccount.pass}@smtp.ethereal.email:587`);
    console.log(`EMAIL_FROM="BaseType <${testAccount.user}>"`);
  } catch (err) {
    console.error('❌ Failed to create Ethereal account:', err);
  }
}

createTestAccount();
