import { Router } from '../deps.ts';
import { AnotherDB } from '../models/AnotherDB.ts';

const router = new Router()
router
	.get('/AnotherDB', async (ctx) => {
      	const AnotherDB_findAll = await AnotherDB.find({ 
      		_id: { $ne: null } 
      	}).toArray();
      	ctx.response.body = AnotherDB_findAll;
    })
	.delete('/AnotherDB:password', async (ctx) => {
      	if(ctx.params && ctx.params.id){
      		const AnotherDB_deleteMany = await AnotherDB.deleteMany({
      			_id: ctx.params.id 
      		});
      		ctx.response.body = AnotherDB_deleteMany;
      	}
    })
	.post('/AnotherDB', async (ctx) => {
    	const body = await ctx.request.body()
    	const value = body.value;
    	const AnotherDB_insertOne = await AnotherDB.insert(value);
    	ctx.response.body = AnotherDB_insertOne;
    })
	.delete('/AnotherDB:password', async (ctx) => {
      	if(ctx.params && ctx.params.id){
      		const AnotherDB_deleteMany = await AnotherDB.deleteMany({
      			_id: ctx.params.id 
      		});
      		ctx.response.body = AnotherDB_deleteMany;
      	}
    })
	.get('/AnotherDB:password', async (ctx) => {
    	if(ctx.params && ctx.params.id){
    		const AnotherDB_findOne = await AnotherDB.findOne({ 
    			 _id:ctx.params.id
    		});
    		ctx.response.body = AnotherDB_findOne;
    	}
  })
	.patch('/AnotherDB:password', async (ctx) => {
      	if(ctx.params && ctx.params.id && ctx.params.password){
      		const AnotherDB_updateOne = await AnotherDB.updateOne(
      			{_id:ctx.params.id},
      			{password:ctx.params.password}
      		);
      	}
      	ctx.response.body = AnotherDB_updateOne;
      	}
    })
	.put('/AnotherDB:password', async (ctx) => {
      	if(ctx.params && ctx.params.id && ctx.params.password){
      		const AnotherDB_updateMany = await AnotherDB.updateMany(
      			{password:{ $ne:ctx.params.password}},
      			{password:ctx.params.password}
      		);
      		ctx.response.body = AnotherDB_updateMany;
      	}
    });

export { router };