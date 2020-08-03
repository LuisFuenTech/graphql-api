import { GraphQLServer } from 'graphql-yoga';
import * as user from './user';
import * as post from './post';
import * as comment from './comment';
import { users, posts, comments } from './utils/data';

const typeDefs = `
    type Query {
        me: User!
        post: Post!
        ${user.definition.Query}
        ${post.definition.Query}        
        ${comment.definition.Query}        
    }

    type Mutation {
      ${user.definition.createUser}
      ${user.definition.deleteUser}
      ${post.definition.createPost}
      ${post.definition.deletePost}
      ${comment.definition.createComment}
      ${comment.definition.deleteComment}
    }

    input ${user.definition.CreateUserInput}
    input ${post.definition.CreatePostInput}
    input ${comment.definition.CreateCommentInput}

    ${user.definition.schema}
    ${post.definition.schema}   
    ${comment.definition.schema}       
`;

const resolvers = {
  Query: {
    users: user.resolvers.Query,
    me: user.resolvers.me,
    posts: post.resolvers.Query,
    post: post.resolvers.post,
    comments: comment.resolvers.Query
  },
  Mutation: {
    createUser: user.mutations.createUser,
    createPost: post.mutations.createPost,
    createComment: comment.mutations.createComment,
    deleteUser: user.mutations.deleteUser,
    deletePost: post.mutations.deletePost,
    deleteComment: comment.mutations.deleteComment
  },
  Post: post.resolvers.relations,
  User: user.resolvers.relations,
  Comment: comment.resolvers.relations
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { users, comments, posts }
});

server.start(() => {
  console.log('Server is running');
});
