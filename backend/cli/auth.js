import inquirer from 'inquirer';
import dotenv from 'dotenv';
dotenv.config();

export const requireLogin = async () => {
  const { password } = await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: '🔐 Enter FAFI CLI password:',
      mask: '*',
    },
  ]);

  const VALID = password === process.env.FAFI_PASSWORD;

  if (!VALID) {
    console.log('❌ Incorrect password. Access denied.');
    process.exit(1);
  }

  console.log('✅ Access granted.\n');
};
