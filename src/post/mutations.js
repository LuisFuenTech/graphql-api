import { readJsonFile, writeJsonFile } from '../utils';
import { v4 as uuidV4 } from 'uuid';

function createPost(parent, args, ctx, info) {
  const {
    data: { title, body, published, author }
  } = args;
  const posts = readJsonFile({ fileName: 'posts' });
  const users = readJsonFile({ fileName: 'users' });

  const userExists = users.some((user) => user.id === author);

  if (!userExists) throw new Error('User not found.');

  const newPost = {
    id: uuidV4(),
    title,
    body,
    published,
    author
  };

  posts.push(newPost);
  writeJsonFile({ fileName: 'posts', data: posts });

  return newPost;
}

export { createPost };
