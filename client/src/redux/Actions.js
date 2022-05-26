export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES"
export const GET_VIDEOGAME = "GET_VIDEOGAME"
export const SEARCH_VIDEOGAME = "SEARCH_VIDEOGAME"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const SORT_VIDEOGAMES = "SORT_VIDEOGAMES"
export const FILTER_VIDEOGAMES = "FILTER_VIDEOGAMES"
export const POST_VIDEOGAME = "POST_VIDEOGAME"
export const SET_ERROR = "SET_ERROR"
export const CLEAN_ERROR = "CLEAN_ERROR"


export const getAllVideogames = () =>{
    return async function(dispatch){
        return fetch("http://localhost:3001/videogames")
        .then(response => response.json())
        .then(data => {
            dispatch({
                type:GET_ALL_VIDEOGAMES,
                payload: data
            })
        })
    }
}

export const getVideogame = (id) =>{
    return async function(dispatch){
        return fetch(`http://localhost:3001/videogame/${id}`)
        .then(response => response.json())
        .then(data => {
            if(data.error)throw new Error(data.error)
            dispatch({
                type:GET_VIDEOGAME,
                payload: data
            })
        }).catch(error =>{
            dispatch({
                type:SET_ERROR,
                payload: error.message
            })
        })
    }
}

export const searchVideogame = (name) =>{
    if(!name) return {
        type: SEARCH_VIDEOGAME,
        payload: name
    }
    return async function(dispatch){
        return fetch(`http://localhost:3001/videogames?name=${name}`)
        .then(response => response.json())
        .then(data => {
            if(data.error)throw new Error(data.error)
            dispatch({
                type:SEARCH_VIDEOGAME,
                payload:data
            })
        })
        .catch(error =>{
            dispatch({
                type:SET_ERROR,
                payload: error.message
            })
        })
    }
}


export const getAllGenres = () =>{
    return async function(dispatch){
        return fetch("http://localhost:3001/genres")
        .then(response => response.json())
        .then(data => {
            dispatch({
                type:GET_ALL_GENRES,
                payload: data
            })
        })
    }
}


export const sortVideogames = (obj) =>{
    return {
        type: SORT_VIDEOGAMES,
        payload: obj
    }
}

export const filterVideogames= (value) => {
    return {
        type: FILTER_VIDEOGAMES,
        payload: value
    }
}

export const postVideogame = (game) =>{
    return async function(dispatch){
        return fetch("http://localhost:3001/videogame", {
            method: "post",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
          })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type:POST_VIDEOGAME,
                payload: data
            })
        }).catch(error => {
        })
    }
}

export const cleanError = () =>{
    return {
        type: CLEAN_ERROR
    }
}
