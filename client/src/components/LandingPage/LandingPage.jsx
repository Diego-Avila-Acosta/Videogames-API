import {Link} from "react-router-dom"
import "./LandingPage.css"


function LandingPage(){


    return (
        <div className="LandingPage">
            <h1 className="Title">Videogames API</h1>
            <Link to="/home"><button className="EnterNow">Enter now</button></Link>
        </div>
    )
}

export default LandingPage