const Subscription = {
  comment: {
    subscribe(parent, args, { pubsub, posts }, info) {
      const { postId } = args;

      const post = posts.find((post) => post.id === postId && post.published);

      if (!post) throw new Error('Post not found');

      return pubsub.asyncIterator(`commet:${postId}`);
    }
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator(`post`);
    }
  }
};

export { Subscription as default };
