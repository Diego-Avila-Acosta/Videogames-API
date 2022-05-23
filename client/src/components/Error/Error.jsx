import "./Error.css"


function Error({msg}){

    return(
        <div className="ContenedorError">
            <div className="Error">
                <p className="MessageError">{msg}</p>
            </div>
        </div>
    )

}




export default Error