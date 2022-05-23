const router = require('express').Router();
const axios = require("axios");
const {API_KEY} = process.env
const logic = require("../logic/Genre.js")
const {Videogame, Genre} = require("../db.js")

function isUUID(uuid){
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid)
}


router.get("/:id", (req,res) => {
    let id = req.params.id
    let url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`

    if(isUUID(id)){

        Videogame.findOne({
            where:{
                id: id
            },
            include:{
                model: Genre,
                attributes: ["id", "name"],
                through:{
                    attributes:[]
                }
            }
        })
        .then(videogame => {
            if(!videogame) res.status(404).send({error: "404: Game Not Found"})
            else res.status(200).send(videogame)
        }).catch(error => {
            res.status(400).json(error)
        })
    }else{
        axios.get(url)
        .then(response => response.data)
        .then(data => {
            data = {
                name: data.name,
                background_image: data.background_image,
                genres: logic.mapGenre(data.genres),
                description: data.description_raw,
                released: data.released,
                rating: data.rating,
                platforms: data.platforms
            }
            res.status(200).send(data)
        })
        .catch(error => {
            res.status(404).send({error: "404: Game Not Found"})
        })
    }
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
    }).catch(error =>{
        res.status(400).send(error)
    })
})


module.exports = router