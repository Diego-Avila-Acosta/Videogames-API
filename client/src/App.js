import './App.css';
import {Route} from "react-router-dom"
import {getAllVideogames} from "./redux/Actions"
import {connect} from "react-redux"

function App(props) {

  function HandlerClick(e){
    props.getAllVideogames()
  }


  return (
    <div className="App">
      <button onClick={HandlerClick}>get Videogames</button>
      {
        props.Videogames?.map(videogame =>{
          return <label>{videogame.name}</label>
        })
      }




      {/* <Route path="/" exact>
        <h1>Henry Videogames</h1>  
      </Route>
      <Route path="/home">
        <h2>Home</h2>
      </Route> */}
    </div>
  );
}


const mapStateToProps = state =>{
  return {
    Videogames: state.Videogames
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    getAllVideogames: () => dispatch(getAllVideogames())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
