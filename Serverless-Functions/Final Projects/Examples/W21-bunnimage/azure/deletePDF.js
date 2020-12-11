var fetch = require("node-fetch");
const { BlobServiceClient } = require("@azure/storage-blob");
const connectionstring = process.env["AZURE_STORAGE_CONNECTION_STRING"];
const account = "bunnimagestorage";

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var filename = req.headers['file'];
    const deleteStatus = await deleteBlob(filename);

    context.res = {
            body: {
                    "file" : filename,
                    "success": true,
            }
    };

    context.done();
}

async function deleteBlob(filename){
    // create blobserviceclient object that is used to create container client
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "pdfs";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);
    const deleteblockBlobClient = deletecontainerClient.getBlockBlobClient(filename);
    const downloadBlockBlobResponse = await deleteblockBlobClient.download(0);
    const blobDeleteResponse = deleteblockBlobClient.delete();
    console.log(`Deleted block blob ${filename} successfully`);
    result = {
        body : {
            deletename: filename,
            success: true
        }
    };
    return result;

}