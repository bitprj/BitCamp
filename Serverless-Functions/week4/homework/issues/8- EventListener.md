## Event Listener

Your code should look something like this:

```js
const APPController = (function(UICtrl, APICtrl) {

	// get input field object ref
	const DOMInputs = UICtrl.inputField;

	// create submit button click event listener
	const buttonElement = DOMInputs.songButton;
	buttonElement.addEventListener('click', async (event) => {

	});

})(UIController, APIController);
```



<br />



Let's zoom into the eventListener function. What does it actually need to do?



1. use the `APICtrl`  parameter to call the `getToken`  method
2. use the token to get 5 popular tracks from the Top 50 Hits Playlist using `getPlaylistItems`
   1. Remember that to get recommendations, we need to provide seed tracks [(read here)](https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/) in **Query Parameters** so we need to grab these 5 songs
3. use the token and 5 seed tracks to call `getRecommendations`



<br />



That's quite a bit of work. Let's go step by step.

Step 1:  call getToken

Hint: remember that we need to reference APICtrl to access getToken! Maybe something like 

`APICtrl.<funcName>`

**ALSO!! ALL THE API-RELATED FUNCTIONS ARE ASYNC AND NEED TO BE CALLED WITH THE AWAIT KEYWORD BEFORE**   soooo... `await APICtrl.<funcName>`



<br />



```js
const APPController = (function(UICtrl, APICtrl) {

    //get input field object ref
    const DOMInputs = UICtrl.inputField;
    
    //create submit button click event listener
    const buttonElement = DOMInputs.songButton;
    buttonElement.addEventListener('click', async(event) => {
    	//TODO: call the getToken function using a reference to APICtrl
      	const token = '<CALL THE FUNCTION HERE>'
    });

})(UIController, APIController); 

```



<br />



Step 2:  call `getPlaylistItems(token, playlistId, limit)`

```js
const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField;
    
    // create submit button click event listener
    const buttonElement = DOMInputs.songButton;
    buttonElement.addEventListener('click', async(event) => {
				
      	const token = '<VALID TOKEN CALL>';
          
        // did this for you- this is the playlist id of Top 50 Hits
        const playlistId = "37i9dQZF1DXcBWIGoYBM5M";
        
        // TODO- call getPlaylistItems to get 5 tracks with appropriate params
        // REMEMBER TO USE AWAIT!
        const tracks = '<CALL THE FUNCTION HERE>';
    });

})(UIController, APIController); 
```



<br />



Step 3: call `getRecommendations(token, seedTracks, limit)`

```js
const APPController = (function(UICtrl, APICtrl) {

	// get input field object ref
	const DOMInputs = UICtrl.inputField;

	// create submit button click event listener
	const buttonElement = DOMInputs.songButton;
	buttonElement.addEventListener('click', async(event) => {
		const token = '<VALID TOKEN CALL>';
		const playlistId = "37i9dQZF1DXcBWIGoYBM5M"  
		const tracks = '<VALID TRACK CALL>';


		//seedTracks is declared for you- this is just an array of the IDs of the 5 tracks we just received
		let seedTracks = tracks.map(a => a.track.id) 


		//TODO: call getRecommendations to get 1 track
		//USE AWAIT
		const recommendedTrack = '<CALL FUNCTION HERE>'

		//creating a new trackDetail to display the song  
		UICtrl.createTrackDetail(recommendedTrack.album.images[2].url, 
		    recommendedTrack.name, recommendedTrack.artists[0].name);
	});

})(UIController, APIController); 
```



<br />



That's it for the APP Controller! In Visual Studio code, install the **Live Server**  extension and run your `index.html`  file with **Live Server** to test your code.
