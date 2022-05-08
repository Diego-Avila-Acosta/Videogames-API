import {Link} from "react-router-dom"

function NavBar(){


    return(
        <nav>
            <Link to="/Home">Home</Link>
            <Link to="/createVideogame">Crear videogame</Link>
        </nav>
    )
}


export default NavBar