
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


//For Music API Call
const musicBaseUrl = 'https://api.simkl.com';
const musicKeyParam = '?client_id=' + musicApiKey;

//Elements
const searchBar = $('#movie-search-bar')
const searchButton = $('#movie-search-btn')
const movieCardContainer = $('#movie-cards')
const movieModal = $('#movie-search-modal')
const movieModalBtn = $('#movie-search-modal-btn')

//Global Variables
let musicList = []
searchButton.on('click',searchMovie)
movieModalBtn.on('click',function(){
    movieModal.addClass('hidden')
})

init(); 


//Initializes when page is opened.
function init(){
    //put function to call games here
    displayMovies()
}

//Get Music From Search Value
function searchMovie(){
    if (searchBar.val() === ''){
        movieModal.removeClass('hidden')
    }else{
        //Set Base For Fetch URl
        const searchValue = searchBar.val().replace(/ /g, "%20");
        const searchPath = '/search/movie'
        const searchParams = '&extended=full&limit=1&q=' + searchValue
        
        //Get Searched music
        fetch(movieBaseUrl + searchPath + movieKeyParam + searchParams)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            //Store Data
            let  movie = {
                title : data[0].title,
                overview : data[0].ratings.imdb.rating,
                posterUrl : `https://wsrv.nl/?url=https://simkl.in/posters/${data[0].poster}_w.webp`,
            }

            let movieStorage = JSON.parse(localStorage.getItem('Movies'))

            //If Music Is Not Duplicate, Make Card
            if(!movieIsDuplicate(movie.title)){
                createMusicCard(movie)
                //Put Music In Local Storage
                if (movieStorage !== null){
                    movieStorage.push(movie)
                    localStorage.setItem('Movies',JSON.stringify(movieStorage))
                }else{
                    movieList.push(movie)
                    localStorage.setItem('Movies',JSON.stringify(movieList))
                } 
            }else{
                $('#movie-modal-title').text('Duplicate Value')
                $('#movie-modal-text').text('This movie is already in your list')
                movieModal.removeClass('hidden')
            }

            searchBar.val('')
        })
    }   
}

//Shows Completed Music Cards On Screen
function createMusicCard(item){
    //Create a new card with data
    const newCard = $(`
            <div class="group relative">
                <div  class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img src="${item.posterUrl}" alt="Collection of four insulated travel bottles on wooden shelf." class="h-full w-full object-cover object-center">
                </div>
                <h3 class="mt-6 text-sm text-gray-500">IMDB Rating: ${item.overview}</h3>
                <p class="text-base font-semibold text-gray-900">${item.title}</p>

            </div>
        `)
        //Add Card To Container
        movieCardContainer.append(newCard)
}


//Displays Music At Load
function displayMovies(){
    const movieStorage = JSON.parse(localStorage.getItem('Movies'))
    if (movieStorage !== null){
        for (const movie of movieStorage) {
            createMusicCard(movie)
        }
    }
}

//Checks If Item Already Exists
function movieIsDuplicate(title){
    const movieStorage = JSON.parse(localStorage.getItem('Movies'))
    if (movieStorage !== null){
        for (const movie of movieStorage) {
            if (movie.title === title){
                return true
            }
        }
    }
}