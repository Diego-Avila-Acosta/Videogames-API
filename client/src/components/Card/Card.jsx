import {Link} from "react-router-dom"

function Card(props){


    return(
        <div>
            <Link to={`/videogame/${props.id}`}><h1>{props.name}</h1></Link>
            <ul>
                {
                props.genres?.map(genre => (
                    <li>{genre.name}</li>
                    ))
                }
            </ul>
            <img width={"30%"} height={"30%"} src={props.background_image} alt={props.name}/>
    </div>
    )
}

export default Card