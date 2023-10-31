const movieBaseUrl = 'https://api.simkl.com';
let movieKeyParam = '?client_id=' + movieApiKey;
let amountOfMovies = 10;

//Gets trending movies for this week
function getTrendingMovies(){
    let trendingPath = '/movies/trending/'
    let trendingParams = '&interval=week&extended=title,overview'
    let amountOfMovies = 10;
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
    })
}

//Uncompleted
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


