import * as user from '../user';
import * as post from '../post';
import * as comment from '../comment';

const Mutation = {
  createUser: user.mutations.createUser,
  createPost: post.mutations.createPost,
  createComment: comment.mutations.createComment,
  deleteUser: user.mutations.deleteUser,
  deletePost: post.mutations.deletePost,
  deleteComment: comment.mutations.deleteComment,
  updateUser: user.mutations.updateUser,
  updatePost: post.mutations.updatePost,
  updateComment: comment.mutations.updateComment,
};

export { Mutation as default };
