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
        if(!genres.length) dispatch(getAllGenres())

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
        <div className="FilterContainer">
            <div>
                <h1 className="FilterText">Filtros</h1>
            </div>
            <div className="Filter">
                <label>Generos:</label>
                <select disabled={loading ? true : false } className="SelectHome" name="genres" onChange={handleFilter}>
                    <option key="all" value="all">All</option>{
                            genres?.map((genre) =>(
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))
                    }
                </select>
            </div>

            <div className="Filter">
                <label>DB or API:</label>
                <select disabled={loading ? true : false }  className="SelectHome" onChange={handleFilter}>
                    <option key="all" value= "all">All</option>
                    <option key="uuid" value= "uuid">Base de Datos</option>
                    <option key="id" value= "id">API</option>
                </select>
            </div>

        
            <div className="Filter">
                <label>Rating:</label>
                <select disabled={loading ? true : false }  className="SelectHome" name= "rating" onChange={handleSort}>
                    <option key="none" value= "none">Ninguno</option>
                    <option key="ascendent" value= "ascendent">Menor</option>
                    <option key="descendent" value= "descendent">Mayor</option>
                </select>
            </div>

        
            <div className="Filter">
                <label>A-Z:</label>
                <select disabled={loading ? true : false }  className="SelectHome" name="name" onChange={handleSort}>
                    <option key="none" value= "none">Ninguno</option>
                    <option key="ascendent" value= "ascendent">Ascendente</option>
                    <option key="descendent" value= "descendent">Descendente</option>
                </select>
            </div>
        </div>

        <div className="MainContainer">
            <div className="Search">
                <input className="InputSearch" type="text" name="search" value={search} onChange={(e) => {setSearch(state => e.target.value)}}/>
                <button className="ButtonSearch" onClick={handleSearch}>Search</button>
            </div>
            {loading && <Loading/>}
            {videogames && <Cards videogames={videogames}/>}
            {error && <Error msg={error}/>}
        </div>
    </div>
    )
}

  export default Home
  