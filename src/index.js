import { GraphQLServer, PubSub } from 'graphql-yoga';
import { users, posts, comments } from './utils/data';
import {
  Query,
  Mutation,
  User,
  Post,
  Comment,
  Subscription
} from './resolvers';
import path from 'path';

const pubsub = new PubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Post,
  User,
  Comment
};

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, 'typeDefs.graphql'),
  resolvers,
  context: { users, comments, posts, pubsub }
});

server.start(() => {
  console.log('Server is running');
});
