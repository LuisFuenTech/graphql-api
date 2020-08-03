import { GraphQLServer } from 'graphql-yoga';
import { users, posts, comments } from './utils/data';
import { Query, Mutation, User, Post, Comment } from './resolvers';
import path from 'path';

const resolvers = {
  Query,
  Mutation,
  Post,
  User,
  Comment
};

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, 'typeDefs.graphql'),
  resolvers,
  context: { users, comments, posts }
});

server.start(() => {
  console.log('Server is running');
});
