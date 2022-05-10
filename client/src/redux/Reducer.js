import {GET_ALL_GENRES,GET_ALL_VIDEOGAMES,GET_VIDEOGAME,SEARCH_VIDEOGAME, SORT_VIDEOGAMES, FILTER_VIDEOGAMES} from "./Actions"
import Sort from "../Sort/Sort.js"


const initialState = {
    videogames: [],
    genres: [],
    detailVideogame: {}
}

let aux = [];


const rootReducer = function(state = initialState, action){

    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state , videogames: action.payload}

        case GET_VIDEOGAME: 
            return {...state, detailVideogame: action.payload}

        case SEARCH_VIDEOGAME:
            if(!action.payload){
                return {...state, videogames: [...aux]}
            }
            else aux = state.videogames
            return {...state, videogames: action.payload}

        case GET_ALL_GENRES: 
            return {...state, genres: action.payload}
        
        case SORT_VIDEOGAMES:
            let sort = new Sort()
            if(aux.length) state.videogames  = aux
            return {...state, videogames: [...sort.sort(state.videogames, sort[action.payload.value] , action.payload.name)]}

        case FILTER_VIDEOGAMES:
            if(aux.length) state.videogames  = aux
            aux = state.videogames
            return {...state, videogames: [...state.videogames.filter(videogame => {
                for (let i = 0; i < videogame.genres.length; i++) {
                    if(videogame.genres[i].id === Number(action.payload)) return true
                }
                return false
            })]}
        default:
            return state
    }
}


export default rootReducer;