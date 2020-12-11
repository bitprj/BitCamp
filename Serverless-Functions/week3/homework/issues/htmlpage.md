## Creating an HTML Page

After watching the live demo, you should know the basics of how to create a simple website using the coding language, HTML, and some CSS if you want your webpage to look fancy. Now, your task is to create your own HTML page that inputs an image using a `<form>` and outputs the image's emotion data and the user's recommended song.

<br />

If you still need some help learning HTML and CSS, checkout these resources:

<br />

W3Schools (HTML): https://www.w3schools.com/html/default.asp

W3Schools (CSS): https://www.w3schools.com/css/default.asp

<br />

Here's a list of HTML items you need to create (please use the id's specified)

1.  `header` element that says anything you want... mine says **Example Project**
2. `div`  element with id `container`  that will surround **all** of your elements.
    1. empty `div`  with id `hidden-emotion`  and type `hidden`.  This is going to hold but not display the emotion data we receive from Face API.
    2. `form`  element with id `image-form`.  Also specify  `onsubmit="handle(event)"`.  Set the `enctype`  attribute to `multipart/form-data`.  <-- Remember that for forms that receive file uploads, we need to specify this type of encoding.  
    
        * (next three elements are in the form element): `input`  element that allows a file upload, where the user will upload an image. [This link](https://www.w3schools.com/html/html_form_input_types.asp) could be helpful. Set the `onChange`  attribute to `"loadFile(event)"`. Use the `accept`  attribute to only allow image submissions. Finally, set the `name` attribute to `image`.
        
        * `img`  element with id `output`-  this is going to display the image that the user selects
        * `button`  element with the `type`  attribute set to `submit`.  The text inside should say "Submit Picture" or something similar. This will submit the image.
        
   3. (Out of the form element now): empty `div`  with the id `emotion`.  This is where the emotion analysis results will be displayed.
   4. `button`  with id `song-button`  that says something like **Find Song**.
   5. Empty `div`  with id `song-detail`.  The song recommendation will be shown here.



  

<br />

<br />



Lastly, make sure to reference jQuery:

```html
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
     
    <script src="song.js" type="text/javascript"></script>
    <script src="face.js" type="text/javascript"></script>
```

<br />

After that, you're done with the frontend. It's time to use JavaScript!
