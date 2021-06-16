const getAllAnotherDB = async (ctx: RouterContext) => {
  const AnotherDB = await AnotherDBCollections.find();
  ctx.response.body = AnotherDB;
};
const getAnotherDB = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const AnotherDB = await AnotherDBcollection.findOne({ _id: { $oid: id } });
  ctx.response.body = AnotherDB;
};
const createAnotherDB = async (ctx: RouterContext) => {
  const { username, password } = await ctx.request.body().value;
  const AnotherD: any = {
    username,
    password
  };
  const id = await AnotherDBCollection.insertOne();
  AnotherD._id = id;
  ctx.response.status = 201;
  ctx.response.body = AnotherD;
};
const updateAnotherDB = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const { username, password } = await ctx.request.body().value;
  const { modified } = await AnotherDBCollection.updateOne(
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
    ctx.response.body = { message: "AnotherD not found" };
    return;
  }
  ctx.response.body = await AnotherDBCollection.findOne({ _id: { $oid: id } });
};
const deleteAnotherD = async (ctx: RouterContext) => {
  const id = ctx.params.id;

  const AnotherD = await AnotherDBCollection.deleteOne({ _id: { $oid: id } });

  if (!AnotherD) {
    ctx.response.status = 404;
    ctx.response.body = { message: "AnotherD not found" };
    return;
  }
  ctx.response.status = 204;
};
