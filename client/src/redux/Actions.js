export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES"
export const GET_VIDEOGAME = "GET_VIDEOGAME"
export const SEARCH_VIDEOGAME = "SEARCH_VIDEOGAME"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const SORT_VIDEOGAMES = "SORT_VIDEOGAMES"
export const FILTER_VIDEOGAMES = "FILTER_VIDEOGAMES"
// const POST_VIDEOGAME = "POST_VIDEOGAME"


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
            dispatch({
                type:GET_VIDEOGAME,
                payload: data
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
            dispatch({
                type:SEARCH_VIDEOGAME,
                payload:data
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

// const postVideogame = () =>{
//     return async function(dispatch){
//         return fetch("")
//         .then(response => response.json())
//         .then(data => {
//             dispatch({
//                 type:POST_VIDEOGAME,
//                 payload:
//             })
//         })
//     }
// }