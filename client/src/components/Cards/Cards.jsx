import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"


function Cards(){
    const items_Per_Page = 15
    const videogames = useSelector(state => state.videogames)
    const [items,setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    let aux

    function handleClick(e){
        let i = currentPage
        if(e.target.name === "previous"){
            i--
            handle(i)
            setCurrentPage(i)
        } 
        else {
            i++
            handle(i)
            setCurrentPage(i)
        }
    }

    function handle(currentPage){
        aux = [...videogames]
        setItems(aux.splice((currentPage)*15,items_Per_Page))
    }

    useEffect(()=>{
        handle(currentPage)
    },[videogames])
    return(
        <>
            <nav>
                <button disabled={currentPage == 0 ? true : false} name= "previous" onClick={handleClick}>Prev</button>
                <label>{currentPage+1}</label>
                <button disabled={currentPage == 6 ? true : false} name= "next" onClick={handleClick}>Next</button>
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