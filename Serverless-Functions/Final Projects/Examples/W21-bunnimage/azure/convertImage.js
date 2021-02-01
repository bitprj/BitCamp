var multipart = require("parse-multipart");
var fetch = require("node-fetch");
const { BlobServiceClient } = require("@azure/storage-blob");
const connectionstring = process.env["AZURE_STORAGE_CONNECTION_STRING"];
const account = "bunnimagestorage";

module.exports = async function (context, eventGridEvent, inputBlob) {
    context.log("<----------------START----------------------->")
    
    const blobUrl = context.bindingData.data.url;
    const blobName = blobUrl.slice(blobUrl.lastIndexOf("/")+1);
    // get blob url and name
    context.log(`Blob Url: ${blobUrl}`);
    //context.log(eventGridEvent);
    context.log(`Image that was uploaded: ${blobName}`);
    
    var result = await convertImage(blobName);
    jobId = result.id

    status = false;
    try {
        while (!status) {
            update = await checkStatus(jobId);
            context.log("<------Trying-------->")
            context.log(update);
            if (update.status.code == "completed") {
                context.log("[!] Image done converting")
                status = true
                uri = update.output[0].uri;
                filename = update.output[0].filename;
                context.log("Download URL: " + uri);
                context.log("Donwnload file: " + filename);
            } else if (update.status.info == "The file has not been converted due to errors."){
                context.log("[!!!] AccountKey is incorrect")
                context.done();
            }
        }
    }
    catch (e) {
        context.log("[!!!] Daily Conversions Reached");
        context.done();
    }

    let resp = await fetch(uri, {
        method: 'GET',
    })

    let data = await resp.buffer();
    context.log(data);
    const uploadStatus = await uploadBlob(data, filename, blobName);
    context.log("[!] Uploading to pdfs container...")
    context.log(uploadStatus);
    context.log("<----------------END---------------------->")
    context.done();
};
    

async function convertImage(blobName){
    const api_key = process.env['convertAPI_KEY'];
    const accountKey = process.env['accountKey'];
    const uriBase = "https://api2.online-convert.com/jobs";
	// env variables (similar to .gitignore/.env file) to not expose personal info

    img = {
    "conversion": [{
        "target": "pdf"
    }],
    "input": [{
        "type": "cloud",
        "source": "azure",
        "parameters": {
            "container": "images",
            "file": blobName
        },
        "credentials": {
            "accountname": "bunnimagestorage",
            "accountkey": accountKey
        }
    }]
    }

    payload = JSON.stringify(img);

    // making the post request
    let resp = await fetch(uriBase, {
        method: 'POST',
        body: payload,
        // we want to send the image
        headers: {
            'x-oc-api-key' : api_key,
            'Content-type' : 'application/json',
            'Cache-Control' : 'no-cache'
        }
    })

    // receive the response
    let data = await resp.json();

    return data;
}

async function checkStatus(jobId){
    const api_key = process.env['convertAPI_KEY'];
    const uriBase = "https://api2.online-convert.com/jobs";
	// env variables (similar to .gitignore/.env file) to not expose personal info

    // making the post request
    let resp = await fetch(uriBase + "/" + jobId, {
        /*The await expression causes async function execution to pause until a Promise is settled 
        (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. 
        When resumed, the value of the await expression is that of the fulfilled Promise*/
        method: 'GET',
        headers: {
            'x-oc-api-key' : api_key,
        }
    })

    // receive the response
    let data = await resp.json();

    return data;
}

async function uploadBlob(pdf, filename, image){
    // create blobserviceclient object that is used to create container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    // get reference to a container
    const container = "pdfs";
    const containerClient = await blobServiceClient.getContainerClient(container);
    // create blob name
    const blobName = filename;
    // get block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(pdf, pdf.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    const deletecontainer = "images";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);
    const deleteblockBlobClient = deletecontainerClient.getBlockBlobClient(image);
    const downloadBlockBlobResponse = await deleteblockBlobClient.download(0);
    const blobDeleteResponse = deleteblockBlobClient.delete();
    console.log(`Deleted block blob ${image} successfully`);
    result = {
        body : {
            uploadname : blobName, 
            data: pdf.length,
            success: true,
            deletename: image,
            success: true
        }
    };
    return result;

}
