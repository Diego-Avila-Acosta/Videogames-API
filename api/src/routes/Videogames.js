require('dotenv').config();
const router = require('express').Router();
const axios = require("axios");
const {API_KEY} = process.env
const logic = require("../logic/Genre.js")
const {Videogame, Genre, Op} = require("../db")

router.get("/", async function(req,res) {
    let busqueda = []
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    let name = req.query.name
    let options = {
        include: {
            model: Genre,
            attributes: ["id","name"],
            through:{
                attributes: []
            }
        }
    }

    //Refactorizar Completo MAYBE
    if(name){

        options.where = { name: {
                [Op.like]: `${name}%`
            }
        }

        url += `&search=${name}`.split(" ").join("%20")

        Promise.all([axios.get(url), Videogame.findAll(options)])
        .then(response => {
            let {data} = response[0]
            for (let i = 0; i < 15; i++) {
                busqueda.push({
                    id: data.results[i].id,
                    name: data.results[i].name,
                    background_image: data.results[i].background_image,
                    genres: logic.mapGenre(data.results[i].genres),
                    rating: data.results[i].rating
                })
            }
            busqueda = busqueda.concat(response[1])
            res.status(200).send(busqueda)
        })

    }else{
        /* let promises = []
        for(let i = 0; i < 5; i++) {
            promises[i] = url + `&page${i+1}`
        }

        Promise.all(promises.map(url => axios.get(url)))
        .then(response =>{
            response.forEach((res, i) => {
                let {data} = res
                busqueda.push(...data.results.map( game => {
                    return {
                        id: game.id,
                        name: game.name,
                        background_image: game.background_image,
                        genres: logic.mapGenre(game.genres),
                        rating: game.rating
                    }
                }))
            })
            res.status(200).send(busqueda)
        }) */

        let iter = 0
        do{
            let {data} = await axios.get(url)

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
        url = data.next
    }while(iter < 5)

    Videogame.findAll(options)
    .then(data => {
        busqueda.concat(data)
        res.status(200).send(busqueda)
    })
    .catch(error => {
        res.status(400).send(error)
    })
    }
})


module.exports = router