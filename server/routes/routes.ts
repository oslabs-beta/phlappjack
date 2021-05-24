import { RouterContext } from 'https://deno.land/x/oak/mod.ts'
import db from '../models/mongoDB.ts';

const notesCollection = db.collection("notes");

const getNotes = async (ctx: RouterContext) => {
  // Get Notes from MongoDB
  const notes = await notesCollection.find();

  // Return output
  ctx.response.body = notes;
};

const getSingleNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  // Get single note
  const note = await notesCollection.findOne({ _id: { $oid: id } });

  // Return output
  ctx.response.body = note;
};

const createNote = async (ctx: RouterContext) => {
  // Get title and body from request
  const { value: {title, body} } = await ctx.request.body();
  // Create Note object
  const note: any = {
    title,
    body,
    date: new Date(),
  };
  // Insert Note in MongoDB
  const id = await notesCollection.insertOne(note);

  note._id = id;
  // Return with success response
  ctx.response.status = 201;
  ctx.response.body = note;
};

const updateNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  // Get title and body from request
  const { value: {title, body} } = await ctx.request.body();

  const { modifiedCount } = await notesCollection.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        title,
        body,
      },
    },
  );

  if (!modifiedCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Note does not exist" };
    return;
  }

  ctx.response.body = await notesCollection.findOne({ _id: { $oid: id } });
};

const deleteNote = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const count = await notesCollection.deleteOne({ _id: { $oid: id } });
  if (!count) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Note does not exist" };
    return;
  }

  ctx.response.status = 204;
};
