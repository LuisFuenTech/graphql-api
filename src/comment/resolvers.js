import { readJsonFile } from '../utils';

const users = readJsonFile({ fileName: 'users' });
const posts = readJsonFile({ fileName: 'posts' });
const comments = readJsonFile({ fileName: 'comments' });

function Query(parent, args, ctx, info) {
  const { query } = args;
  if (!query) return comments;

  return comments.filter((comment) => {
    const isTextMatch = comment.text
      .toLowerCase()
      .includes(query.toLowerCase());
    return isTextMatch;
  });
}

const relations = {
  author(parent, args, ctx, info) {
    return users.find((user) => user.id === parent.author);
  },
  post(parent, args, ctx, info) {
    return posts.find((post) => post.id === parent.post);
  }
};

export { Query, relations };
