import { Bson, Router, helpers } from '../deps.ts';
import { Posts } from '../Models/Posts.ts';
import { Users } from '../Models/Users.ts';
import { RouterContext, Context } from "https://deno.land/x/oak@v6.2.0/mod.ts";

        const router = new Router()
        router
	.delete('/Posts', async (ctx) => {
      const { id } = helpers.getQuery(ctx, {mergeParams: true });
      if( id ){
      	const Posts_deleteOne = await Posts.deleteOne({
      		_id: new Bson.ObjectId(id)
      	});
      	ctx.response.body = Posts_deleteOne;
      }
    })
	.get('/Posts', async (ctx) => {
    console.log("here")

    // ctx.response.body = await Posts.find({})
      const Posts_findAll = await Posts.findAll(
        {}
      )
      ctx.response.body = Posts_findAll;
      console.log(ctx.response.body)
    })
	.post('/Posts', async (ctx) => {
    const body = await ctx.request.body()
    const value = await body.value;
    const Posts_insertOne = await Posts.insert(value);
    ctx.response.body = Posts_insertOne;
    })
	.get('/Users:password', async (ctx) => {
    if(ctx.params && ctx.params.id){
    	const Users_findOne = await Users.findOne({ 
    		 _id:ctx.params.id
    	});
    	ctx.response.body = Users_findOne;
    }
  })
	.delete('/Posts:title', async (ctx) => {
      const { title } = helpers.getQuery(ctx, {mergeParams: true });
      if( title ){
      	const Posts_deleteMany = await Posts.deleteMany({
      		title:ctx.params.title
      	});
      	ctx.response.body = Posts_deleteMany;
      }
    })
	.put('/Posts:title', async (ctx) => {
      const { title } = helpers.getQuery(ctx, {mergeParams: true });
      if(title){
        console.log('test', title )
      	const Posts_updateMany = await Posts.updateMany(
      		{title:{ $ne: null}},
      		{$set: { title: title } },
      	);
      	ctx.response.body = Posts_updateMany;
      }
    });

export { router };