//modules are like classes
//allow for private variables and methods

//APIController

//javascript expressions are surrounded by parentheses
//expressions return a value
const APIController = (function() {
    const client_id = 'e0d083b102d34c5c9cab5badd6e4a24a';
    const client_secret = 'a130951ade9f43ef9901af9d5317648d';

    //private methods
    const _getToken = async() => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const data = await result.json();
        return data.access_token;
    }

    const _getNewReleases = async(token, limit) => {
        //queryString: paramName=paramValue&param2Name=param2Value
        const queryString = '?limit=' + limit;
        const result = await fetch('https://api.spotify.com/v1/browse/new-releases' + queryString, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        const data = await result.json();
        return data.albums.items;
    }

    const _getAlbumTracks = async(token, albumId, limit) => {
        const queryString = '?limit=' + limit;
        const result = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks` + queryString, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        const data = await result.json();
        return data.items;
    }

    return {
        getToken(){
            return _getToken();
        },

        getNewReleases(token, limit) {
            return _getNewReleases(token, limit);
        },

        getAlbumTracks(token, albumId, limit){
            return _getAlbumTracks(token, albumId, limit)
        }
    }
})();



//UIController  - controls user interface, references html fields 
const UIController = (function() {
    const DOMElements = {
        albumList: '#album-list',
        songList: '#song-list',
        token: '#hidden-token'
    }

    return {
        inputField: {
            albums: document.querySelector(DOMElements.albumList),
            songs: document.querySelector(DOMElements.songList)
        },

        createAlbumDetail(album){
            const detailDiv = document.querySelector(DOMElements.albumList);

            const html = 
            `
            <div class="album-detail" id=${album.id}>
                <img src=${album.images[2].url} alt=""></img>
                <br />
                ${album.name}
                ${album.artists[0].name}
            </div>
            `

            detailDiv.insertAdjacentHTML('beforeend', html);
            detailDiv.insertAdjacentHTML('beforeend', '<br />');
        },

        createTrackDetail(track){
            const detailDiv = document.querySelector(DOMElements.songList);

            const html = 
            `
            <div class="song-detail">
                ${track.name}
            </div>
            `

            detailDiv.insertAdjacentHTML('beforeend', html);
        },

        clearTrackDetail(){
            document.querySelector(DOMElements.songList).innerHTML = '';
        },

        storeToken(token) {
            document.querySelector(DOMElements.token).value = token;
        },
        
        getStoredToken(){
            return document.querySelector(DOMElements.token).value;
        }
    }
})();


//APPController - uses api/ui controllers to retrieve data + display
const APPController = (function(APICtrl, UICtrl) {
    const elements = UICtrl.inputField;

    const loadNewReleases = async() => {
        const token = await APICtrl.getToken();
        UICtrl.storeToken(token);

        const albums = await APICtrl.getNewReleases(token, 10);
        console.log(albums);

        albums.forEach(album => UICtrl.createAlbumDetail(album));    
    }

    elements.albums.addEventListener('click', async(event) => {
        UICtrl.clearTrackDetail();
        const token = UICtrl.getStoredToken();
        const albumId = event.target.id;
        const tracks = await APICtrl.getAlbumTracks(token, albumId, 10);
    
        tracks.forEach(track => UICtrl.createTrackDetail(track))
    })
    
    return{
        init(){
            loadNewReleases();
        }
    }

})(APIController, UIController);

APPController.init();