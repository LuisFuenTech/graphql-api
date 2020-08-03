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
};

export { Mutation as default };