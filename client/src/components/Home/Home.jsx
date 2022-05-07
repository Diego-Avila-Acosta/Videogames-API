import {getAllVideogames} from "../../redux/Actions"
import {connect} from "react-redux"
import { useEffect } from "react"


function Home(props){

    useEffect(()=>{
        props.getAllVideogames()
    },[])

    return(
    <>
        {
        props.videogames?.map(videogame => (
            <div>
                <h1>{videogame.name}</h1>
                <ul>
                    {
                    videogame.genres.map(genre => (
                        <li>{genre.name}</li>
                    ))
                    }
                </ul>
                <img src={videogame.background_image} alt={videogame.name}/>
            </div>
        ))
        }
    </>
    )
}


const mapStateToProps = state =>{
    return {
      videogames: state.videogames
    }
  }
  
  const mapDispatchToProps = dispatch =>{
    return{
      getAllVideogames: () => dispatch(getAllVideogames())
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home)
  