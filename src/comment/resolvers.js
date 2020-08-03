function Query(parent, args, { comments }, info) {
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
  author(parent, args, { users }, info) {
    return users.find((user) => user.id === parent.author);
  },
  post(parent, args, { posts }, info) {
    return posts.find((post) => post.id === parent.post);
  }
};

export { Query, relations };
