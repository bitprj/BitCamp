## API Controller P2- Get Recommendations Params

Now for the most important function in the `APIController `  module. 

This function gets song recommendations using [**this**](https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/) Spotify endpoint. This is a critical resource, so...

**READ THE WHOLE THING**.

**ALL THE QUERY PARAMETERS**

- which parameters are required?

**READ THE TUNEABLE TRACK ATTRIBUTES**

- which one relates to the emotion/mood of the song?

**TRY THE ENDPOINT USING [THIS](https://developer.spotify.com/console/get-recommendations/?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50&market=US) LINK**



<br />

<br />

<br />

<br />

<br />



Here's some starting code for `_getRecommendations`. Based on the data we received from the Face API, I set a minimum and maximum valence for our recommendations. 

At this point you should know that valence is a **Tuneable Track Attribute** that specifies how happy or sad a song is. Setting a maximum and minimum means that we can only get song recommendations that fit in the range we specify.



```js
const _getRecommendations = async(token, seedTracks, limit) => {
    console.log('getting recommendations...')

  
  	//uses emotion data to set a minimum and max valence
    const emotion = document.querySelector('#hiddenemotion').value;
  
  	//default values
    let minValence = 0;
    let maxValence = 1;

  	//if sad, then range from 0 to 0.33
    if (emotion < .33){
        maxValence = .33;
    }
  
  	//if happy, range from .66 to 1
    else if (emotion > .66){
        minValence = .66;
    }
  
  	//if neutral, range from .33 to .66
    else{
        minValence = .33;
        maxValence = .66;
    }

    //make api call below
}
```

<br />
<br />


Now, we're going to work on the actual api call. Remember how we created a parameter string for our Face API call? 

```js
let params = new URLSearchParams({
	'returnFaceId': 'true',
	'<PARAMETER NAME>': '<PARAMETER VALUE>'     //FILL IN THIS LINE
})
```

<br />

We created a `URLSearchParams`  object. Let's do the same thing here:

```js
//Create a new URLSearchParams object called params
let params = <CODE HERE>
```

<br />

Inside of your search params, specify these parameter-value pairs:

1. Set min_popularity to 70.
2. Set limit to the function's `limit`  parameter(_getRecommendations(token, seedTracks, **limit**))
3. Set seed_tracks to the function's seedTracks parameter(_getRecommendations(token, **seedTracks**, limit))
4. Set min_valence to the `minValence`  variable that I already declared for you.
5. Set max_valence to the `maxValence`  variable
