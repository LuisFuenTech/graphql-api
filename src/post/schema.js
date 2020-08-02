const schema = `
type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
`;

const Query = 'posts(query: String): [Post!]!';
const createPost = 'createPost(data: CreatePostInput): Post!';
const CreatePostInput = `
  CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }
`;

export { schema, Query, createPost, CreatePostInput };
