import {getAllVideogames, sortVideogames} from "../../redux/Actions"
import {useDispatch} from "react-redux"
import { useEffect } from "react"
import {descendent,ascendent} from "../../Sort/Sort"
import Cards from "../Cards/Cards"


function Home(){

    let dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllVideogames())
    },[])

    return(
    <>  
        <button onClick={() => dispatch(sortVideogames(ascendent))}>Asc</button>
        <button onClick={() => dispatch(sortVideogames(descendent))}>Desc</button>
        <Cards/>
    </>
    )
}



  export default Home
  