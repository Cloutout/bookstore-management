import * as bcrypt from 'bcrypt';

// ** Add role to the user seed ** //
export const usersSeed = [
  {
    name: 'Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('password', 10),
    role: 'admin',
  },
  {
    name: 'User',
    email: 'user@example.com',
    password: bcrypt.hashSync('password', 10),
    role: 'user',
  },
  {
    name: 'Manager',
    email: 'manager@example.com',
    password: bcrypt.hashSync('password', 10),
    role: 'manager',
  },
];
