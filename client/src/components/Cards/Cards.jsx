import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"

function setButtons(length, cb){
    let array = []
    for (let i = 0; i < Math.ceil(length/15); i++) {
        array.push(cb(i))
    }
    return array
}


function Cards(){
    const items_Per_Page = 15
    const videogames = useSelector(state => state.videogames)
    const [items,setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    let aux

    function handleClick(e){
        let i = Number(e.target.value)
        handle(i)
        setCurrentPage(i)
    }

    function handle(currentPage){
        aux = [...videogames]
        setItems(aux.splice((currentPage)*15,items_Per_Page))
    }

    useEffect(()=>{
        handle(currentPage)
    },[videogames])

    function setterButtons(i){
        return (<button disabled={currentPage === i} value={i} onClick={handleClick}>{i+1}</button>)
    }

    return(
        <>
            <nav>
                <button disabled={currentPage == 0} value={currentPage-1} onClick={handleClick}>Prev</button>
                {setButtons(videogames.length, setterButtons)}
                <button disabled={(currentPage+1)*15 >= videogames.length} value={currentPage+1} onClick={handleClick}>Next</button>
            </nav>

            
            {items?.map(game => (
                
                <Card 
                id = {game.id}
                name= {game.name} 
                background_image= {game.background_image}
                genres = {game.genres} />
            ))

            }
        </>
    )

}


export default Cards