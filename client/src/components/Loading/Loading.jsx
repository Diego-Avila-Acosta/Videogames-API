import loading from "../../Assets/Loading.gif"
import "./Loading.css"


function Loading(){

    return(
        <div className="LoadingContainer">
            <img className="Loading" src={loading} alt="Loading" />
        </div>
    )
}



export default Loading