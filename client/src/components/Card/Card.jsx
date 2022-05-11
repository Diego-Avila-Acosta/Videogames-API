import {Link} from "react-router-dom"
import "./Card.css"

function Card(props){


    return(
        <div className="Card">
            <div className="Background">
                <img className="Image" src={props.background_image} alt={props.name}/>
            </div>

            <div className="Info">
            <Link to={`/videogame/${props.id}`} className="Name"><h2>{props.name}</h2></Link>
            {/*<span>Generos: {props.genres?.map(genre => genre.name).join(",")}</span>*/}
            <ul>
                {
                    props.genres?.map(genre => (
                        <li>{genre.name}</li>
                        ))
                    }
            </ul>
            </div>
    </div>
    )
}

export default Card