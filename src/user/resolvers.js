function Query(parent, args, { users }, info) {
  const { query } = args;
  if (!query) return users;

  return users.filter((user) => {
    return user.name.toLowerCase().includes(query.toLowerCase());
  });
}

const relations = {
  posts(parent, args, { posts }, info) {
    return posts.filter((post) => post.author === parent.id);
  },
  comments(parent, args, { comments }, info) {
    return comments.filter((comment) => comment.author === parent.id);
  }
};

function me(parent, args, { users }, info) {
  return users.find((user) =>
    user.name.toLowerCase().includes('luis fuentes'.toLowerCase())
  );
}

export { Query, relations, me };
