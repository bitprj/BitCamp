## Step 3: Downloading the PDF on the HTML page ⬇

Now that we have a PDF stored in the "pdfs" container, how will we get the PDF back to the user? **You got it right, yet *another* Azure Function**!

Create another HTTP Trigger - this one will return the PDF download URL to the frontend when triggered.

![https://media.giphy.com/media/MYx9qA5yTknqgb4abz/giphy.gif](https://media.giphy.com/media/MYx9qA5yTknqgb4abz/giphy.gif)

**Commercial Break** 📺

Let's recap:

- **Step 1 ✅:** We created the "Upload" page and an HTTP Trigger Function that uploaded the user's image to a storage container.
- **Step 2 ✅:** We will create an **Event Grid** function that converts the image into a PDF by calling the *Online Convert API* and will upload the PDF to blob storage.
- **Step 3:** We will create a HTTP Trigger function that returns the PDF to the user when triggered by the "Download" page.
- **Step 4:** ***Optional*** If you choose, create another HTTP Trigger function and modify other code to delete the image and PDF blobs from storage containers once they are unneeded.

### Azure Functions: Check if the PDF is ready to be served 🍝

⬇First, it receives the username to get the correct PDF from the header of the request, which is made by the webpage. You will see this request later on in the JS of this step.

```jsx
var fetch = require("node-fetch");
module.exports = async function (context, req, inputBlob) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var username = req.headers['username'];
    var download = "<https://bunnimagestorage.blob.core.windows.net/pdfs/>" + username + ".pdf";

```

⬇Then, using the personalized URL, it performs a GET request to check if the PDF has been stored in the "pdfs" container.

```jsx
    let resp = await fetch(download, {
        method: 'GET',
    })
    let data = await resp;
    if (data.statusText == "The specified blob does not exist.") {
        success = false;
        context.log("Does not exist: " + data)
    } else {
        success = true;
        context.log("Does exist: " + data)
    }

```

⬇The function then returns the URL for downloading the PDF and whether or not the PDF is ready for download to the webpage.

```jsx
    context.res = {
            body: {
                    "downloadUri" : download,
                    "success": success,
            }
    };
    // receive the response

    context.log(download);
    context.log(data)
    context.done();
}

```

### Frontend: Creating the Download HTML page

Once again, the "fancy" stuff is omitted.

{% gist [https://gist.github.com/emsesc/f727674180de797ba7c55ebd4124eef0](https://gist.github.com/emsesc/f727674180de797ba7c55ebd4124eef0) %}

<br />

⬆**Like we created the "upload" page in Step 1, we now need a "download" page for users to receive the PDF.**

This piece of code creates:

- An input for the username *Line 6*
- One button for refreshing to check if the PDF is ready *Line 8*
- One button for downloading the file *Line 9*

### Frontend: Downloading the PDF on the Webpage

Time to get bombarded with some *lovely* JS!

**Part 1** ⬇:

- Change the HTML on lines 2-4 to display the current status (whether it's looking for the PDF, whether it's ready for download, etc.)
- Make a request on lines 9-16 to the HTTP Trigger Function we just coded, sending the username inputted on the HTML page along with it

{% gist [https://gist.github.com/emsesc/39f52ee0928f19f709324a1427b9b89f](https://gist.github.com/emsesc/39f52ee0928f19f709324a1427b9b89f) %}

<br />

**Part 2** ⬇:

- First we're going to find the link to download the PDF with `data.downloadUri` on *line 1*
- Change buttons from "Refresh" to "Download" when PDF is ready for download
    - **How to do this?** Remove the "Refresh" button *Lines 10-11* and make "Download" visible *Line 9*
- Set the `onclick` attribute of the "Download" button to call the `getPdf()` function with the unique username + link for download. *Line 8*
    - The `getPdf()` function allows for immediate download with `window.open(link)` *Lines 16-19*

{% gist [https://gist.github.com/emsesc/3eeb6e52e5f8598f226a62e9e809647a](https://gist.github.com/emsesc/3eeb6e52e5f8598f226a62e9e809647a) %}

<br />

## Amazing! You're done!

Here's the finished product in which I download the cute bunny shopping picture I uploaded earlier.

![https://user-images.githubusercontent.com/69332964/99192741-95d4ad00-2742-11eb-8b77-f0c9e6d159d7.png](https://user-images.githubusercontent.com/69332964/99192741-95d4ad00-2742-11eb-8b77-f0c9e6d159d7.png)

![https://user-images.githubusercontent.com/69332964/99192756-b00e8b00-2742-11eb-9fea-dc64a9083c63.png](https://user-images.githubusercontent.com/69332964/99192756-b00e8b00-2742-11eb-9fea-dc64a9083c63.png)

![https://user-images.githubusercontent.com/69332964/99192766-bbfa4d00-2742-11eb-8371-630af1b21778.png](https://user-images.githubusercontent.com/69332964/99192766-bbfa4d00-2742-11eb-8371-630af1b21778.png)

Congratulations! I hope this knowledge of Azure Functions helps you create even more fun apps!

If you're interested in augmenting this app, try using your new knowledge of Blob Storage, HTTP Triggers, the Node SDK (@azure/storage-blob), and some [Stack Overflow](https://stackoverflow.com/questions/60716837/how-to-delete-a-blob-from-azure-blob-v12-sdk-for-node-js) to assist you to add a feature to delete the image and PDF blobs.
