import { useEffect, useState } from "react"
import Card from "../Card/Card"
import "./Cards.css"

const ITEMS_PER_PAGE = 15

function setButtons(length, cb){
    let array = []
    length = Math.ceil(length/ITEMS_PER_PAGE)
    for (let i = 0; i < length; i++) {
        array.push(cb(i))
    }
    return array
}


function Cards({videogames}){
    const [items,setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    function handleClick(e){
        let i = Number(e.target.value)
        changePage(i)
        setCurrentPage(i)
    }

    function changePage(currentPage){
        let aux = [...videogames]
        setItems(aux.splice((currentPage)*ITEMS_PER_PAGE, ITEMS_PER_PAGE))
    }

    useEffect(()=>{
        setCurrentPage(0)
        changePage(0)
    },[videogames])

    function setterButtons(i){
        return (<button className="ButtonPaginado" disabled={currentPage === i} value={i} onClick={handleClick}>{i+1}</button>)
    }

    return(
        <div className="Cards">
            <nav className="Paginado">
                <button className="ButtonPaginado" disabled={currentPage == 0} value={currentPage-1} onClick={handleClick}>Prev</button>
                {setButtons(videogames.length, setterButtons)}
                <button className="ButtonPaginado" disabled={(currentPage+1)*ITEMS_PER_PAGE >= videogames.length} value={currentPage+1} onClick={handleClick}>Next</button>
            </nav>        
            <div className="Items">
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