import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {getAllGenres} from "../../redux/Actions"

/*
Ruta de creación de videojuegos: debe contener

1. [] Un formulario controlado con JavaScript con los siguientes campos: Nombre, Descripción, Fecha de lanzamiento y Rating
2. [] Posibilidad de seleccionar/agregar varios géneros
3. [] Posibilidad de seleccionar/agregar varias plataformas
4. [] Botón/Opción para crear un nuevo videojuego
*/

function CreateVideogame(){
    const [state,setState] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0.0,
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

        let name = e.target.name
        setState( {
            ...state,
                [name]: name === "genres" || name === "platforms" ? [...state[name], e.target.options[e.target.selectedIndex].value] : e.target.value
            })

        setErrors(handleErrors({
            ...state,
            [name]: e.target.value
        }))
    }

    function handleErrors(state){
        let errors = {}
        if(!state.name) errors.name = "Se requiere un nombre"
        return errors
    }

    function handleClickGenre(e){
        setState(state => {
            return {...state, genres: state.genres.filter(genre => genre != e.target.value)}
        })
    }

    return (
        <form>
            <label>Nombre:</label>
            <input name="name" onChange={handleInput} value={state.name} type="text"></input>
            {errors.name ? <label>{errors.name}</label> : null }
            <p></p>

            <label>Descripción:</label>
            <textarea name="description" onChange={handleInput} value={state.description}></textarea>

            <p></p>

            <label>Fecha de lanzamiento:</label>
            <input name="released" onChange={handleInput} value={state.released}></input>

            <p></p>

            <label>Rating:</label>
            <input type="range" min={0} max={5} name="rating" onChange={handleInput} value={state.rating} ></input>

            <p></p>

            <label>Generos:</label>
            <select name="genres" onChange={handleInput}>
            {
            genres?.map((genre, i) =>(
                <option value={i}>{genre.name}</option>
            ))
            }
            </select>

            <p></p>

            <ul>
                {state.genres?.map(genre => (
                    <li>
                        <label>{genres[genre].name}</label>
                        <button type = "button" value={genre} onClick={handleClickGenre}>x</button>
                    </li>
                ))}
            </ul>

            <p></p>

            <label>Plataformas</label>
            <select name="platforms" onChange={handleInput}>
                    {platforms.map((platform,i) => (<option value={platform} >{platform}</option>))}
            </select>

            <ul>
                {state.platforms?.map(platform => (
                    <li>
                        <label>{platform}</label>
                    </li>
                ))}
            </ul>
        </form>
    )
}





export default CreateVideogame