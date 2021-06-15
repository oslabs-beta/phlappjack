import { Router } from '../deps.ts';
import { users } from '../models/users.ts';
import { users2 } from '../models/users2.ts';

const router = new Router()
router
	.get('/users', async (ctx) => {
      	const users_findAll = await users.find({ 
      		_id: { $ne: null } 
      	}).toArray();
      	ctx.response.body = users_findAll;
    })
	.post('/users', async (ctx) => {
    	const body = await ctx.request.body()
    	const value = body.value;
    	const users_insertOne = await users.insert(value);
    	ctx.response.body = users_insertOne;
    })
	.get('/users', async (ctx) => {
      	const users_findAll = await users.find({ 
      		_id: { $ne: null } 
      	}).toArray();
      	ctx.response.body = users_findAll;
    })
	.get('/users2:password2', async (ctx) => {
    	if(ctx.params && ctx.params.id){
    		const users2_findOne = await users2.findOne({ 
    			 _id:ctx.params.id
    		});
    		ctx.response.body = users2_findOne;
    	}
  });

export { router };