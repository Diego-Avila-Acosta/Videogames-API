require('dotenv').config();
const router = require('express').Router();
const axios = require("axios");
const {API_KEY} = process.env
const logic = require("../logic/Genre.js")
const {Videogame, Genre, Op} = require("../db")

router.get("/", async function(req,res) {
    let busqueda = []
    let url = 'https://api.rawg.io/api/games'
    let name = req.query.name

    console.log(API_KEY)
    //Refactorizar Completo MAYBE
    if(name){
        
        url += `?search=${name}`.split(" ").join("%20")
        let respuesta = await axios({
            method: 'get',
            url: url + `&key=${API_KEY}`
        })
        respuesta = respuesta.data
        for (let i = 0; i < 15; i++) {
            let objeto = respuesta.results[i]
            busqueda.push({
                name: objeto.name,
                background_image: objeto.background_image,
                genres: logic.mapGenre(objeto.genres)
            })
        }

        let db = await Videogame.findAll({
            where:{
                name: {
                    [Op.like]: `${name}%`
                }
            },
            include: {
                model: Genre,
                attributes: ["id","name"],
                through:{
                    attributes: []
                }
        }
        })
        busqueda = busqueda.concat(db)
        res.status(200).json(busqueda)
    }else{
        url += `?&key=${API_KEY}`

        
        let iter = 0
        
        //Posible refactorización con map
        
        do{
            let respuesta = await axios({
                method: 'get',
                url
            })

            respuesta = respuesta.data 
            busqueda.push(...respuesta.results.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image,
                    genres: logic.mapGenre(game.genres),
                    rating: game.rating
                }
            }))
        
        iter++
        url = respuesta.next
    }while(iter < 5)

    let db = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["id","name"],
            through:{
                attributes: []
            }
    }})

    busqueda = busqueda.concat(db)
    res.status(200).send(busqueda)
    }
})


module.exports = router