const express = require("express");
const {generatePass,downloadPass} = require("./generatePass");
const authenticate = require("./middleware/authenticate");
var cors = require('cors')
require("dotenv").config();
const app = express()

const PORT = process.env.PORT || 2000
app.use(express.json())

app.post("/api/v1/generatePass",cors(),authenticate,generatePass);

app.get("/api/v1/download",cors(),authenticate,downloadPass);



app.listen(PORT, () => {
    console.log("app is listening on port 2000")
})