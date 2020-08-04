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

  if (published)
    pubsub.publish('post', {
      post: {
        mutation: 'CREATED',
        data: newPost
      }
    });

  return newPost;
}

function deletePost(parent, args, { posts, comments, pubsub }, info) {
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

  if (post.published) {
    pubsub.publish('post', {
      post: {
        mutation: 'DELETED',
        data: post
      }
    });
  }

  return post;
}

function updatePost(parent, args, { posts, pubsub }, info) {
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

  console.log('updatePost -> post', post);

  if (!post) throw new Error('Post not found');

  const originalPost = { ...post };
  const titleTaken = posts.some((post) => post.title === title);
  if (titleTaken) throw new Error('Title taken');

  post.title = title || post.title;
  post.body = body || post.body;
  post.published = typeof published === 'boolean' ? published : post.published;
  posts[postIndex] = post;

  writeJsonFile({
    fileName: 'posts',
    data: posts
  });

  if (originalPost.published && !published) {
    pubsub.publish('post', {
      post: {
        mutation: 'DELETED',
        data: originalPost
      }
    });
  } else if (!originalPost.published && published) {
    pubsub.publish('post', {
      post: {
        mutation: 'CREATED',
        data: post
      }
    });
  } else if (post.published) {
    pubsub.publish('post', {
      post: {
        mutation: 'UPDATED',
        data: post
      }
    });
  }

  return post;
}

export { createPost, deletePost, updatePost };
