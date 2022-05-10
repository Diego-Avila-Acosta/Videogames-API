const router = require('express').Router();
const axios = require("axios");
const {API_KEY} = process.env
const logic = require("../logic/Genre.js")
const {Videogame, Genre} = require("../db.js")


// regex ^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$

router.get("/:id", async (req,res) => {
    let busqueda;
    let id = req.params.id
    let url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`

    if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
        
        busqueda = await Videogame.findOne({
            where:{
                id: id
            },
            includes:{
                model: Genre,
                attributes: ["id", "name"],
                through:{
                    attributes:[]
                }
            }
        })
    }else{
        busqueda = await axios({
            method: "get",
            url
        })
    
        busqueda = busqueda.data
    
        busqueda = {
            name: busqueda.name,
            background_image: busqueda.background_image,
            genres: logic.mapGenre(busqueda.genres),
            description: busqueda.description,
            released: busqueda.released,
            rating: busqueda.rating,
            platforms: busqueda.platforms
        }
    }


    res.status(200).send(busqueda)
})


router.post("/", (req, res) => {
    const {id, name, description, released, rating, background_image, platforms, genres} = req.body

    
    Videogame.create({
        id,
        name,
        description,
        released,
        rating,
        background_image,
        platforms
    }).then(data => {
        data.setGenres(genres)
        res.status(200).send(data)
    })
})


module.exports = router