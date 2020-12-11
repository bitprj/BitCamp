## APPController

Your project should already have an `APPController`  module declared for you from the first step:

```js
const APPController = (function(UICtrl, APICtrl) {

})(UIController, APIController);  //second pair of parentheses need to pass in parameters!
```



<br />



Notice that unlike the `APIController`  and `UIController` , this module takes in parameters because we need a reference to the API and UI controllers in order to call the methods inside. 

This also means that the second pair of parentheses need to have the correct parameters- just like a normal function call. So we have to pass in our previously declared modules as parameters.



<br />



So what does `APPController`  really do?

It controls the actual logic of the app and controls when the APICalls are made and the UI input fields are changed.

The first thing we need to do is get a reference to the `UIController`  html fields:

Set the const `DOMInputs`  to the `inputField` object that we returned in `UIController`

```js
const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
  	//hint: u need to use the UICtrl parameter... something like UICtrl.<objectName>
    const DOMInputs = <the input field object from UI>
    

})(UIController, APIController);
```



<br />



Next, we need to ensure that pressing the **Find Song** button will actually call the Spotify API and get a song. This means that we need to add an `eventListener` to the button. An `eventListener` listens for changes in the html element it is attached to (like a button click) and runs a function when the event happens.



<br />



We have to use the `addEventListener(event, function)`  function. It has two parameters:

1. `event`  - string that specifies the actual event to listen for. In our case, the event is a `'click'`.
2. `function`  - function that runs whenever the event happens



<br />



Let's create the eventListener:



<details>
  <summary><strong>Click for hint</strong></summary>
  
  ```javascript
    //DOMInputs is the input field object so to get the button just do:
    const buttonElement = DOMInputs.songButton
  ```
</details>



```js
//TODO: create submit button click event listener
const buttonElement = '<set this to the songButton using DOMInputs! >'

//this adds the eventListener
buttonElement.addEventListener('click', async(event) => {

});
```



<br />

<br />


