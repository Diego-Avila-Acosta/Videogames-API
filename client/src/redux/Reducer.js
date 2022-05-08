import {GET_ALL_GENRES,GET_ALL_VIDEOGAMES,GET_VIDEOGAME,SEARCH_VIDEOGAME, SORT_VIDEOGAMES} from "./Actions"
import {sort} from "../Sort/Sort.js"


const initialState = {
    videogames: [],
    genres: [],
    detailVideogame: {}
}


const rootReducer = function(state = initialState, action){

    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state , videogames: action.payload}

        case GET_VIDEOGAME: 
            return {...state, detailVideogame: action.payload}

        case SEARCH_VIDEOGAME: 
            return {...state, videogames: action.payload}

        case GET_ALL_GENRES: 
            return {...state, genres: action.payload}
        
        case SORT_VIDEOGAMES:
            return {...state, videogames: [...sort(state.videogames, action.payload)]}
        default:
            return state
    }
}


export default rootReducer;