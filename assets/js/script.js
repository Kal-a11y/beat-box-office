//For Movie API Call
const movieBaseUrl = 'https://api.simkl.com';
const movieKeyParam = '?client_id=' + movieApiKey;

//Elements
const searchBar = $('#movie-search-bar')
const searchButton = $('#movie-search-btn')
const movieCardContainer = $('#movie-cards')
const movieModal = $('#movie-search-modal')
const movieModalBtn = $('#movie-search-modal-btn')

//Global Variables
let movieList = []
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

//Get Movie From Search Value
function searchMovie(){
    if (searchBar.val() === ''){
        movieModal.removeClass('hidden')
    }else{
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
            searchBar.val('')
        })
    }   
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


//Displays Movies At Load
function displayMovies(){
    const movieStorage = JSON.parse(localStorage.getItem('Movies'))
    if (movieStorage !== null){
        for (const movie of movieStorage) {
            createMovieCard(movie)
        }
    }else{
        movieCardContainer.text('Search To Add Movies')
    }
}

//Checks If Item Already Exists
function movieIsDuplicate(title){
    const movieStorage = JSON.parse(localStorage.getItem('Movies'))
    for (const movie of movieStorage) {
        if (movie.title === title){
            return true
        }
    }
}









// function showFavoriteData(){
//     //Get favorites list from storage
//     let media = JSON.parse(localStorage.getItem('Favorites'))
    
//     //Set favorite card container
//     let favoriteContainer = $('#favorite-cards')
//     favoriteContainer.empty()
//     console.log(media)
   
//     if (media !== null){
//         mediaList = media;
//         for (const media of mediaList) {
//             //Create card with info
//             const newCard = $(`
//                 <div class="group relative">
//                     <div  class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
//                         <img src="${media.poster}" alt="Collection of four insulated travel bottles on wooden shelf." class="h-full w-full object-cover object-center">
//                     </div>
//                     <h3 class="mt-6 text-sm text-gray-500">${media.title}</h3>
//                     <p class="text-base font-semibold text-gray-900">${media.overview}</p>
//                     <button class="icon-btn favorite-btn">❤️ Favorite</button>
//                 </div>
//             `)
            
//             //Add card to favorite containter
//             favoriteContainer.append(newCard)
//         }

//     }
        
// }
// function toggleFavorite(){
    
//     //Get media card and button
//     const favoriteBtn = $(this)
//     const media = favoriteBtn.parent();
    
//     //Save data from this card
//     let item = {
//         poster :media.children().eq(0).children().attr('src'),
//         title : media.children().eq(1).text(),
//         overview : media.children().eq(2).text()
//     }

//     //Get all buttons
    
    
//     //For each button...
//     for (const btn of iconBtns){
//         const iconBtn = $(btn)
        
//         //If the currently pressed button matches any other buttons on screen...
//         if (iconBtn.parent().children().eq(1).text() === media.children().eq(1).text()){
//             //Toggle the class of the pressed button and all matches
//             favoriteBtn.toggleClass('favorite-btn');
//             iconBtn.toggleClass('favorite-btn');
            
//             //Change text depending of if class exists or not
//             if (favoriteBtn.hasClass('favorite-btn')){
//                 favoriteBtn.text('❤️ Favorite')
//                 iconBtn.text('❤️ Favorite')
//             }else{  
//                 favoriteBtn.text('🤍 Add to favorites')
//                 iconBtn.text('🤍 Add to favorites')
//             }
//         }else{ //If the currently pressed button does not have matches
//             iconBtn.toggleClass('favorite-btn')
//         }
//     }

//     if (favoriteBtn.hasClass('favorite-btn')){
//         console.log('yes')
//         //Add to favorites list
//         let favoriteList = JSON.parse(localStorage.getItem('Favorites'))
//         if (favoriteList === null){
//             localStorage.setItem('Favorites',item)
//         }else{
//             favoriteList.push(item)
//             localStorage.setItem('Favorites',item)
//         }
//         showFavoriteData()
    
        
//     }
    // //Remove item from local storage if its in favorite cards and does not have favorite-btn
    // if (media.parent().attr('id') === $('#favorite-cards').attr('id') && !favoriteBtn.hasClass('favorite-btn')){
    //     const favoriteList = JSON.parse(localStorage.getItem('Favorites'))
    //     for (const favoriteItem of favoriteList) {
    //         if(favoriteItem.title === item.title){
    //             console.log(favoriteList,'start')
    //             const favoriteItemIndex = favoriteList.indexOf(favoriteItem)
    //             favoriteList.splice(favoriteItemIndex,1)
    //             console.log(favoriteList,'end')
    //             localStorage.setItem('Favorites',JSON.stringify(favoriteList))
    //         }
    //     }
    // }else{
    //     if (mediaList !== null){
    //         for (let i = 0; i < mediaList.length; i++) {
    //             if(mediaList[i].title === item.title){
    //                 return
    //             } 
    //         }
    //     }
    //     mediaList.push(item)
    //     localStorage.setItem('Favorites',JSON.stringify(mediaList))

    // }
    
    
    // showFavoriteData();
// }

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


