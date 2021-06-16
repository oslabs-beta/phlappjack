const getAllUsers = async (ctx: RouterContext) => {
  const Users = await Users.find();
  ctx.response.body = Users;
};
const getUsers = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const Users = await Users.findOne({ _id: { $oid: id } });
  ctx.response.body = Users;
};
const createUsers = async (ctx: RouterContext) => {
  const { username, password } = await ctx.request.body().value;
  const User: any = {
    username,
    password
  };
  const id = await Users.insertOne();
  User._id = id;
  ctx.response.status = 201;
  ctx.response.body = User;
};
const updateUsers = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const { username, password } = await ctx.request.body().value;
  const { modified } = await Users.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        username,
        password
      }
    }
  );
  if (!modified) {
    ctx.response.status = 404;
    ctx.response.body = { message: "User not found" };
    return;
  }
  ctx.response.body = await Users.findOne({ _id: { $oid: id } });
};
const deleteUser = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const User = await Users.deleteOne({ _id: { $oid: id } });

  if (!User) {
    ctx.response.status = 404;
    ctx.response.body = { message: "User not found" };
    return;
  }
  ctx.response.status = 204;
};
