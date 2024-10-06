const mongoose = require ("mongoose");

require("dotenv").config();

const dbconnect =() =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("coonnnection build with database "))
    .catch((error) => {
        console.log("error occur ");
        console.log(error);
        process.exit(1);
    });
}

module.exports = dbconnect;