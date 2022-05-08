import './App.css';
import {Route} from "react-router-dom"
import Home from './components/Home/Home.jsx';
import {Link} from "react-router-dom"
import DetailVideogame from "./components/DetailVideogame/DetailVideogame.jsx"
import CreateVideogame from './components/CreateVideogame/CreateVideogame';

function App() {

  return (
    <div className="App">
      <Route path="/" exact>
        <h1>Henry Videogames</h1>
        <Link to="/home"> Home</Link>
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/videogame/:id" component={DetailVideogame}/>

      <Route path="/createVideogame" component={CreateVideogame}/>
    </div>
  );
}


export default App
