import { writeJsonFile } from '../utils';
import { v4 as uuidV4 } from 'uuid';

function createComment(parent, args, { users, comments, posts }, info) {
  const {
    data: { author, text, postId }
  } = args;

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

function deleteComment(parent, args, { comments }, info) {
  const { id } = args;

  const comment = comments.find((comment) => comment.id === id);

  if (!comment) throw new Error('Commet not found');

  const newCommentList = comments.filter((comment) => comment.id !== id);

  writeJsonFile({
    fileName: 'comments',
    data: newCommentList
  });

  return comment;
}

export { createComment, deleteComment };
