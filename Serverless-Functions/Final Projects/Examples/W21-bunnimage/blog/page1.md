# Creating a File Sharing and Conversion Web App with Azure Functions

## By: Emily Chen

If you or someone you know participated in this year's AP Collegeboard Exams, you probably recognize the stress of submitting handwritten work within a small time constraint.

![https://media.giphy.com/media/3o7TKRwpns23QMNNiE/giphy.gif](https://media.giphy.com/media/3o7TKRwpns23QMNNiE/giphy.gif)

**Bunnimage** aims to help alleviate that stress for students and others working at home. It takes an image as an input on an upload page and converts it into a PDF that is available at a download page. 

### Overview

![https://user-images.githubusercontent.com/69332964/99191176-01198180-2739-11eb-9889-872822df6bd8.png](https://user-images.githubusercontent.com/69332964/99191176-01198180-2739-11eb-9889-872822df6bd8.png)

**In this tutorial, we'll be walking through:**

1. Creating the "Upload" page and an HTTP Trigger Function that will upload the user's image to a storage container.
2. Setting up an Event Grid Subscription and a Function that converts the image into a PDF and stores it again.
    - This is where the API will live!
3. Creating the "Download" page and an HTTP Trigger Function that retrieves the correct PDF.
4. **Optional** For those who are interested, we can add another Function to delete the files and keep our containers squeaky clean.
    - **Note**: The diagram above excludes the optional deletion feature.

You can find a sample of the final product at [my Github repository](https://github.com/emsesc/bunnimage).

### Before we start:

- Make sure you have an **[Azure Subscription](https://azure.microsoft.com/en-us/free/)** so we can utilize the amazing features of Microsoft Azure Functions (It's free!) 🤩
- **Register** for an account on **[Online Convert](https://www.online-convert.com/register)** (with the free version), as we will be using this API convert our images
- If you want to host your website somewhere, check out [Repl.it](https://repl.it/languages/html), or you can just have your project run [locally](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Step 1: Upload the image ⬆️

### Creating a Function App

We're going to have a lot of triggers in this project, so let's get started by [creating a Function App](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-azure-function)! Follow those steps to create the Function App, and then create the first HTTP trigger (this will upload our image).

> **Note**: it will be helpful if you keep track of these strings for reference later in the project: Storage account name (found in "Hosting"), Function app name, Resource Group

Before we start coding the trigger, though, we need to install some `npm` packages/libraries.

Click on the "Console" tab in the left panel under "Development Tools".

![https://user-images.githubusercontent.com/69332964/99189070-59e31d00-272d-11eb-80a4-17444e5fac65.png](https://user-images.githubusercontent.com/69332964/99189070-59e31d00-272d-11eb-80a4-17444e5fac65.png)

Inside the console (shown on the right panel), type in the following commands:

`npm init -y` <br />
[`npm install parse-multipart`](https://www.npmjs.com/package/parse-multipart) <br />
[`npm install node-fetch`](https://www.npmjs.com/package/node-fetch) <br />
[`npm install @azure/storage-blob`](https://www.npmjs.com/package/@azure/storage-blob) <br />

> **Tip**: The Azure Storage Blob client library is going to be a key piece of the project. After all, it's about blobs!

### Setting up your storage account

This is the storage account you created when creating the Function App. If you don't know what it is, search "Storage Containers" in the query box in Azure portal.

We're going to need to create 2 containers: "images" and "pdfs." Think of these as folders in the account.

![https://user-images.githubusercontent.com/69332964/99161767-75194280-26c3-11eb-8ad1-c19d63d37bbb.png](https://user-images.githubusercontent.com/69332964/99161767-75194280-26c3-11eb-8ad1-c19d63d37bbb.png)

![https://user-images.githubusercontent.com/69332964/99161780-8cf0c680-26c3-11eb-9bfc-78dc3262b038.png](https://user-images.githubusercontent.com/69332964/99161780-8cf0c680-26c3-11eb-9bfc-78dc3262b038.png)

You will need to upgrade your storage account because Event Grid Subscriptions will only work with a v2 version. Follow this [tutorial](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-upgrade?tabs=azure-portal) to upgrade it.

### Writing our *First* Azure Function to Upload an Image

⬇ **Some housekeeping...**

- For the function to work, we have to initialize the packages/libraries we installed in the beginning of part 1.
- Take note of the `process.env` value being assigned to `connectionstring` in the code below (*Line 3*). Use this [tutorial](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings) to add in your own secret strings from your storage container.
    - The storage container is the one you created when you started your Function App. Navigate to it and find your secret strings here:

    ![https://user-images.githubusercontent.com/69332964/99161798-ba3d7480-26c3-11eb-8e55-eac4bd4cb174.png](https://user-images.githubusercontent.com/69332964/99161798-ba3d7480-26c3-11eb-8e55-eac4bd4cb174.png)

    ![https://user-images.githubusercontent.com/69332964/99161822-ec4ed680-26c3-11eb-8977-f12beb496c24.png](https://user-images.githubusercontent.com/69332964/99161822-ec4ed680-26c3-11eb-8977-f12beb496c24.png)

    - Keep these safe, and use the connection string in the corresponding variable in the code.
    - *Note: You'll need to store other strings in environment variables later on in the tutorial*

Let's start just by initializing a few variables we'll need.

{% gist [https://gist.github.com/emsesc/b658b23b36610084ffb7d649e5821bac](https://gist.github.com/emsesc/b658b23b36610084ffb7d649e5821bac) %}

⬇ **The main block of code**

- Notice that we are able to name the file with the user's username in line 10 by receiving it from the header.
    - Later on in the JS, we will send the username in the header of the request.
- The `parse-multipart` library is being used in lines 4-11 to parse the image from the POST request we will later make with the frontend; refer to the documentation linked above.
- Some if-else logic is used from lines 13-22 to determine the file extension.
- We then call the `uploadBlob()` function in line 24.

{% gist [https://gist.github.com/emsesc/d09a6d7c0caa1318d8e184ebf412c185](https://gist.github.com/emsesc/d09a6d7c0caa1318d8e184ebf412c185) %}

⬇ **Uploading the image blob to the "images" container**

- Notice the `uploadBlob()` function! This is what uploads the parsed image to the specified "images" blob container.
    - Here's a [YouTube Video to help explain](https://youtu.be/Qt_VXM_fml4) the handy dandy library

{% gist [https://gist.github.com/emsesc/8177c15fea34c208bc9a7fc9ea0bc585](https://gist.github.com/emsesc/8177c15fea34c208bc9a7fc9ea0bc585) %}

<br />

### Frontend: The "upload" webpage

Next, I created a static HTML page that will accept the image from the user and send to the Azure Function we just coded using Javascript.

**Note**: I removed unnecessary sections of my code because I wanted to make the webpage ✨*fancy*✨, but you can see the whole thing [here](https://github.com/emsesc/bunnimage/blob/main/upload.html).

{% gist [https://gist.github.com/emsesc/faaa81463826cb383110d86071ace146](https://gist.github.com/emsesc/faaa81463826cb383110d86071ace146) %}

<br />

**Above we have:**

- Input box for the username (simple but *insecure* auth system)
- Button to submit

However, a static HTML webpage can't make a request to the Azure Function itself, which is where we're going to cook up some JS. 😯

### Frontend: Javascript for interacting with the Azure Function

This block of Javascript updates the preview thumbnail while getting the picture, gets the username, and sends them both over to the function we just coded.

First, `loadFile()` is called when the file input changes to display the thumbnail.

```jsx
async function loadFile(event){
    console.log("Got picture!");
    var image = document.getElementById("output");
    // Get image from output 
    image.src = URL.createObjectURL(event.target.files[0])
    // load inputted image into the image src and display
}
```

Then, `handle()` is called when the file is submitted to POST the image and username. The image is sent in the body, and username is sent as a header. *Lines 15-30*

{% gist [https://gist.github.com/emsesc/b4d045380641847163399aa4fed6841e](https://gist.github.com/emsesc/b4d045380641847163399aa4fed6841e) %}

> Be sure to change the function url on Line 19 to the one of your upload image Function!

![https://user-images.githubusercontent.com/69332964/99188529-73369a00-272a-11eb-93df-04fdce5381df.png](https://user-images.githubusercontent.com/69332964/99188529-73369a00-272a-11eb-93df-04fdce5381df.png)

### Deploy your code

- Try doing it locally with the **live server extension** for VS Code
- Try [Azure Web Apps](https://azure.microsoft.com/en-us/services/app-service/web/)
- I personally used [repl.it](https://repl.it/languages/html)

### Update CORS Settings

> This is a crucial step!! 😱 If you don't change your CORS (Cross-origin resource sharing) settings, the POST request won't work. This tells the Function App what domains can access our Azure Function.

**Options:**

- **Recommended**: Change it to a wildcard operator (`*`), which allows *all* origin domains to make requests
    - Be sure to remove any other existing inputs before attempting to save with wildcard

        ![https://user-images.githubusercontent.com/69332964/99188905-6f0b7c00-272c-11eb-8142-f91882227c78.png](https://user-images.githubusercontent.com/69332964/99188905-6f0b7c00-272c-11eb-8142-f91882227c78.png)

- Change it to the domain you are using to host your code

### Home stretch! 🏃🏻‍♀️

**It's finally time to test our first step that our app will make!**

1. Navigate to your HTML page and submit an image

![https://user-images.githubusercontent.com/69332964/99189240-3cfb1980-272e-11eb-8896-e959f37480b3.png](https://user-images.githubusercontent.com/69332964/99189240-3cfb1980-272e-11eb-8896-e959f37480b3.png)

![https://user-images.githubusercontent.com/69332964/99189255-53a17080-272e-11eb-9cab-a73faf504b3f.png](https://user-images.githubusercontent.com/69332964/99189255-53a17080-272e-11eb-9cab-a73faf504b3f.png)

Go to the "images" storage container and check to see if your image is there!
*Error? Check the log in your Function*

![https://user-images.githubusercontent.com/69332964/99189316-9c592980-272e-11eb-9870-dbc1f9352599.png](https://user-images.githubusercontent.com/69332964/99189316-9c592980-272e-11eb-9870-dbc1f9352599.png)
