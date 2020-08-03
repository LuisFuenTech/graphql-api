import { writeJsonFile } from '../utils';
import { v4 as uuidV4 } from 'uuid';

function createUser(parent, args, { users }, info) {
  const {
    data: { email, name, age }
  } = args;
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

function deleteUser(parent, args, { users, comments, posts }, info) {
  const { id } = args;
  const user = users.find((user) => user.id === id);

  if (!user) throw new Error('User not found');

  const newUserList = users.filter((user) => user.id !== id);
  const newPostList = posts.filter((post) => post.author !== id);
  const postIdListToDelete = posts.map((post) =>
    post.author === id ? post.id : undefined
  );
  const newCommentList = comments.filter(
    (comment) =>
      !postIdListToDelete.includes(comment.post) && comment.author !== id
  );

  writeJsonFile({
    fileName: 'users',
    data: newUserList
  });

  writeJsonFile({
    fileName: 'comments',
    data: newCommentList
  });

  writeJsonFile({
    fileName: 'posts',
    data: newPostList
  });

  return user;
}

export { createUser, deleteUser };
