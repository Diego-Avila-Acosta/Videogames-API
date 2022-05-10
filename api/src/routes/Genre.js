const router = require('express').Router();
const axios = require("axios");
const {API_KEY} = process.env
const {Genre} = require("../db")



router.get("/", (req, res) => {
    Genre.findAll()
      .then(data => {
          res.status(200).send(data)
      })
      .catch(error => {
          res.status(400).send(error)
      })
})


module.exports = router