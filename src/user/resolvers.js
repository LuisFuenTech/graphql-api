import { readJsonFile } from '../utils';

const users = readJsonFile({ fileName: 'users' });
const posts = readJsonFile({ fileName: 'posts' });
const comments = readJsonFile({ fileName: 'comments' });

function Query(parent, args, ctx, info) {
  const { query } = args;
  if (!query) return users;

  return users.filter((user) => {
    return user.name.toLowerCase().includes(query.toLowerCase());
  });
}

const relations = {
  posts(parent, args, ctx, info) {
    return posts.filter((post) => post.author === parent.id);
  },
  comments(parent, args, ctx, info) {
    return comments.filter((comment) => comment.author === parent.id);
  }
};

function me() {
  return users.find((user) =>
    user.name.toLowerCase().includes('luis fuentes'.toLowerCase())
  );
}

export { Query, relations, me };
