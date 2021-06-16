

const getAllPosts = async (ctx: RouterContext) => {
  const Posts = await PostsCollections.find();
  ctx.response.body = Posts;
};
const getPosts = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const Posts = await Postscollection.findOne({ _id: { $oid: id } });
  ctx.response.body = Posts;
};
const createPosts = async (ctx: RouterContext) => {
  const { image, title, comments } = await ctx.request.body().value;
  const Post: any = {
    image,
    title,
    comments
  };
  const id = await PostsCollection.insertOne();
  Post._id = id;
  ctx.response.status = 201;
  ctx.response.body = Post;
};
const updatePosts = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const { image, title, comments } = await ctx.request.body().value;
  const { modified } = await PostsCollection.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        image,
        title,
        comments
      }
    }
  );
  if (!modified) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Post not found" };
    return;
  }
  ctx.response.body = await PostsCollection.findOne({ _id: { $oid: id } });
};
const deletePost = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const Post = await PostsCollection.deleteOne({ _id: { $oid: id } });

  if (!Post) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Post not found" };
    return;
  }
  ctx.response.status = 204;
};
