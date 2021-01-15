// ./lambda_functions/pokemon.js

const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'formboiz';

let cachedDb = null;

const connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const queryDatabase = async (db) => {
    const surveys = await db.collection("surveys").find({}).toArray();
  
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surveys),
    };
  };
  
  module.exports.handler = async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false;
  
    const db = await connectToDatabase(MONGODB_URI);
    return queryDatabase(db);
  };

  const pushToDatabase = async (db, data, collection) => {
    const collect;
    if (collection == "surveys") {
        collect = {
            content: data.questions,
            hash: data.hash,
          };
    }
    else if (collection == "responses") {
        collect = {
            content: data.responses,
            hash: data.hash,
          };    
        }

  
    if (collect.content && collect.hash) {
      await db.collection(collection).insertMany([data]);
      return { statusCode: 201 };
    } else {
      return { statusCode: 422 };
    }
  };
  
  module.exports.handler = async (event, context) => {
    // otherwise the connection will never complete, since
    // we keep the DB connection alive
    context.callbackWaitsForEmptyEventLoop = false;
  
    const db = await connectToDatabase(MONGODB_URI);
  
    switch (event.httpMethod) {
      case "GET":
        return queryDatabase(db);
      case "POST":
        return pushToDatabase(db, JSON.parse(event.body), "surveys");
      default:
        return { statusCode: 400 };
    }
  };
