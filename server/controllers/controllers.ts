//connect Mongo to store user's state
import { MongoClient } from "https://deno.land/x/mongo@v0.22.0/mod.ts";
const URI = "mongodb://127.0.0.1:27017";

// Mongo Connection Init
const client = new MongoClient();
try {
  await client.connect(URI);
  console.log("Database successfully connected");
} catch (err) {
  console.log(err);
}

const db = client.database("quotesApp"); 
const quotes = db.collection<Quote>("quotes");

interface Quote {
    _id: { $oid: string };
    quote: string;
    quoteID: string;
    author: string;
  }

// DESC: ADD single quote
// METHOD: POST /api/quote
const addQuote = async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    try {
      // If the request has no Body, it will return a 404
      if (!request.hasBody) { 
        response.status = 400;
        response.body = {
          success: false,
          msg: "No Data",
        };
      } else {
        // Otherwise, it will try to insert 
        // a quote in the DB and respond with 201
        const body = await request.body();
        const quote = await body.value;
        await quotes.insertOne(quote);
        response.status = 201;
        response.body = {
          success: true,
          data: quote,
        };
      }
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

// DESC: GET single quote
// METHOD: GET /api/quote/:id
const getQuote = async ({
    params,
    response,
  }: {
    params: { id: string };
    response: any;
  }) => {
    // Searches for a particular quote in the DB
    const quote = await quotes.findOne({ quoteID: params.id });
    // If found, respond with the quote. If not, respond with a 404
    if (quote) {
      response.status = 200;
      response.body = {
        success: true,
        data: quote,
      };
    } else {
      response.status = 404;
      response.body = {
        success: false,
        msg: "No quote found",
      };
    }
  };

// DESC: GET all Quotes
// METHOD GET /api/quote
const getQuotes = async ({ response }: { response: any }) => {
    try {
      // Find all quotes and convert them into an Array
      const allQuotes = await quotes.find({}).toArray();
      console.log(allQuotes);
      if (allQuotes) {
        response.status = 200;
        response.body = {
          success: true,
          data: allQuotes,
        };
      } else {
        response.status = 500;
        response.body = {
          success: false,
          msg: "Internal Server Error",
        };
      }
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };
  For updating a particular quote, let's build the updateQuote function.
  // DESC: UPDATE single quote
  // METHOD: PUT /api/quote/:id
  const updateQuote = async ({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    try {
      // Search a quote in the DB and update with given values if found
      const body = await request.body();
      const inputQuote = await body.value;
      await quotes.updateOne(
        { quoteID: params.id },
        { $set: { quote: inputQuote.quote, author: inputQuote.author } }
      );
      // Respond with the Updated Quote
      const updatedQuote = await quotes.findOne({ quoteID: params.id });
      response.status = 200;
      response.body = {
        success: true,
        data: updatedQuote,
      };
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

// DESC: DELETE single quote
// METHOD: DELETE /api/quote/:id
const deleteQuote = async ({
    params,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
    try {
      // Search for the given quote and drop it from the DB
      await quotes.deleteOne({ quoteID: params.id });
      response.status = 201;
      response.body = {
        success: true,
        msg: "Product deleted",
      };
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };

export { getQuotes, getQuote, addQuote, updateQuote, deleteQuote };