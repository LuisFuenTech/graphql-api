import * as user from '../user';
import * as post from '../post';
import * as comment from '../comment';

const Query = {
  users: user.resolvers.Query,
  me: user.resolvers.me,
  posts: post.resolvers.Query,
  post: post.resolvers.post,
  comments: comment.resolvers.Query
};

export { Query as default };
