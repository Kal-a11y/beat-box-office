const movieBaseUrl = 'https://api.simkl.com';
let movieKeyParam = '?client_id=' + movieApiKey;
let amountOfMovies = 5;
let mediaList = []

init(); 
$('.not-favorite-btn').on('click',favoriteMedia)

//Initializes when page is opened.
function init(){
    //put function to call games here
    getTrendingMovies();
    showFavoriteData();
}

//Gets trending movies for this week
function getTrendingMovies(){
    let trendingPath = '/movies/trending/'
    let trendingParams = '&interval=week&extended=title,overview'
    fetch(movieBaseUrl + trendingPath + movieKeyParam + trendingParams)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        let movieList = []
        for (let i = 0; i < amountOfMovies; i++){
            let  movie = {
                title : data[i].title,
                overview : data[i].overview,
                posterUrl : `https://wsrv.nl/?url=https://simkl.in/posters/${data[i].poster}_w.webp`,
            }
            movieList.push(movie)
        } 
        showMovieData(movieList)

    })
}

function showMovieData(movieList){
    for (let i = 0; i < amountOfMovies; i++) {
        //Establish element locations
        const currentCardIdName = '#movie' + (i + 1);
        const currentCard = $(currentCardIdName).children();
        const moviePoster = currentCard.children().eq(0);
        const movieTitle = currentCard.eq(1);
        const movieOverview = currentCard.eq(2);
        
        //Show data to screen
        moviePoster.attr('src', movieList[i].posterUrl);
        movieTitle.text( movieList[i].title);
        movieOverview.text( movieList[i].overview);

    }
}

function showFavoriteData(){
    let media = JSON.parse(localStorage.getItem('Favorites'))
    let favoriteContainer = $('#favorite-cards')
    favoriteContainer.empty()
    if (media !== null){
        mediaList = media;
        for (let i = 0; i < mediaList.length; i++) {
            //Create card with info
            let newCard = $(`<div class="group relative"><div  class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">  <img src="${media[i].poster}"    alt="Collection of four insulated travel bottles on wooden shelf."    class="h-full w-full object-cover object-center"></div><h3 class="mt-6 text-sm text-gray-500">  <a href="#">    <span class="absolute inset-0"></span>${media[i].title}</a> </h3><p class="text-base font-semibold text-gray-900">${media[i].overview}</p><button class="favorite-btn">❤️ Favorite</button></div>`)
            
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


