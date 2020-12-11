## Call the Face API P2: Using Fetch

There are many ways to make a POST request, but to stay consistent, we're going to use the package  `node-fetch`.  This package makes HTTP requests in a similar format as what we're going to use for the rest of the project. Install the package using the same format we did for `parse-multipart` . 

```js
//install the node-fetch pacakge
var fetch = '<CODE HERE>'
```

<br />
<br />

Read through the **API** section of the documentation.  Link [here](https://www.npmjs.com/package/node-fetch#api). We're going to make a call using the `fetch(url, {options})` function.

<br />


We're calling the `fetch` function- notice the **await** keyword, which we need because `fetch` returns a **Promise**(a promise is a proxy for a value that isn't currently known). Read about Javascript promises [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). I've set the url for you- notice that it is just the uriBase with the params we specified earlier appended on.

<br />

For now, fill in the `method`  and `body`.  

```js
async function analyzeImage(img){
    
    const subscriptionKey = '<YOUR SUBSCRIPTION KEY>';
    const uriBase = '<YOUR ENDPOINT>' + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'
    })

    
    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: '<METHOD>',  //WHAT TYPE OF REQUEST?
        body: '<BODY>',  //WHAT ARE WE SENDING TO THE API?
        headers: {
            '<HEADER NAME>': '<HEADER VALUE>'  //do this in the next section
        }
    })

    let data = await resp.json();
    
    return data; 
}
```

<br />
<br />

Finally, we have to specify the request headers. Go back the the Face API documentation [here](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236), and find the **Request headers** section. There are two headers that you need. I've provided the format below. Enter in the two header names and their two corresponding values. 

<br />

FYI: The `Content-Type`  header should be set to`'application/octet-stream'`.  This specifies a binary file.

```js
    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: '<METHOD>',  //WHAT TYPE OF REQUEST?
        body: '<BODY>',  //WHAT ARE WE SENDING TO THE API?
      
      	//ADD YOUR TWO HEADERS HERE
        headers: {
            '<HEADER NAME>': '<HEADER VALUE>'
        }
    })
```

<br />
<br />


Lastly, we want to call the `analyzeImage`  function in `module.exports`.  Add the code below into `module.exports`.   

<br />

Remember that `parts` represents the parsed multipart form data. It is an array of parts, each one described by a filename, a type and a data. Since we only sent one file, it is stored in index 0, and we want the `data`  property to access the binary file– hence `parts[0].data`.  Then in the HTTP response of our Azure function, we store the result of the API call.

```js
//module.exports function

//analyze the image
var result = await analyzeImage(parts[0].data);

context.res = {
	body: {
		result
	}
};

console.log(result)
context.done(); 

```



