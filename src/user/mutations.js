import { readJsonFile, writeJsonFile } from '../utils';
import { v4 as uuidV4 } from 'uuid';

function createUser(parent, args, ctx, info) {
  const {
    data: { email, name, age }
  } = args;
  const users = readJsonFile({ fileName: 'users' });
  const emailTaken = users.some((user) => user.email === email);

  if (emailTaken) throw new Error('Email taken.');

  const newUser = {
    id: uuidV4(),
    email,
    name,
    age
  };

  users.push(newUser);
  writeJsonFile({ fileName: 'users', data: users });

  return newUser;
}

export { createUser };
