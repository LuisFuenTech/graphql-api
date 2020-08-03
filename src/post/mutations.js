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

function deletePost(parent, args, ctx, info) {
  const { id } = args;
  const posts = readJsonFile({ fileName: 'posts' });
  const comments = readJsonFile({ fileName: 'comments' });

  const post = posts.find((post) => post.id === id);

  if (!post) throw new Error('Post not found');

  const newPostList = posts.filter((post) => post.id !== id);
  const newCommentList = comments.filter((comment) => comment.post !== id);

  writeJsonFile({
    fileName: 'comments',
    data: newCommentList
  });

  writeJsonFile({
    fileName: 'posts',
    data: newPostList
  });

  return post;
}

export { createPost, deletePost };
