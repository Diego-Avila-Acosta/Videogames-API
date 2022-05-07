import {getVideogame} from "../../redux/Actions.js"
import {connect} from "react-redux"
import { useEffect } from "react"



function DetailVideogame(props){

    useEffect(()=>{
        props.getVideogame(props.match.params.id)
    },[])

    return(
        <>
        {
            props.detailVideogame ? (
                <div>
                    <h1>{props.detailVideogame.name}</h1>
                </div>
            ) : <h1>No se encontró el videojuego</h1>
        }
        </>
    )
}

const mapStateToProps = state => {
    return {
        detailVideogame: state.detailVideogame
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getVideogame: id => dispatch(getVideogame(id))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(DetailVideogame)