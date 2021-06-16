import { Router } from '../deps.ts';
            import { Posts } from '../Models/Posts.ts';
import { Users } from '../Models/Users.ts';

            const router = new Router()
            router
	.post('/Posts', async (ctx) => {
    	const body = await ctx.request.body()
    	const value = body.value;
    	const Posts_insertOne = await Posts.insert(value);
    	ctx.response.body = Posts_insertOne;
    })
	.get('/Posts', async (ctx) => {
      	const Posts_findAll = await Posts.find({ 
      		_id: { $ne: null } 
      	}).toArray();
      	ctx.response.body = Posts_findAll;
    })
	.delete('/Posts', async (ctx) => {
      	if(ctx.params && ctx.params.id){
      		const Posts_deleteMany = await Posts.deleteMany({
      			undefined:{ $ne:ctx.params.undefined}
      		},
      		{
      			undefined:ctx.params.undefined
      		});
      		ctx.response.body = Posts_deleteMany;
      	}
    })
	.put('/Posts:comments', async (ctx) => {
      	if(ctx.params && ctx.params.id && ctx.params.comments){
      		const Posts_updateMany = await Posts.updateMany(
      			{comments:{ $ne:ctx.params.comments}},
      			{comments:ctx.params.comments}
      		);
      		ctx.response.body = Posts_updateMany;
      	}
    })
	.patch('/Posts:title', async (ctx) => {
      	if(ctx.params && ctx.params.id && ctx.params.title){
      		const Posts_updateOne = await Posts.updateOne(
      			{_id:ctx.params.id},
      			{title:ctx.params.title}
      		);
      	}
      	ctx.response.body = Posts_updateOne;
      	}
    })
	.put('/Users:password', async (ctx) => {
      	if(ctx.params && ctx.params.id && ctx.params.password){
      		const Users_updateMany = await Users.updateMany(
      			{password:{ $ne:ctx.params.password}},
      			{password:ctx.params.password}
      		);
      		ctx.response.body = Users_updateMany;
      	}
    });

export { router };