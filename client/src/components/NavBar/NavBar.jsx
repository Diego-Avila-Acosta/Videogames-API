import {Link} from "react-router-dom"
import "./NavBar.css"

function NavBar(){


    return(
        <div>


        <nav className="NavBar">
            <Link to="/Home">Home</Link>
            <Link to="/createVideogame">Crear videogame</Link>
        </nav>
        </div>
    )
}


export default NavBar