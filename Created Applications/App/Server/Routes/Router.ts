import { Bson, Router, helpers } from '../deps.ts';
import { AnotherDB } from '../models/AnotherDB.ts';

const router = new Router()
router
	.get('/AnotherDB', async (ctx) => {
      	const AnotherDB_findAll = await AnotherDB.find({ 
      		_id: { $ne: null } 
      	}).toArray();
      	ctx.response.body = AnotherDB_findAll;
    })
	.get('/AnotherDB:passsword', async (ctx) => {
    	if(ctx.params && ctx.params.id){
    		const AnotherDB_findOne = await AnotherDB.findOne({ 
    			 _id:ctx.params.id
    		});
    		ctx.response.body = AnotherDB_findOne;
    	}
  })
	.put('/AnotherDB:passsword', async (ctx) => {
      	if(ctx.params && ctx.params.id && ctx.params.passsword){
      		const AnotherDB_updateMany = await AnotherDB.updateMany(
      			{passsword:{ $ne:ctx.params.passsword}},
      			{passsword:ctx.params.passsword}
      		);
      		ctx.response.body = AnotherDB_updateMany;
      	}
    })
	.patch('/AnotherDB:passsword', async (ctx) => {
      	if(ctx.params && ctx.params.id && ctx.params.passsword){
      		const AnotherDB_updateOne = await AnotherDB.updateOne(
      			{_id:ctx.params.id},
      			{passsword:ctx.params.passsword}
      		);
      	ctx.response.body = AnotherDB_updateOne;
      	}
    })
	.post('/AnotherDB', async (ctx) => {
    	const body = await ctx.request.body()
    	const value = await body.value;
    	const AnotherDB_insertOne = await AnotherDB.insert(value);
    	ctx.response.body = AnotherDB_insertOne;
    })
	.delete('/AnotherDB', async (ctx) => {
      const { id } = helpers.getQuery(ctx, {mergeParams: true });
      if( id ){
      	const AnotherDB_deleteOne = await AnotherDB.deleteOne({
      		_id: new Bson.ObjectId(id)
      	});
      	ctx.response.body = AnotherDB_deleteOne;
      }
    })
	.delete('/AnotherDB:passsword', async (ctx) => {
      const { passsword } = helpers.getQuery(ctx, {mergeParams: true });
      if( passsword ){
      	const AnotherDB_deleteMany = await AnotherDB.deleteMany({
      		passsword:ctx.params.passsword
      	});
      	ctx.response.body = AnotherDB_deleteMany;
      }
    });

export { router };