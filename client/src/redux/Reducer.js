import {GET_ALL_GENRES,GET_ALL_VIDEOGAMES,GET_VIDEOGAME,SEARCH_VIDEOGAME, SORT_VIDEOGAMES, FILTER_VIDEOGAMES, POST_VIDEOGAME} from "./Actions"
import Sort from "../Utils/Sort.js"
import Filter from "../Utils/Filter.js"


const initialState = {
    videogames: [],
    genres: [],
    detailVideogame: {}
}

let aux = [];
let auxSort = [];


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
            if(action.payload.value === "none"){
                return {...state, videogames: [...auxSort]}
            }
            if(!auxSort.length)auxSort = [...state.videogames]


            return {...state, videogames: [...sort.sort(state.videogames, sort[action.payload.value], action.payload.name)]}

        case FILTER_VIDEOGAMES:
            let filter = new Filter()
            let videogames

            if(aux.length) state.videogames  = aux
            else aux = state.videogames

            if(isNaN(Number(action.payload))){
                videogames = filter.idFilter(state.videogames, action.payload)
            }else if(action.payload === "all"){
                videogames =  aux
                aux = null
            }else{
                videogames = filter.genreFilter(state.videogames, Number(action.payload))
            }

            return {...state, videogames}
        case POST_VIDEOGAME:
            return {...state, videogames: [...state.videogames, action.payload]}
        default:
            return state
    }
}


export default rootReducer;