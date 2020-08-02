import { readJsonFile } from '../utils';

const users = readJsonFile({ fileName: 'users' });
const posts = readJsonFile({ fileName: 'posts' });
const comments = readJsonFile({ fileName: 'comments' });

function Query(parent, args, ctx, info) {
  const { query } = args;
  if (!query) return posts;

  return posts.filter((post) => {
    const isTitleMatch = post.title.toLowerCase().includes(query.toLowerCase());
    const isBodyMatch = post.body.toLowerCase().includes(query.toLowerCase());
    return isTitleMatch || isBodyMatch;
  });
}

const relations = {
  author(parent, args, ctx, info) {
    return users.find((user) => user.id === parent.author);
  },
  comments(parent, args, ctx, info) {
    return comments.filter((comment) => comment.post === parent.id);
  }
};

function post(parent, args, ctx, info) {
  const { query } = args;
  if (!query) return posts[0];
}

export { Query, relations, post };
