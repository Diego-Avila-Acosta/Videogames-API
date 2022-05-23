import {Link} from "react-router-dom"
import "./NavBar.css"
import joystick from "../../Assets/Joystick.png"

function NavBar(){


    return(
        <div>

        <nav className="NavBar">
            <img className="Joystick" src={joystick} alt="joystick" />
            <Link className="Link" to="/Home">Home</Link>
            <Link className="Link" to="/createVideogame">Crear videojuego</Link>
        </nav>
        </div>
    )
}


export default NavBar