import {GET_ALL_GENRES,GET_ALL_VIDEOGAMES,GET_VIDEOGAME,SEARCH_VIDEOGAME, SORT_VIDEOGAMES, FILTER_VIDEOGAMES, POST_VIDEOGAME, SET_ERROR, CLEAN_ERROR} from "./Actions"
import Sort from "../Utils/Sort.js"
import Filter from "../Utils/Filter.js"


const initialState = {
    videogames: null,
    genres: [],
    detailVideogame: null,
    error: null
}

let aux = [];
let auxSort = [];
let videogames = [];


const rootReducer = function(state = initialState, action){

    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state , videogames: action.payload}

        case GET_VIDEOGAME: 
            return {...state, detailVideogame: action.payload}

        case SEARCH_VIDEOGAME:
            if(!action.payload){
                return {...state, videogames: [...aux], error: null}
            }
           if(!aux.length) aux = state.videogames
            return {...state, videogames: action.payload}

        case GET_ALL_GENRES: 
            return {...state, genres: action.payload}
        
        case SORT_VIDEOGAMES:
            let sort = new Sort()
            if(!auxSort.length)auxSort = [...state.videogames]
            if(action.payload.value === "none"){
                if(auxSort.length){
                    videogames = [...auxSort]
                    auxSort = []
                }
                else videogames = state.videogames
            }else{
                videogames = [...sort.sort(state.videogames, sort[action.payload.value], action.payload.name)]
            }

            return {...state, videogames}

        case FILTER_VIDEOGAMES:
            let filter = new Filter()
            let error = null
            auxSort = []

            if(aux.length) state.videogames  = aux
            else aux = state.videogames

            if(action.payload === "id" || action.payload === "uuid"){
                videogames = filter.idFilter(state.videogames, action.payload)
            }else if(action.payload === "all"){
                videogames =  [...aux]
                aux = []
            }else{
                videogames = filter.genreFilter(state.videogames, Number(action.payload))
            }

            if(!videogames.length) error = "404: Games Not Found"

            return {...state, videogames, error}

        case POST_VIDEOGAME:
            return {...state, videogames: [...state.videogames, action.payload]}

        case SET_ERROR:

            aux = state.videogames 
            return {...state, videogames:[] ,error: action.payload}

        case CLEAN_ERROR:
            return {...state, error: null}

        default:
            return state
    }
}


export default rootReducer;