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


function CreateVideogame(props){
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

    useEffect(() => {
        dispatch(getAllGenres());
    },[])

    function handleInput(e){
        let name = e.target.name
        setState( {
            ...state,
                [name]: name === "genres" ? [...state.genres, e.target.options[e.target.selectedIndex].value] : e.target.value
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

    function prueba(e){
        console.log("boton")
    }

    return (
        <form>
            {console.log(state)}
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
            <input name="rating" onChange={handleInput} value={state.rating} type="number"></input>

            <p></p>

            <label>Select:</label>
            <select name="genres" onChange={handleInput}>
            {
            genres ? genres.map(genre =>(
                <option value={[genre.id , genre.name]}>{genre.name}</option>
            )) : null
            }
            </select>

            <p></p>

            <ul>
                {state.genres?.map(genre => {})}
            </ul>
            <button type="button">asd</button>
        </form>
    )
}





export default CreateVideogame