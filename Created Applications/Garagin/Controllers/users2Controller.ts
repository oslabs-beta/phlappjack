const getAllusers2 = async (ctx: RouterContext) => {
  const users2 = await users2Collections.find();
  ctx.response.body = users2;
};
const getusers2 = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const users2 = await users2collection.findOne({ _id: { $oid: id } });
  ctx.response.body = users2;
};
const createusers2 = async (ctx: RouterContext) => {
  const { usersName2, password2 } = await ctx.request.body().value;
  const users: any = {
    usersName2,
    password2
  };
  const id = await users2Collection.insertOne();
  users._id = id;
  ctx.response.status = 201;
  ctx.response.body = users;
};
const updateusers2 = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const { usersName2, password2 } = await ctx.request.body().value;
  const { modified } = await users2Collection.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        usersName2,
        password2
      }
    }
  );
  if (!modified) {
    ctx.response.status = 404;
    ctx.response.body = { message: "users not found" };
    return;
  }
  ctx.response.body = await users2Collection.findOne({ _id: { $oid: id } });
};
const deleteusers = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const users = await users2Collection.deleteOne({ _id: { $oid: id } });

  if (!users) {
    ctx.response.status = 404;
    ctx.response.body = { message: "users not found" };
    return;
  }
  ctx.response.status = 204;
};
