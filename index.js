const express = require("express");
// const dbconnect = require("./config/database");
const app = express()

// load config from env file
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// middle ware to parse json request body 
app.use(express.json());

// import route for Todo api 
const visualfitRoutes = require("./Routes/visualfit");
//mount the todo ASPI routes 
app.use("/api/v1",visualfitRoutes);

app.listen (PORT ,() =>{
    console.log(`server started succesfully at ${PORT}`);

})

//connect database 
const dbconnect = require("./config/database");
dbconnect();


app.get("/",(req,res) => {
    res.send(`<h1>This is Homepage  </h1>`);

})
