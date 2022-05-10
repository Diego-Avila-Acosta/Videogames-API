import {getAllGenres, getAllVideogames, searchVideogame ,sortVideogames, filterVideogames} from "../../redux/Actions"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState} from "react"
import Cards from "../Cards/Cards"


function Home(){
    let genres = useSelector(state => state.genres)
    let dispatch = useDispatch()
    let [search,setSearch] = useState("")

    useEffect(()=>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())
    },[])

    function handleSearch(){
        dispatch(searchVideogame(search))
    }

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
        <input type="text" name="search" value={search} onChange={(e) => {setSearch(state => e.target.value)}}/>
        <button onClick={handleSearch}>Search</button>

        <p></p>

        <label>Generos:</label>
        <select name="genres" onChange={handleFilter}>
            {
            genres?.map((genre) =>(
                <option value={genre.id}>{genre.name}</option>
            ))
            }
        </select>

        <p></p>

        <label>Rating:</label>

        <button name="rating" value= "ascendent" onClick={handleSort}>Asc</button>
        <button name="rating" value= "descendent" onClick={handleSort}>Desc</button>

        <p></p>
        
        <label>A-Z:</label>
        <button name="name" value= "ascendent" onClick={handleSort}>Asc</button>
        <button name="name" value= "descendent" onClick={handleSort}>Desc</button>

        <p></p>

        <label>DB or API:</label>
        <button name="id" value= "uuid" onClick={handleFilter}>DB</button>
        <button name="id" value= "id" onClick={handleFilter}>API</button>
        <Cards/>
    </>
    )
}



  export default Home
  