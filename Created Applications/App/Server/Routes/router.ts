import { Bson, Router, helpers } from '../deps.ts';
import { sample_analytics } from '../Models/sample_analytics.ts';

const router = new Router()
router
	.get('/sample_analytics', async (ctx) => {
  const testDB_findAll = await testDB.find( 
  	{_id: { $ne: null }},
  	{noCursorTimeOut: false}
  ).toArray();
  ctx.response.body = testDB_findAll;
})
	.get('/sample_analytics:id', async (ctx) => {
    if(ctx.params && ctx.params.id){
    	const testDB_findOne = await testDB.findOne({ 
    		 _id:ctx.params.id
    	});
    	ctx.response.body = testDB_findOne;
    }
  })
	.post('/sample_analytics', async (ctx) => {
    const body = await ctx.request.body()
    const value = await body.value;
    const testDB_insertOne = await testDB.insert(value);
    ctx.response.body = testDB_insertOne;
    })
	.patch('/sample_analytics:username', async (ctx) => {
      const { id, username } = helpers.getQuery(ctx, {mergeParams: true });
      if(id && username){
      	const testDB_updateOne = await testDB.updateOne(
      		{_id:ctx.params.id},
      		{username:ctx.params.username}
      	);
      ctx.response.body = testDB_updateOne;
      }
    });

export { router };