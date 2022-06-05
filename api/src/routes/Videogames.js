require('dotenv').config();
const router = require('express').Router();
const axios = require("axios");
const {API_KEY} = process.env
const logic = require("../logic/Genre.js")
const {Videogame, Genre, Op} = require("../db");




router.get("/", async function(req,res) {
    let busqueda = []
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    let name = req.query.name
    const options = {
        include: {
            model: Genre,
            attributes: ["id","name"],
            through:{
                attributes: []
            }
        },
        attributes: ["id", "name", "background_image", "rating"]
    }

    if(name){

        options.where = { name: {
                [Op.like]: `${name}%`
            }
        }

        url += `&search=${name}`.split(" ").join("%20")

        axios.get(url)
        .then( async (response) => {
            let resultadoDB = await Videogame.findAll(options)
            let {data} = response
            

            if(!data.results.length && !resultadoDB.length) res.status(404).send({error: "404: Game Not Found"})
            else{
                let length = 15 -  resultadoDB.length
                for (let i = 0; i < length; i++) {
                    busqueda.push({
                        id: data.results[i].id,
                        name: data.results[i].name,
                        background_image: data.results[i].background_image,
                        genres: logic.mapGenre(data.results[i].genres),
                        rating: data.results[i].rating
                    })
                }
                busqueda = busqueda.concat(resultadoDB)
                res.status(200).send(busqueda)
            }
        })

    }else{

        let iter = 0

        let funcion = async function (response){
            let {data} = response
            busqueda.push(...data.results.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image,
                    genres: logic.mapGenre(game.genres),
                    rating: game.rating
                }
            }))

            iter++ 
            if(iter !== 5){
                axios.get(data.next)
                .then(funcion)
            }else{
                let resultadoDB =  await Videogame.findAll(options)

                busqueda.concat(resultadoDB)
                res.status(200).json(busqueda)
            }

        }

    axios.get(url)
    .then(funcion)

    }
})


module.exports = router