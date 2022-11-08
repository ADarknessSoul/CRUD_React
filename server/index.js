const express = require("express");
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_react',

});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/api/get', (req, res) => {

    const slqSelect = "SELECT * FROM movie_reviews";

    db.query(slqSelect, (error, result) => {

        res.send(result);
    });

});

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const review = req.body.review;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?);";

    db.query(sqlInsert, [movieName, review], (error, result) => {

        // console.log(result);
        // console.log(sqlInsert);

    });

});

app.delete('/api/delete:id', (req, res) => {

    const name = req.params.id;
    // console.log(name);
    const sqlDelete = "DELETE FROM movie_reviews WHERE idmovie_reviews = ?;";

    db.query(sqlDelete, [name], (error, result) => {

       if(error) console.log(error);
    //    console.log(sqlDelete)

    });

});

app.put('/api/update', (req, res) => {

    const name = req.body.idmovie_reviews;
    const review = req.body.movieReview;
    console.log("id " + name);
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE idmovie_reviews = ?;";

    db.query(sqlUpdate, [review, name], (error, result) => {

       if(error) console.log(error);
    //    console.log(sqlUpdate);

    });

});

app.listen(3001, () => {

    console.log("Running on port 3001");

});