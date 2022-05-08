import {getAllGenres, getAllVideogames, sortVideogames, filterVideogames} from "../../redux/Actions"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react"
import Cards from "../Cards/Cards"


function Home(){
    let genres = useSelector(state => state.genres)
    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
    },[])


    function handleSort(e){
        dispatch(sortVideogames({
            name: e.target.name,
            value: e.target.value
        }))
    }

    function handleFilter(e){
        dispatch(filterVideogames(e.target.value))
    }



    return(
    <>  
        <label>Generos:</label>
        <select name="genres" onChange={handleFilter}>
            {
            genres?.map((genre) =>(
                <option value={genre.id}>{genre.name}</option>
            ))
            }
        </select>
        <p></p>
        <label >Rating:</label>
        <button name="rating" value= "ascendent" onClick={handleSort}>Asc</button>
        <button name="rating" value= "descendent" onClick={handleSort}>Desc</button>
        <p></p>
        <label >A-Z:</label>
        <button name="name" value= "ascendent" onClick={handleSort}>Asc</button>
        <button name="name" value= "descendent" onClick={handleSort}>Desc</button>
        <Cards/>
    </>
    )
}



  export default Home
  