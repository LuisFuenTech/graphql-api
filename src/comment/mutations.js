import { readJsonFile, writeJsonFile } from '../utils';
import { v4 as uuidV4 } from 'uuid';

function createComment(parent, args, ctx, info) {
  const {
    data: { author, text, postId }
  } = args;
  const users = readJsonFile({ fileName: 'users' });
  const posts = readJsonFile({ fileName: 'posts' });
  const comments = readJsonFile({ fileName: 'comments' });

  const userExists = users.some((user) => user.id === author);
  const postExists = posts.some((post) => post.id === postId && post.published);

  if (!userExists || !postExists)
    throw new Error('Unable to find user and post');

  const newComment = {
    id: uuidV4(),
    text,
    author,
    post: postId
  };

  comments.push(newComment);
  writeJsonFile({ fileName: 'comments', data: comments });

  return newComment;
}

export { createComment };
