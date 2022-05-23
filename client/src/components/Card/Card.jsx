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
                <h3 className="Genres">Generos:</h3>
                <ul>
                    {
                        props.genres?.map(genre => (
                            <li key={genre.name} className="ListGenres">{genre.name}</li>
                            ))
                        }
                </ul>
            </div>
    </div>
    )
}

export default Card