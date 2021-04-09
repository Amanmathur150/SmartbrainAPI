const express = require("express")
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const bcrypt = require('bcrypt');
const cors = require("cors");
const saltRounds = 10;
const database1 = require("knex")

const signup = require("./controllers/signup")
const faceupdate = require("./controllers/faceupdate")
const signin = require("./controllers/signin")

const db = database1({
    client: 'pg',
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});




const app = express();

app.use(express.json());

app.use(cors());





app.get("/",(req , res )=>{
    db.select("*").from("users").then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json("Something went Wrong !")
    })
    
})



app.post("/signin" ,signin.handlesignin(db , bcrypt))

// var number1 = db('users').count('id').then(res=>{
//     var number = res[0].count
//     number
// })

// console.log(number1)


app.post("/signup" , signup.handlesignup( db , bcrypt , saltRounds))

app.put("/faceupdate", faceupdate.handlefaceupdate(db))

app.post("/apicall", faceupdate.handleClearifyApi())


app.get("/profile/:name" ,  (req , res)=>{
    const name = req.params.name;
    
    let respond=false;
    for (let user of database.user){
        if (user.name == name){
            respond = true;
            res.status(200).json("Sucess")
        }
    }
    if (!respond){
        res.status(404).json("Profile Not Found")
    }
})


 app.put("/image" , (req , res)=>{
    const {name} = req.body;
    
    let respond=false;
    for (let user of database.user){
        if (user.name == name){
            respond = true;
            user.entries++;
            res.status(200).json(user)
        }
    }
    if (!respond){
        res.status(404).json("User is  Not Found")
    }
})

app.listen(process.env.PORT ||3000 , ()=>{
    console.log(`Port IS start On ${process.env.PORT || 3000}`)
})