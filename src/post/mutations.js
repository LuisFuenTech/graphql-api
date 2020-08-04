import { writeJsonFile } from '../utils';
import { v4 as uuidV4 } from 'uuid';

function createPost(parent, args, { users, posts, pubsub }, info) {
  const {
    data: { title, body, published, author }
  } = args;

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

  if (published) pubsub.publish('post', { post: newPost });

  return newPost;
}

function deletePost(parent, args, { posts, comments }, info) {
  const { id } = args;

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

function updatePost(parent, args, { posts }, info) {
  let postIndex;
  const {
    id,
    data: { title, body, published }
  } = args;

  let post = posts.find((post, index) => {
    if (post.id === id) {
      postIndex = index;

      return true;
    }
  });

  if (!post) throw new Error('Post not found');

  const titleTaken = posts.some((post) => post.title === title);
  if (titleTaken) throw new Error('Title taken');

  post.title = title || post.title;
  post.body = body || post.body;
  post.published = published || post.published;
  posts[postIndex] = post;

  writeJsonFile({
    fileName: 'posts',
    data: posts
  });

  return post;
}

export { createPost, deletePost, updatePost };
