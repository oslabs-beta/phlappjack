import { Router } from '../deps.ts';
import { users } from '../models/users.ts';

const router = new Router()
router
	.get('/users:passsword', async (ctx) => {
    	if(ctx.params && ctx.params.id){
    		const users_findOne = await users.findOne({ 
    			 _id:ctx.params.id
    		});
    		ctx.response.body = users_findOne;
    	}
  })
	.get('/users', async (ctx) => {
      	const users_findAll = await users.find({ 
      		_id: { $ne: null } 
      	}).toArray();
      	ctx.response.body = users_findAll;
    })
	.post('/users', async (ctx) => {
    	const body = await ctx.request.body()
    	const value = await body.value;
    	const users_insertOne = await users.insert(value);
    	ctx.response.body = users_insertOne;
    })
	.get('/users:passsword', async (ctx) => {
    	if(ctx.params && ctx.params.id){
    		const users_findOne = await users.findOne({ 
    			 _id:ctx.params.id
    		});
    		ctx.response.body = users_findOne;
    	}
  })
	.get('/users:username', async (ctx) => {
    	if(ctx.params && ctx.params.id){
    		const users_findOne = await users.findOne({ 
    			 _id:ctx.params.id
    		});
    		ctx.response.body = users_findOne;
    	}
  });

export { router };