import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"
import "./Cards.css"

const items_Per_Page = 15

function setButtons(length, cb){
    let array = []
    length = Math.ceil(length/items_Per_Page)
    for (let i = 0; i < length; i++) {
        array.push(cb(i))
    }
    return array
}


function Cards(){
    const videogames = useSelector(state => state.videogames)
    const [items,setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    function handleClick(e){
        let i = Number(e.target.value)
        changePage(i)
        setCurrentPage(i)
    }

    function changePage(currentPage){
        let aux = [...videogames]
        setItems(aux.splice((currentPage)*items_Per_Page, items_Per_Page))
    }

    useEffect(()=>{
        setCurrentPage(0)
        changePage(0)
    },[videogames])

    function setterButtons(i){
        return (<button disabled={currentPage === i} value={i} onClick={handleClick}>{i+1}</button>)
    }

    return(
        <div className="Cards">
            <nav>

                <button disabled={currentPage == 0} value={currentPage-1} onClick={handleClick}>Prev</button>
                {setButtons(videogames.length, setterButtons)}
                <button disabled={(currentPage+1)*items_Per_Page >= videogames.length} value={currentPage+1} onClick={handleClick}>Next</button>
            </nav>

            
            <div>
            {items?.map(game => (
                <Card 
                key = {game.id}
                id = {game.id}
                name= {game.name} 
                background_image= {game.background_image}
                genres = {game.genres} />
                ))
                
            }
            </div>
        </div>
    )

}


export default Cards