import {cleanError, getVideogame} from "../../redux/Actions.js"
import {useSelector , useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import Loading from "../Loading/Loading.jsx"
import Error from "../Error/Error.jsx"
import "./DetailVideogame.css"



function DetailVideogame(props){
    const detailVideogame = useSelector(state => state.detailVideogame)
    const error = useSelector(state => state.error)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        dispatch(getVideogame(props.match.params.id))

        return () => {
            dispatch(cleanError())
        }
    },[])

    useEffect(()=>{
        if(detailVideogame || error) setLoading(false)
    },[detailVideogame, error])

    return (
            <>
            {loading && <Loading/>}
            {detailVideogame &&
                <div className="MainDetail">
                    <div className="DetailContainer">
                        <div className="TitleContainer">
                            <h1>{detailVideogame.name}</h1>
                        </div>
                        <div className="InfoContainer">
                            <div className="TextContainer">
                                <div className="DivText">
                                    <h2>Rating</h2>
                                    <p>{detailVideogame.rating}</p>
                                </div>
                                <div className="DivText">
                                    <h2>Fecha de lanzamiento</h2>
                                    <p>{detailVideogame.released}</p>
                                </div>
                                <div className="DivText">
                                    <h2>Generos</h2>
                                    <ul>
                                        {detailVideogame.genres?.map(genre => (<li>{genre.name}</li>))}
                                    </ul>
                                </div>
                                <div className="DivText">
                                    <h2>Plataformas</h2>
                                    <p>{typeof detailVideogame.platforms !== "string" ? detailVideogame.platforms?.map(platform => platform["platform"].name).join("/") : detailVideogame.platforms}</p>
                                </div>
                            </div>
                            <div className="ImgDescContainer">
                                <div>
                                    <img className="Background_Image" src={detailVideogame.background_image} alt={detailVideogame.name} />
                                </div>
                                <div className="DescriptionContainer">
                                    <p>{detailVideogame.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {error && <Error msg={error}/>}
        </>
    )
}




export default DetailVideogame