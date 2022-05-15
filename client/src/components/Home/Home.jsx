import {getAllGenres, getAllVideogames, searchVideogame ,sortVideogames, filterVideogames, cleanError} from "../../redux/Actions"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState} from "react"
import Cards from "../Cards/Cards.jsx"
import Loading from "../Loading/Loading.jsx"
import Error from "../Error/Error.jsx"
import "./Home.css"


function Home(){
    let genres = useSelector(state => state.genres)
    let videogames = useSelector(state => state.videogames)
    let error = useSelector(state => state.error)
    let dispatch = useDispatch()
    let [search,setSearch] = useState("")
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
        dispatch(getAllVideogames())
        dispatch(getAllGenres())

        return () => {
            dispatch(cleanError())
        }
    },[])

    useEffect(()=>{
        if(videogames) setLoading(false)
    },[videogames])


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
    <div className="Home">
        <div>
            <div>
                <label>Generos:</label>
                <select name="genres" onChange={handleFilter}>
                    <option value="all">All</option>{
                            genres?.map((genre) =>(
                                <option value={genre.id}>{genre.name}</option>
                            ))
                    }
                </select>
            </div>

            <div>
                <label>DB or API:</label>
                <select onChange={handleFilter}>
                    <option value= "all">All</option>
                    <option value= "uuid">Base de Datos</option>
                    <option value= "id">API</option>
                </select>
            </div>

        
            <div>
                <label>Rating:</label>
                <select name= "rating" onChange={handleSort}>
                    <option value= "none">Ninguno</option>
                    <option value= "ascendent">Menor</option>
                    <option value= "descendent">Mayor</option>
                </select>
            </div>

        
            <div>
                <label>A-Z:</label>
                <select name="name" onChange={handleSort}>
                    <option value= "none">Ninguno</option>
                    <option value= "ascendent">Ascendente</option>
                    <option value= "descendent">Descendente</option>
                </select>
            </div>
        </div>

        <div className="MainContainer">
            <div className="Search">
                <input type="text" name="search" value={search} onChange={(e) => {setSearch(state => e.target.value)}}/>
                <button onClick={handleSearch}>Search</button>
            </div>
            
            {loading && <Loading/>}
            {videogames && <Cards videogames={videogames}/>}
            {error && <Error msg={error}/>}
        </div>
    </div>
    )
}

  export default Home
  