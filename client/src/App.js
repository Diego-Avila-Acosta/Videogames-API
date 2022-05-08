import './App.css';
import {Route} from "react-router-dom"
import Home from './components/Home/Home.jsx';
import DetailVideogame from "./components/DetailVideogame/DetailVideogame.jsx"
import CreateVideogame from './components/CreateVideogame/CreateVideogame.jsx';
import LandingPage from "./components/LandingPage/LandingPage.jsx"
import NavBar from "./components/NavBar/NavBar.jsx"

function App() {

  return (
    <div className="App">
      <Route path="/" component={NavBar}/>
      <Route path="/" exact component={LandingPage} />
      <Route path="/home" component={Home}/>
      <Route path="/videogame/:id" component={DetailVideogame}/>
      <Route path="/createVideogame" component={CreateVideogame}/>
    </div>
  );
}


export default App
