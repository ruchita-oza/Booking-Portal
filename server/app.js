const express = require('express');

let app = express();

const PORT = 5000;

const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser);
app.use(bodyParser.urlencoded({ extended: true }));

//create express route
const router = express.Router();
app.use(router);

const rootPath = path.resolve("./dist");
app.use(express.static(rootPath));

//DB connection
require("./src/database/connection");

router.use((err, req, res, next) => { 
    if (err) {
        return res.send(err.message);
    }
});

app.listen((PORT, err) => {
    if (err) return console.log(`cannot connect to port : ${PORT}`) ;
    console.log(`Server is Listening on  : http://localhost:${PORT}`);
})