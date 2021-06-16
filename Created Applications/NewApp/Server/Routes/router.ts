import { Bson, Router, helpers } from "../deps.ts";
import { toDos } from "../Models/toDos.ts";

const router = new Router();
router
  .get("/toDos:id", async ctx => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    if (id) {
      const toDos_findOne = await toDos.findOne(
        { _id: new Bson.ObjectId(String(id)) },
        { noCursorTimeout: false }
      );
      ctx.response.body = toDos_findOne;
    }
  })
  .delete("/toDos:isCompleted", async ctx => {
    const { isCompleted } = helpers.getQuery(ctx, { mergeParams: true });
    if (isCompleted) {
      const toDos_deleteMany = await toDos.deleteMany({
        isCompleted: ctx.params.isCompleted
      });
      ctx.response.body = toDos_deleteMany;
    }
  })
  .delete("/toDos:id", async ctx => {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    if (id) {
      const toDos_deleteOne = await toDos.deleteOne({
        _id: new Bson.ObjectId(id)
      });
      ctx.response.body = toDos_deleteOne;
    }
  })
  .get("/toDos", async ctx => {
    const toDos_findAll = await toDos
      .find({ _id: { $ne: null } }, { noCursorTimeout: false })
      .toArray();
    ctx.response.body = toDos_findAll;
  });
export { router };
