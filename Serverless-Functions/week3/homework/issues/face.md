## Displaying Emotion Data

In the html page, we referenced a face.js file. Create a new file called face.js that will handle javascript related to the form and Azure Function call.

Now that our image has been analyzed by the Face API, we have received emotion data in JSON format. Our task is to read the JSON file and do two things, output the emotions in the image (ie. anger, contempt, disgust, etc) and convert the emotions to a scale called valence. This is what we are going to use to determine whether we recommend a song that is happy, sad, angry, etc.



The first thing we need to do is create a function called `loadFile(event) {}` inside face.js which does two things, creates a variable called image which gets the ID "output" and displays the image the user uploaded. Every time the user presses **Upload File**, we want to display whatever image they choose. To do this, we need to get the element ID by using `document.getElementByID(id)`:
(the id for this img is 'output')

```javascript
var image = //Call for element ID here
```

We also need to call for the image source using `.createObjectURL(event.target.files[0])`. Use `.src` on the image variable and call for the first file uploaded using the code above. When it's all put together, it should look something like this:

```javascript
function loadFile(event) {
    var image = //set div for image output
    image.src = //Load inputted image
};
```

<br />


Now we need to create our main function called `handle(event) {}`. It will be called when the user presses submit, and will submit the image to our Azure Function for analysis. Using the data from the Face API, it will convert the numbers into valence which will be later used to determine which song(s) to recommend to the user.

1. Using jQuery, target the output element ID and change the content to equal "Loading". Then add the line, `event.preventDefault();` to disable the ability to reload the page. To event target with jQuery, use this sample:

   ```javascript

   $(/*Add ID here*/).html("Loading...")
   //make sure to disable reload here...
   ```

2. After telling our HTML to show the content "Loading", we need to set a few variables to create a new form with our emotion data. We can do this by adding a variable set to an element ID and creating a new FormData based on the received information:

   ```javascript
   var myform = document.getElementById('image-form');
       var payload = new FormData(myform);
   
       const resp = await fetch(/*Add Function URL */, {
           method: 'POST',
           body: payload
   });
   ```

3. Next we have to add a variable for the JSON data. Make a new variable called `data` and set it to the response JSON like we did earlier... If you need a hint, use the `.json()` function. We also need a couple more variables, the first called `emotion` which will be set to `data.result[0].faceAttributes.emotion;`. This references the emotion data from the Face API. Lastly, we have to create the HTML that will actually be displayed:

   ​	i. First, create an `<h3>` tag for the title labelled `emotions in this image:` (make sure to add `<br />` at the end to skip a line)

   ​	ii. Now create 8 `<p>` tags that each show data for a different emotion. The list of emotions are *anger, contempt, disgust, fear, happiness, neutral, sadness, and surprise*. 

   ​	iii. To get the data, remember we set `var emotion` to pull the first value. All we have to do is use jQuery and use this formatting, I've done the first one for you:

   ```javascript
   var resultString = `
   <h3> Emotions in the image: </h3><br />
   <p> anger: ${emotion.anger}</p>
   
   `;
   // Finish for other data types using the same format (i.e. ${emotion.contempt}, and etc)
   ```

4. The last thing we need to do is to use jQuery to change two divs, `hidden-emotion` and `emotion`. 

   ```javascript
   $('#emotion').html(/* Emotion Data should go here */);
   $('#hidden-emotion').html(/* Valence should go here */);
   ```
