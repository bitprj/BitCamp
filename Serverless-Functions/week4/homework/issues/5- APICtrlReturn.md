## API Controller P4- the Return

Here's the code we have so far for the entire `APIController`  module:

The actual code inside the private methods is hidden for length. Assume that it's there.

```js
const APIController = (function() {
    
    const clientId = config.CLIENT_ID;
    const clientSecret = config.CLIENT_SECRET;

    // private methods
    const _getToken = async () => {
				//working code 
    }

    const _getPlaylistItems = async (token, playlistId, limit) => {
        // cool code
    }

    const _getRecommendations = async(token, seedTracks, limit) => {
        //amazing code
    }

})();
```



<br />

<br />



At this point, everything within the `APIController`  module is private. None of these methods can be called. 

Remember that in the revealing module pattern, we have to explicitly **reveal** any variables or methods we want to be public.



<br />



Check out the return statement below. We want to publicly reveal all three of our private methods, and I've done two of them for you. In the return object, I'm creating a new function with the same name but no underscore (`_getToken`  --> `getToken`   and `_getPlaylistItems`  --> `getPlaylistItems`). These new functions just call the corresponding private method and return the result.

Follow the syntax and to return `_getRecommendations(token, seedTracks,limit)`.  Don't forget the parameters!



<br />



```js
const APIController = (function() {
    
    const clientId = config.CLIENT_ID;
    const clientSecret = config.CLIENT_SECRET;
    // private methods
    const _getToken = async () => {
        // working code 
    }
    const _getPlaylistItems = async (token, playlistId, limit) => {
        // cool code
    }
    const _getRecommendations = async(token, seedTracks, limit) => {
        //amazing code
    }
    
    //this reveals methods we want to be public
    return {
      
      	//public method has the same name but no underscore
        getToken() {
          //inside the method I'm calling the private method and returning the result
            return _getToken();
        },
      	getPlaylistItems(token, playlistId, limit) {
            return _getPlaylistItems(token, playlistId, limit);
        },
      
      	//reveal _getRecommendations here with the same syntax

    }
})();
```



<br />



Once this is done, we can actually call the public methods:

```js
//these are all valid calls now
APIController.getToken();
APIController.getPlaylistItems(token, playlistId, limit);
APIController.getRecommendations(token, seedTracks, limit);

// these are still invalid because the methods are private
APIController._getToken();
APIController._getPlaylistItems(token, playlistId, limit);

```



<br />



Side note: the return method could also be written like so:

```js
return {
        getToken: _getToken,
        getPlaylistItems: _getPlaylistItems,
        getRecommendations: _getRecommendations 
}
```

It's quite a bit shorter but doesn't allow you to see the necessary parameters for each function, so I prefer the previous method.



That's the completed `APIController`  module!
