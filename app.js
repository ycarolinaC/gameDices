const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose")

const path = require('path')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','pug')
app.set('views', path.join(__dirname,'views'))

app.use('/style', express.static('style'));

//database conection 
mongoose.connect(
    "mongodb+srv://admin:1234@cluster0.ip1k5.mongodb.net/gamedicesf?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
);

//Create schema
const gameSchecma = mongoose.Schema({
    name1: String,
    name2: String,
    name3: String
});
// Making a modal on our already
// defined schema
const gameModal = mongoose
    .model('players', gameSchecma);
//
app.get('/createGame', function (req,res){
    res.render('index',{})
});

app.post("/createGame",function(req,res){
    const gameData = new gameModal({
        name1:req.body.name1,
        name2:req.body.name2,
        name3:req.body.name3
    });
    gameData.save()
        .then(data=> {
            res.render('index',
    {msg: "Your create game successfully saved."})
        console.log("Test")})
        .catch(err =>{
            res.render('index'),
                {msg: "Check Details."}
        })
})

app.listen(3000, () =>{
    console.log('Server is running')
});