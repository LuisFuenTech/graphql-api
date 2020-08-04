import { writeJsonFile } from '../utils';
import { v4 as uuidV4 } from 'uuid';

function createComment(parent, args, { users, comments, posts, pubsub }, info) {
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
  console.log("createComment -> newComment", newComment)
  writeJsonFile({ fileName: 'comments', data: comments });

  pubsub.publish(`commet:${postId}`, { comment: newComment });

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

function updateComment(parent, args, { comments }, info) {
  let commentIndex;
  const {
    id,
    data: { text }
  } = args;

  let comment = comments.find((comment, index) => {
    if (comment.id === id) {
      commentIndex = index;

      return true;
    }
  });

  if (!comment) throw new Error('Comment not found');

  comment.text = text || comment.text;
  comments[commentIndex] = comment;

  writeJsonFile({
    fileName: 'comments',
    data: comments
  });

  return comment;
}

export { createComment, deleteComment, updateComment };
