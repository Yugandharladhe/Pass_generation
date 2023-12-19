const express = require("express");
const {generatePass,downloadPass} = require("./generatePass");
const authenticate = require("./middleware/authenticate");
var cors = require('cors')
require("dotenv").config();

const app = express()
app.use(cors())

const PORT = 2000
app.use(express.json())

app.post("/api/v1/generatePass",authenticate,generatePass);

app.get("/api/v1/download",authenticate,downloadPass);



app.listen(PORT, () => {
    console.log("app is listening on port 2000")
})