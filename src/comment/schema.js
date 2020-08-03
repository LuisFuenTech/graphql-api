const schema = `
type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

const Query = 'comments(query: String): [Comment!]!';
const createComment = 'createComment(data: CreateCommentInput): Comment!';
const deleteComment = 'deleteComment(id: ID!): Comment!';
const CreateCommentInput = `
  CreateCommentInput {
    text: String!
    author: ID!
    postId: ID!
  }
`;

export { schema, Query, createComment, CreateCommentInput, deleteComment };
