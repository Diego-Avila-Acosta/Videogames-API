const router = require('express').Router();
const axios = require("axios");
const { response } = require('express');
const {API_KEY} = process.env

router.get("/", async function(req,res) {
    let busqueda = []
    let url = 'https://api.rawg.io/api/games'
    let name = req.query.name
    if(name){
        
        url += `?search=${name}`.split(" ").join("%20")
        let respuesta = await axios({
            method: 'get',
            //url: url + `&key=${API_KEY}`
            url: url + `&key=11c62a395ad84cb78ed11bb962cbedd7`
        })
        respuesta = respuesta.data
        for (let i = 0; i < 15; i++) {
            let objeto = respuesta.results[i]
            busqueda.push({
                name: objeto.name,
                background_image: objeto.background_image,
                genres: objeto.genres
            })
        }

        res.status(200).json(busqueda)

    }else{
        url += `?key=11c62a395ad84cb78ed11bb962cbedd7`

        
        let iter = 0
        
        //Posible refactorización con map
        
        do{
            let respuesta = await axios({
                method: 'get',
                url
            })
            respuesta = respuesta.data
            for (let i = 0; i < respuesta.results.length; i++) {
            let objeto = respuesta.results[i]
            busqueda.push({
                name: objeto.name,
                background_image: objeto.background_image,
                genres: objeto.genres
            })
        }
        
        iter++
        url = respuesta.next
    }while(iter < 5)
    
    res.status(200).send(busqueda)
    
    }
})


module.exports = router