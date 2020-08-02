const schema = `
type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
`;

const Query = 'users(query: String): [User!]!';
const createUser = 'createUser(data: CreateUserInput): User!';
const CreateUserInput = `
  CreateUserInput {
    name: String!
    email: String!
    age: Int
  }
`;

export { schema, Query, createUser, CreateUserInput };
