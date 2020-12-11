//spotify api call
const APIController = (function() {
    
    const clientId = config.CLIENT_ID;
    const clientSecret = config.CLIENT_SECRET;

    // private methods
    const _getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'

        });

        const data = await result.json();
        return data.access_token;
    }


    const _getPlaylistItems = async (token, playlistId, limit) => {
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.items;
    }

    const _getRecommendations = async(token, seedTracks, limit) => {
        console.log('getting recommendations...')
    
        const emotion = document.querySelector('#hiddenemotion').value;
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
            'limit': `${limit}`,
            'seed_tracks': `${seedTracks}`,
            'min_valence': `${minValence}`,
            'max_valence': `${maxValence}`,
        })
  
        const result = await fetch
        (`https://api.spotify.com/v1/recommendations?` + params.toString(), {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
   
        const data = await result.json();
        return data.tracks[0];
    }

    return {
        getToken() {
            return _getToken();
        },
        getPlaylistItems(token, playlistId, limit) {
            return _getPlaylistItems(token, playlistId, limit);
        },
        getRecommendations(token, seedTracks, limit){
            return _getRecommendations(token, seedTracks, limit);
        }
    }
})();

// UI Module
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        button: '#song-button',
        divSongDetail: '#song-detail'
    }

    //public methods
    return {

        //method to get input fields
        inputField: {
            songButton: document.querySelector(DOMElements.button),
            songDetail: document.querySelector(DOMElements.divSongDetail)   
        },
     
        // need method to create the song detail
        createTrackDetail(img, title, artist) {
            const detailDiv = document.querySelector(DOMElements.divSongDetail)

            // any time user clicks a new song, we need to clear out the song detail div
            detailDiv.innerHTML = '';

            const html = 
            `
            <div class="songdisplay">
                <img src="${img}" alt="">     
                <br />           
                ${title}- ${artist}

            </div> 
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        }

    }

})();

const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField;
    
    const buttonElement = DOMInputs.songButton
    // create submit button click event listener
    buttonElement.addEventListener('click', async (event) => {
        // prevent page reset
        event.preventDefault();
        
        //get the token
        const token = await APICtrl.getToken(); 
           
        // set the track endpoint
        const playlistId = "37i9dQZF1DXcBWIGoYBM5M"
        
        // get the list of tracks
        const tracks = await APICtrl.getPlaylistItems(token, playlistId, 5);

        //get the list of track ids
        let seedTracks = tracks.map(a => a.track.id) 


        const recommendedTrack = await APICtrl.getRecommendations(token, seedTracks, 1);
        UICtrl.createTrackDetail(recommendedTrack.album.images[2].url, 
            recommendedTrack.name, recommendedTrack.artists[0].name);
    });

})(UIController, APIController);








