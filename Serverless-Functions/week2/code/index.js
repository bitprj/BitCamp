var multipart = require('parse-multipart');
var fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
  
    // receiving an image from an html form
  
    //enctype = multipart/form-data
    //parse-multipart library 

    var body = req.body;

    //returns ---WebkitFormBoundaryjf;ldjfdlf
    var boundary = multipart.getBoundary(req.headers['content-type']);

    //returns an array of inputs
    //each object has filename, type, data
    var parts = multipart.Parse(body,boundary);

    //array has 1 object(an image)
    var image = parts[0].data;

    var analysis = await analyzeImage(image);

    context.res = {
        body: {
            analysis
        }
    }
         
    context.done()
}

async function analyzeImage(image){
    const subscriptionKey = process.env['face_key'];
    const endpoint = process.env['face_endpoint'];

    const uriBase = `${endpoint}/face/v1.0/detect`;

    let params = new URLSearchParams({
        'returnFaceAttributes': 'facialHair'
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',
        body: image,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let data = await resp.json();

    return data;
}


