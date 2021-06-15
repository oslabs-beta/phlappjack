const getAllusers = async (ctx: RouterContext) => {
  const users = await usersCollections.find();
  ctx.response.body = users;
};
const getusers = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const users = await userscollection.findOne({ _id: { $oid: id } });
  ctx.response.body = users;
};
const createusers = async (ctx: RouterContext) => {
  const { username, passsword } = await ctx.request.body().value;
  const user: any = {
    username,
    passsword
  };
  const id = await usersCollection.insertOne();
  user._id = id;
  ctx.response.status = 201;
  ctx.response.body = user;
};
const updateusers = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const { username, passsword } = await ctx.request.body().value;
  const { modified } = await usersCollection.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        username,
        passsword
      }
    }
  );
  if (!modified) {
    ctx.response.status = 404;
    ctx.response.body = { message: "user not found" };
    return;
  }
  ctx.response.body = await usersCollection.findOne({ _id: { $oid: id } });
};
const deleteuser = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const user = await usersCollection.deleteOne({ _id: { $oid: id } });

  if (!user) {
    ctx.response.status = 404;
    ctx.response.body = { message: "user not found" };
    return;
  }
  ctx.response.status = 204;
};
