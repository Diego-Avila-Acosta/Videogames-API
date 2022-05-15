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
                <div>
                    <div className="TitleContainer">
                        <h1>{detailVideogame.name}</h1>
                    </div>
                    <div className="InfoContainer">
                        <div className="TextContainer">
                            <div>
                                <p>{detailVideogame.rating}</p>
                            </div>
                            <div>
                                <p>{detailVideogame.released}</p>
                            </div>
                            <div>
                                <ul>
                                    {detailVideogame.genres?.map(genre => (<li>{genre.name}</li>))}
                                </ul>
                            </div>
                            <div>
                                <p>{typeof detailVideogame.platforms !== "string" ? detailVideogame.platforms?.map(platform => platform["platform"].name).join("/") : detailVideogame.platforms}</p>
                            </div>
                        </div>
                        <div className="ImgDescContainer">
                            <div>
                                <img className="Background_Image" src={detailVideogame.background_image} alt={detailVideogame.name} />
                            </div>
                            <div>
                                <p>{detailVideogame.description}</p>
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