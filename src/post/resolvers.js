function Query(parent, args, { posts }, info) {
  const { query } = args;
  if (!query) return posts;

  return posts.filter((post) => {
    const isTitleMatch = post.title.toLowerCase().includes(query.toLowerCase());
    const isBodyMatch = post.body.toLowerCase().includes(query.toLowerCase());
    return isTitleMatch || isBodyMatch;
  });
}

const relations = {
  author(parent, args, { users }, info) {
    return users.find((user) => user.id === parent.author);
  },
  comments(parent, args, { comments }, info) {
    return comments.filter((comment) => comment.post === parent.id);
  }
};

function post(parent, args, { posts }, info) {
  const { query } = args;
  if (!query) return posts[0];
}

export { Query, relations, post };
