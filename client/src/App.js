import './App.css';
import {Route, useLocation, Switch} from "react-router-dom"
import Home from './components/Home/Home.jsx';
import DetailVideogame from "./components/DetailVideogame/DetailVideogame.jsx"
import CreateVideogame from './components/CreateVideogame/CreateVideogame.jsx';
import LandingPage from "./components/LandingPage/LandingPage.jsx"
import NavBar from "./components/NavBar/NavBar.jsx"
import Error from './components/Error/Error.jsx';

function App() { 
  
  const Location = useLocation()


  return (
    <div className="App">
      {Location.pathname  !== "/" ? <NavBar/>: null}
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" component={Home}/>
        <Route path="/videogame/:id" component={DetailVideogame}/>
        <Route path="/createVideogame" component={CreateVideogame}/>
        <Route path="*" render={() => (<Error msg={"404: Page not Found"}/>)}/>
      </Switch>
    </div>
  );
}


export default App
