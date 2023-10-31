const movieBaseUrl = 'https://api.simkl.com';
let movieKeyParam = '?client_id=' + movieApiKey;
let amountOfMovies = 5;

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


