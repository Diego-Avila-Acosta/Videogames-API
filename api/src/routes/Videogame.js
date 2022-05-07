const router = require('express').Router();
const axios = require("axios");
const {API_KEY} = process.env
const logic = require("../logic/Genre.js")
const {Videogame} = require("../db.js")


router.get("/:id", async (req,res) => {
    let busqueda;
    let id = req.params.id
    let url = `https://api.rawg.io/api/games/${id}?key=11c62a395ad84cb78ed11bb962cbedd7`
    //let url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    
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
        platforms
    }).then(data => {
        data.setGenres(genres)
        res.status(200).send(data)
    })
})


module.exports = router