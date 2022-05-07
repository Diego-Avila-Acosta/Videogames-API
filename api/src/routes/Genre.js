const router = require('express').Router();
const axios = require("axios");
const {API_KEY} = process.env
const logic = require("../logic/Genre.js")


router.get("/", (req, res) => {
    axios({
        method: "get",
        url: "https://api.rawg.io/api/genres?key=11c62a395ad84cb78ed11bb962cbedd7"
        //url: `https://api.rawg.io/api/genres?key=${API_KEY}`
      }).then(response => response.data)
      .then(data => {
          let array = logic.mapGenre(data.results)
          res.status(200).send(array)
      })
})


module.exports = router