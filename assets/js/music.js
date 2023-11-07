
// const APIController = (function() {
    
//     const clientId = ea3a138b820e49809f38a524e42617d6;
//     const clientSecret = fee8fe6a91184da988c2baa05053b40a;

//     // private methods
//     const _getToken = async () => {

//         const result = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type' : 'application/x-www-form-urlencoded', 
//                 'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
//             },
//             body: 'grant_type=client_credentials'
//         });

//         const data = await result.json();
//         return data.access_token;
//     }
    
//     const _getGenres = async (token) => {

//         const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
//             method: 'GET',
//             headers: { 'Authorization' : 'Bearer ' + token}
//         });

//         const data = await result.json();
//         return data.categories.items;
//     }

//     const _getPlaylistByGenre = async (token, genreId) => {

//         const limit = 10;
        
//         const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
//             method: 'GET',
//             headers: { 'Authorization' : 'Bearer ' + token}
//         });

//         const data = await result.json();
//         return data.playlists.items;
//     }

//     const _getTracks = async (token, tracksEndPoint) => {

//         const limit = 10;

//         const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
//             method: 'GET',
//             headers: { 'Authorization' : 'Bearer ' + token}
//         });

//         const data = await result.json();
//         return data.items;
//     }

//     const _getTrack = async (token, trackEndPoint) => {

//         const result = await fetch(`${trackEndPoint}`, {
//             method: 'GET',
//             headers: { 'Authorization' : 'Bearer ' + token}
//         });

//         const data = await result.json();
//         return data;
//     }

//     return {
//         getToken() {
//             return _getToken();
//         },
//         getGenres(token) {
//             return _getGenres(token);
//         },
//         getPlaylistByGenre(token, genreId) {
//             return _getPlaylistByGenre(token, genreId);
//         },
//         getTracks(token, tracksEndPoint) {
//             return _getTracks(token, tracksEndPoint);
//         },
//         getTrack(token, trackEndPoint) {
//             return _getTrack(token, trackEndPoint);
//         }
//     }
// })();


//For Movie API Call
const musicBaseUrl = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=tracks&offset=0&limit=1';
const musicOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': musicApiKey,
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
	}
}

//Elements
const musicSearchBar = $('#music-search-bar')
const musicSearchButton = $('#music-search-btn')
const musicCardContainer = $('#music-cards')
const musicModal = $('#movie-search-modal')
const musicModalBtn = $('#movie-search-modal-btn')

//Global Variables
let musicList = []
musicSearchButton.on('click',searchMusic)
musicModalBtn.on('click',function(){
    musicModal.addClass('hidden')
})

init(); 


//Initializes when page is opened.
function init(){
    //put function to call games here
    displayMusic()
}

//Get Movie From Search Value
function searchMusic(){
    if (musicSearchBar.val() === ''){
        musicModal.removeClass('hidden')
    }else{
        //Set Base For Fetch URl
        const searchValue = musicSearchBar.val().replace(/ /g, "%20");
        const searchPath = '/search/movie'
        const searchParams = '&extended=full&limit=1&q=' + searchValue
        
        //Get Searched Movie
        fetch(musicBaseUrl + searchPath + searchParams, musicOptions)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            //Store Data
            const dataLocation = data.tracks.items[0].data
            const song = {
                title: dataLocation.name,
                artist: dataLocation.artists.items[0].profile.name,
                posterUrl: dataLocation.albumOfTrack.coverArt.sources[0].url
            }

            let musicStorage = JSON.parse(localStorage.getItem('Music'))

            //If Movie Is Not Duplicate, Make Card
            if(!musicIsDuplicate(song.title)){
                createMusicCard(song)
                //Put Movie In Local Storage
                if (musicStorage !== null){
                    musicStorage.push(song)
                    localStorage.setItem('Music',JSON.stringify(musicStorage))
                }else{
                    musicList.push(song)
                    localStorage.setItem('Music',JSON.stringify(musicList))
                } 
            }else{
                $('#movie-modal-title').text('Duplicate Value')
                $('#movie-modal-text').text('This song is already in your list')
                musicModal.removeClass('hidden')
            }

            musicSearchBar.val('')
        })
    }   
}

//Shows Completed Movie Cards On Screen
function createMusicCard(item){
    //Create a new card with data
    const newCard = $(`
            <div class="group relative">
                <div  class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img src="${item.posterUrl}" alt="Collection of four insulated travel bottles on wooden shelf." class="h-full w-full object-cover object-center">
                </div>
                <h3 class="mt-6 text-sm text-gray-500">IMDB Rating: ${item.artist}</h3>
                <p class="text-base font-semibold text-gray-900">${item.title}</p>

            </div>
        `)
        //Add Card To Container
        musicCardContainer.append(newCard)
}


//Displays Movies At Load
function displayMusic(){
    const musicStorage = JSON.parse(localStorage.getItem('Music'))
    if (musicStorage !== null){
        for (const song of musicStorage) {
            createMusicCard(song)
        }
    }
}

//Checks If Item Already Exists
function musicIsDuplicate(title){
    const musicStorage = JSON.parse(localStorage.getItem('Music'))
    if (musicStorage !== null){
        for (const song of musicStorage) {
            if (song.title === title){
                return true
            }
        }
    }
}