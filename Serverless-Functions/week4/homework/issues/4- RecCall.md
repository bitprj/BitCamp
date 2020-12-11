## API Controller P3- Make Call

At this point, your code should look similar to this:

```js
//this is the _getRecommendations method inside of your APIController module

const _getRecommendations = async(token, seedTracks, limit) => {
  console.log('getting recommendations...')

  const emotion = document.querySelector('#hidden-emotion').value;
  let minValence = 0;
  let maxValence = 1;

  if (emotion < .33){
      maxValence = .33;
  }
  else if (emotion > .66){
      minValence = .66;
  }
  else{
      minValence = .33;
      maxValence = .66;
  }

  let params = new URLSearchParams({
    'min_popularity': '70',
    'limit': limit,
    'seed_tracks': seedTracks,
    'min_valence': minValence,
    'max_valence': maxValence
})
	
  //API CALL
}


```

<br />
<br />


The last part of the `_getRecommendations`  function is to make the fetch call. The only thing you have to add  here is the recommendations endpoint and the parameter string. Again, the documentation for this endpoint is [here](https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/). 

<br />

Hint: Look back on your Face API call to see how we can add a parameter string.


<details>
  <summary><strong>Click for bigger hint: the actual face api code</strong></summary>
  
  ```javascript
    //FACE API CALL!! notice the '?' and 'params.toString()' !!!
    let resp = await fetch(endpoint + '?' + params.toString(), {
        //random code
    }
  ```
</details>

<br />


```js
const result = await fetch('<API ENDPOINT + PARAM STRING>', {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
  });

  const data = await result.json();
  return data.tracks[0];
```

