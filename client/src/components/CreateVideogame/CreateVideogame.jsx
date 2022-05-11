import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {getAllGenres, postVideogame} from "../../redux/Actions"

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

function CreateVideogame(){
    const [state,setState] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0.0,
        background_image: "",
        genres: [],
        platforms:[]
    })
    
    const [errors,setErrors] = useState({})
    const genres = useSelector(state => state.genres)
    const dispatch = useDispatch()
    const platforms = ["Xbox 360", "PlayStation 5", "PlayStation 3", "PlayStation 4", "Xbox One", "PC", "Nintendo Switch"]

    useEffect(() => {
        dispatch(getAllGenres());
    },[])

    function handleInput(e){
        let check = true
        let name = e.target.name
        if(name === "genres" || name === "platforms") check = !state[name].includes(e.target.value)
        if(check){
            setState( {
                ...state,
                    [name]: name === "genres" || name === "platforms" ? [...state[name], e.target.options[e.target.selectedIndex].value] : e.target.value
                })
    
            setErrors(handleErrors({
                ...state,
                [name]: e.target.value
            }))
        }
    }

    function handleErrors(state){
        let errors = {}
        if(!state.name) errors.name = "Se requiere un nombre"
        if(!state.description) errors.description = "Se requiere una descripción"
        if(!state.genres.length) errors.genres = "Se requiere algun genero"
        if(!state.platforms.length) errors.platforms = "Se requiere alguna plataforma"
        if(!validURL(state.background_image)) errors.background_image = "La URL tiene que ser valida"
        if(!state.background_image) errors.background_image = "Se requiere alguna URL"
        return errors
    }

    function handleClickSelect(e){
        let name = e.target.name
        setState(state => {
            return {...state, [name]: state[name].filter(element => element != e.target.value)}
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        let generos = []
        state.genres.forEach(i => {
            generos.push(genres[i].id)
        })
        dispatch(postVideogame({
            name: state.name,
            description: state.description,
            background_image: state.background_image,
            rating: Number(state.rating),
            released: state.released,
            genres: generos,
            platforms: state.platforms.join("/")
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            {console.log(state.genres)}
            <label>Nombre:</label>
            <input name="name" onChange={handleInput} value={state.name} type="text"></input>
            {errors.name ? <label>{errors.name}</label> : null }
            <p></p>

            <label>Descripción:</label>
            <textarea name="description" onChange={handleInput} value={state.description}></textarea>
            {errors.description ? <label>{errors.description}</label> : null }
            <p></p>

            <label>Fecha de lanzamiento:</label>
            <input name="released" type="date" onChange={handleInput} value={state.released}></input>

            <p></p>

            <label>Rating:</label>
            <input type="range" min={0} max={5} name="rating" onChange={handleInput} value={state.rating} ></input>
            <label>{state.rating}</label>
            <p></p>

            <label>Generos:</label>
            <select name="genres" onChange={handleInput}>
            <option value="" selected disabled hidden>Selecionar genero</option>
            {
            genres?.map((genre, i) =>(
                <option value={i}>{genre.name}</option>
            ))
            }
            </select>
            {errors.genres ? <label>{errors.genres}</label> : null }
            <p></p>

            <ul>
                {state.genres?.map(genre => (
                    <li>
                        <label>{genres[genre].name}</label>
                        <button name="genres" type ="button" value={genre} onClick={handleClickSelect}>x</button>
                    </li>
                ))}
            </ul>

            <p></p>

            <label>Plataformas</label>
            <select name="platforms" onChange={handleInput}>
            <option value="" selected disabled hidden>Selecionar plataforma</option>
                    {platforms.map((platform) => (<option value={platform} >{platform}</option>))}
            </select>
            {errors.platforms ? <label>{errors.platforms}</label> : null }
            <p></p>


            <ul>
                {state.platforms?.map(platform => (
                    <li>
                        <label>{platform}</label>
                        <button name="platforms" type="button" value={platform} onClick={handleClickSelect}>x</button>
                    </li>
                ))}
            </ul>

            

            <p></p>

            <label>Imagen (URL):</label>
            <input type="text" name="background_image" onChange={handleInput} value={state.background_image}/>
            <div></div>
            <button type="submit">submit</button>
        </form>
    )
}

export default CreateVideogame