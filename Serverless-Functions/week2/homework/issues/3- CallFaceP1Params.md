## Call the Face API P1: Setting Params

At this point, your Azure function should look like this:



```js
var multipart = require("parse-multipart");
  
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.'); 

    var boundary = multipart.getBoundary(req.headers['content-type']);
    
    var body = req.body;
  
    var parts = multipart.Parse(body, boundary);
};
```

<br />
<br />

We're going to create a new function, outside of  `module.exports`  that will handle analyzing the image (this function is **async** because we will be using the **await** keyword with the API call).  This function is called `analyzeImage(img)`  and takes in one parameter, `img`, that contains the image we're trying to analyze.  Inside, we have two variables involved in the call: `subscriptionKey`  and `uriBase`.  Substitute the necessary values with your own info.

```js
async function analyzeImage(img){
    const subscriptionKey = '<YOUR SUBSCRIPTION KEY>';
    const uriBase = '<YOUR ENDPOINT>' + '/face/v1.0/detect';
}
```

<br />
<br />

Now, we want to set the parameters of our POST request and specify the exact data that we want.

The documentation for the Face API is [here](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236). Read through it, and notice that the request url is this:

**https://{endpoint}/face/v1.0/detect\[?returnFaceId]\[&returnFaceLandmarks]\[&returnFaceAttributes]\[&recognitionModel]\[&returnRecognitionModel][&detectionModel]**

<br />

All of the bracketed sections represent possible request parameters. Read through **Request Parameters** section carefully. How can we specify that we want to get the emotion data?

<br />

In order to specify all of our parameters easily, we're going to create a new `URLSearchParams`  object. Here's the object declared for you. I've also already specified one parameter, `returnFaceId`,  as `true` to provide an example. Add in a new parameter that requests emotion.

```js
let params = new URLSearchParams({
	'returnFaceId': 'true',
	'<PARAMETER NAME>': '<PARAMETER VALUE>'     //FILL IN THIS LINE
})
```


