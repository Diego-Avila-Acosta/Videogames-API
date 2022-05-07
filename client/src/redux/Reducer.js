import {GET_ALL_GENRES,GET_ALL_VIDEOGAMES,GET_VIDEOGAME,SEARCH_VIDEOGAME} from "./Actions"


const initialState = {
    Videogames: [],
    Genres: [],
    DetailVideogame: {}
}


const rootReducer = function(state = initialState, action){

    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state , Videogames: action.payload}

        case GET_VIDEOGAME: 
            return {...state, DetailVideogame: action.payload}

        case SEARCH_VIDEOGAME: 
            return {...state, Videogames: action.payload}

        case GET_ALL_GENRES: 
            return {...state, Genres: action.payload}

        default:
            return state
    }
}


export default rootReducer;