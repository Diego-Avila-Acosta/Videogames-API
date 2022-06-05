//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("dotenv").config();
const axios = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const logic = require("./src/logic/Genre.js")
const {Genre} = require("./src/db")


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console

    axios({
      method: "get",
      url: "https://api.rawg.io/api/genres?key=11c62a395ad84cb78ed11bb962cbedd7"
    }).then(respuesta => respuesta.data)
    .then(data => {
      let array = logic.mapGenre(data.results)
      array.map(genre =>{
        Genre.create({
          id: genre.id,
          name: genre.name
        })
      })
    })
  });
});
