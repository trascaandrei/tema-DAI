import { v4 as uuid } from 'uuid';

export const users = [
  {
    id: uuid(),
    username: 'test',
    email: 'test@test.com',
    confirmed: false
  },
  {
    id: uuid(),
    username: 'test2',
    email: 'test2@test.com',
    confirmed: false
  },
  {
    id: uuid(),
    username: 'test3',
    email: 'test3@test.com',
    confirmed: true
  },
  {
    id: uuid(),
    username: 'test4',
    email: 'test4@test.com',
    confirmed: true
  },
];
