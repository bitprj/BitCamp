## VeryGoodForms: Livestream 1

During this livestream, a MongoDB Atlas cluster was deployed, a general structure of the database was created, a Netlify app was deployed, and a simple endpoint was created to retrieve and edit files.

### :leaves: Creating the Atlas Database

Before we can start doing anything with MongoDB, please create an account [here](https://account.mongodb.com/account/login). Refer to [this](https://docs.atlas.mongodb.com/tutorial/create-atlas-account) documentation if you need any additional help!

1. **Signing in:** Once you sign in, feel free to name your organization anything you want, and preferably, name the project "development." **Select `JavaScript` as your preferred language.**
2. **Select `Shared Clusters`**

![image](https://user-images.githubusercontent.com/69332964/104662232-5b32b680-5698-11eb-918a-54df23cd3314.png)

3. **Deploying the Atlas Cluster (Free Tier)**: Start from **step 4** and follow [this](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster) tutorial to deploy your cluster. Enter "Form1" as the cluster name and use the settings marked in red by the instructions.

> Note: Your cluster may take a minute to deploy. Sit tight!



4. **Connecting to the Cluster:** To make sure we'll be able to access the connection URI later, let's configure a few settings.

Click `CONNECT`

![image](https://user-images.githubusercontent.com/69332964/104664519-748a3180-569d-11eb-920d-ad07058a2003.png)

For the purposes of this homework project, select `Allow Access from Anywhere`.  However, this is should **not** be done for a real production project - it's not secure.

![image](https://user-images.githubusercontent.com/69332964/104662645-486cb180-5699-11eb-9d28-4f687ef8a3c6.png)

Now, create a database user. **Keep these credentials handy! We'll need them later.**

![image](https://user-images.githubusercontent.com/69332964/104662775-82d64e80-5699-11eb-8caf-0a3c4013ada3.png)

Close out the popup and head to the next step.



5. [**Creating template documents:**](https://docs.atlas.mongodb.com/tutorial/insert-data-into-your-cluster) These will be used for retrieving data and testing our endpoint later on. It'll also allow us to get familiar with how we're implementing the database structure! We'll be doing this in the Atlas UI.

Select `Form1`

![image](https://user-images.githubusercontent.com/69332964/104663025-16a81a80-569a-11eb-8782-12ea9dd91f87.png)

Select `Collections` - we'll be creating two of these.

![image](https://user-images.githubusercontent.com/69332964/104664542-853aa780-569d-11eb-874a-54344b872522.png)

> **Quick review of the MongoDB NoSQL Structure** (from largest group to most specific)
>
> Clusters --> Databases --> Collections --> Documents --> Objects/Fields/Arrays



Next, choose `Add My Own Data`. In the popup, call the Database "formboiz" and name the collection "surveys." *The surveys collection will contain individual documents that each hold one survey with questions.*

Click `insert document`:

![image](https://user-images.githubusercontent.com/69332964/104663565-43a8fd00-569b-11eb-9afe-0946bfe6c64f.png)

Create:

* A `hash` field with a string value
* A `questions` field with an array value containing two values

![image](https://user-images.githubusercontent.com/69332964/104663785-bd40eb00-569b-11eb-9237-9b9852324f88.png)

**Press insert, and create another collection named "responses" by hovering over "formboiz."**

Create another document in `formboiz.responses` with:

* A `hash` field with a string value
* A `responses` field with an array value containing two values



### :globe_with_meridians: Creating a Netlify Application (Part 1)

Follow [this](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) handy tutorial to deploy the Netlify site we'll be using. Proceed to the next step once you have followed all the steps, and prepare to commit to the Github repository you linked while following the walkthrough. (Thank you to https://stephencook.dev/blog/netlify-mongodb/)



#### Create a file named `netlify.toml` in the root directory.

```toml
[build]
  # Directory with the serverless Lambda functions
  functions = "lambda_functions"
```

Place this code in the file. This defines where our Serverless Functions will be placed.



#### Install the MongoDB Driver

Run `npm install mongodb` on the terminal command line to install dependencies.



#### Accessing data from "formboiz" (the database)

1. Create a new directory named `lambda_functions` and place a file named `form.js`
2. Place this code in the file:

```js
// ./lambda_functions/form.js

const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
// Place this environment variable in Netlify
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
```

This retrieves the data stored in the `surveys` collection when a GET request is made to your Netlify endpoint. However, before we can test this, we need to enter the MongoDB URI into Netlify so we can connect the database!



#### Netlify Build Variable (MongoDB Connection URI)

To store our secret URI (it contains the database credentials, so we don't want it to leak anywhere...) we will put it in Netlify where our Lambda function can access it.

1. **Obtain the URI**

   Return to `Clusters` on your Atlas interface and click `CONNECT`. On the popup, click "Connect your application" and copy the connection string. **Be sure to add your user's password and replace `<dbname>` with "test"**

   > Here's an example: `mongodb+srv://m001-student:<REPLACE WITH PASSWORD>@productrectest.ov7hn.mongodb.net/test?retryWrites=true&w=majority`

2. **Place URI in Netlify**

   Follow [these instructions](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables) to create an environment variable for the URI. Be sure it to name it as `MONGODB_URI`!

   

### :pencil: Testing using GET 

At this point, the `/.netlify/functions/form` endpoint should return the contents of the `surveys` collection. Paste the endpoint into your browser and observe the output!



###  :globe_with_meridians: ​Creating a Netlify Application (Part 2) 

Now, we're going to add a snippet of code that inserts a document when you make a POST request to the same `/.netlify/functions/form` endpoint. We're going to be **inserting** data instead of **retrieving it**.



#### Modifying Data

Return to the `/lambda_functions/form.js` file and append this portion of code:

```js
  const pushToDatabase = async (db, data) => {
    const surveys = {
      question: data.questions,
      hash: data.hash,
    };
  
    if (surveys.question && surveys.hash) {
      await db.collection("surveys").insertMany([data]);
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
        return pushToDatabase(db, JSON.parse(event.body));
      default:
        return { statusCode: 400 };
    }
  };
```



### :pencil: Testing using POST

At this point, the `/.netlify/functions/form` endpoint should return the contents of the `surveys` collection **when a POST request is made with a body including `hash` and `questions` in JSON**. We can't simply access it in our browser this time since we're making a POST request. You have many options, but here are two:



#### 1. Testing with Postman

Make a POST request to the endpoint with a raw body in JSON. Example payload:

```json
{
"hash" : "thisisauniquehash",
"questions" : ["How do you say hello?", "Is this a good question?"]
}
```

If you're unsure how to complete that, refer to [this.](https://www.toolsqa.com/postman/post-request-in-postman/)



#### 2. Testing in the console

Navigate to the endpoint in your browser and open "inspect element." Click to the console tab and enter these lines of code to make a POST request:

```js
// Place this in the console to run!

const postRequest = await fetch("/.netlify/functions/form", {
  method: "POST",
  body: JSON.stringify({
    "hash": "thisisauniquehash",
    "question" : ["How do you say hello?", "Is this a good question?"],
  }),
});

console.log("POST request status code", postRequest.status);
```

**You should get a 201 status code if you modified the database correctly.**

Why? Recall this piece of code:

```js
    if (surveys.question && surveys.hash) {
      await db.collection("surveys").insertMany([data]);
      return { statusCode: 201 };
    } else {
      return { statusCode: 422 };
    }
```
