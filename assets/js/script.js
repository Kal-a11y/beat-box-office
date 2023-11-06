//For Movie API Call
const movieBaseUrl = 'https://api.simkl.com';
const movieKeyParam = '?client_id=' + movieApiKey;

//Elements
const searchBar = $('#movie-search-bar')
const searchButton = $('#movie-search-btn')
const movieCardContainer = $('#movie-cards')

//Global Variables
let movieList = []
searchButton.on('click',searchMovie)

init(); 
$('.not-favorite-btn').on('click',favoriteMedia)

//Initializes when page is opened.
function init(){
    //put function to call games here
    getTrendingMovies();
    showFavoriteData();
}

//Get Movie From Search Value
function searchMovie(){
    //Set Base For Fetch URl
    const searchValue = searchBar.val().replace(/ /g, "%20");
    const searchPath = '/search/movie'
    const searchParams = '&extended=full&limit=1&q=' + searchValue
    
    //Get Searched Movie
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

        //If Movie Is Not Duplicate, Make Card
        if(!movieIsDuplicate(movie.title)){
            createMovieCard(movie)
        }else{
            alert('NO')
        }

        //Put Movie In Local Storage
        if (movieStorage !== null){
            movieStorage.push(movie)
            localStorage.setItem('Movies',JSON.stringify(movieStorage))
        }else{
            movieList.push(movie)
            localStorage.setItem('Movies',JSON.stringify(movieList))
        } 
    })
}

//Shows Completed Movie Cards On Screen
function createMovieCard(item){
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

function showFavoriteData(){
    let media = JSON.parse(localStorage.getItem('Favorites'))
    let favoriteContainer = $('#favorite-cards')
    favoriteContainer.empty()
    if (media !== null){
        mediaList = media;
        for (let i = 0; i < mediaList.length; i++) {
            //Create card with info
            let newCard = $(`<div class="group relative"><div  class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">  <img src="${media[i].poster}"    alt="Collection of four insulated travel bottles on wooden shelf."    class="h-full w-full object-cover object-center"></div><h3 class="mt-6 text-sm text-gray-500">${media[i].title}</h3><p class="text-base font-semibold text-gray-900">${media[i].overview}</p><button class="favorite-btn">❤️ Favorite</button></div>`)
            
            //Add card to favorite containter
            favoriteContainer.append(newCard)
        }

    }

        
}
function favoriteMedia(){
    //Get media card
    media = $(this).parent();
    //Save data from this card
    let item = {
        poster :media.children().eq(0).children().attr('src'),
        title : media.children().eq(1).text(),
        overview : media.children().eq(2).text()
    }

    $(this).removeClass('not-favorite-btn');
    $(this).addClass('favorite-btn');
    $(this).text('❤️ Favorite')
    
    if (mediaList !== null){
        for (let i = 0; i < mediaList.length; i++) {
            if(mediaList[i].title === item.title){
                return
            } 
        }
    }
    mediaList.push(item)
    localStorage.setItem('Favorites',JSON.stringify(mediaList))
    showFavoriteData();
}

//Uncompleted code to be used later
// function getMoviesByGenre(genre){
    
//     let amountOfMovies = 10;
//     const path = '/search/random/';
//     fetch(movieBaseUrl + path + movieKeyParam + '&genre=' + genre + '&service=netflix&type=movie&limit=' + amountOfMovies)
//     .then(function(response){
//     return response.json()
//     })
//     .then(function(data){  
       
//        console.log(data) // fetch(movieBaseUrl + '/search/id'+  movieKeyParam + '&simkl=' + data.simkl_id + '&extended=title,overview,genres')
//         // .then(function(idResponse){
//         //     return idResponse.json()
//         //     })
//         // .then(function(idData){
//         //         console.log(idData)
//         // })
//     })
//     for (let i = 0; i < amountOfMovies; i++) {
        
        
//     }
// }


