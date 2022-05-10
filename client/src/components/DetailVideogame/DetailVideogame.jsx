import {getVideogame} from "../../redux/Actions.js"
import {useSelector , useDispatch} from "react-redux"
import { useEffect } from "react"




function DetailVideogame(props){
    const detailVideogame = useSelector(state => state.detailVideogame)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getVideogame(props.match.params.id))
    },[])

    return(
        <>
        {   
            detailVideogame ? (
                <div>
                    <h1>{detailVideogame.name}</h1>
                    <img src={detailVideogame.background_image} alt={detailVideogame.name} />
                    <p>{detailVideogame.description}</p>
                    <p>{detailVideogame.rating}</p>
                    <p>{detailVideogame.released}</p>
                    <ul>
                        {detailVideogame.genres?.map(genre => (<li>{genre.name}</li>))}
                    </ul>
                    {console.log(detailVideogame.platforms)}
                    <p>{detailVideogame.platforms?.map(platform => platform["platform"].name).join("/")}</p>
                    
                </div>
            ) : <h1>No se encontró el videojuego</h1>
        }
        </>
    )
}




export default DetailVideogame