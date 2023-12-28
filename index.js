const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000 ;

app.use(express.json());

const route = require("./Routes/route");
app.use("/api/v1",route);

try
{
const Database = require("./Config/Database");
Database();
}
catch(err)
{
    console.log(`eroor ${err}`);
}

app.listen(PORT , ()=>{
    console.log(`Connecting to the server ${PORT}`);
})