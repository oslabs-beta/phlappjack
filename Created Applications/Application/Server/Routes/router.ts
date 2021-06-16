import { Bson, Router, helpers } from "../deps.ts";
import { accounts } from "../Models/accounts.ts";

const router = new Router();
router
  .get("/accounts", async ctx => {
    const accounts_findAll = await accounts
      .find({ _id: { $ne: null } }, { noCursorTimeout: false })
      .toArray();
    ctx.response.body = accounts_findAll;
  })
  .get("/accounts:id", async ctx => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    if (id) {
      const accounts_findOne = await accounts.findOne(
        { _id: new Bson.ObjectId(String(id)) },
        { noCursorTimeout: false }
      );
      ctx.response.body = accounts_findOne;
    }
  })
  .post("/accounts", async ctx => {
    const body = await ctx.request.body();
    const value = await body.value;
    const accounts_insertOne = await accounts.insert(value);
    ctx.response.body = accounts_insertOne;
  })
  .patch("/accounts:limit", async ctx => {
    const { id, limit } = helpers.getQuery(ctx, { mergeParams: true });
    if (id && limit) {
      const accounts_updateOne = await accounts.updateOne(
        { _id: new Bson.ObjectId(id) },
        { $set: { limit: limit } }
      );
      ctx.response.body = accounts_updateOne;
    }
  })
  .put("/accounts:limit", async ctx => {
    const { limit } = helpers.getQuery(ctx, { mergeParams: true });
    if (limit) {
      const accounts_updateMany = await accounts.updateMany(
        { limit: { $ne: null } },
        { $set: { limit: limit } }
      );
      ctx.response.body = accounts_updateMany;
    }
  })
  .delete("/accounts:id", async ctx => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    if (id) {
      const accounts_deleteOne = await accounts.deleteOne({
        _id: new Bson.ObjectId(id)
      });
      ctx.response.body = accounts_deleteOne;
    }
  })
  .delete("/accounts:limit", async ctx => {
    const { limit } = helpers.getQuery(ctx, { mergeParams: true });
    if (limit) {
      const accounts_deleteMany = await accounts.deleteMany({
        limit: ctx.params.limit
      });
      ctx.response.body = accounts_deleteMany;
    }
  });
export { router };
