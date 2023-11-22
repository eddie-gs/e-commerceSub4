const express = require("express");
const mariadb = require("mariadb");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const SECRET_KEY = "Guiso de Pollo";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("JSON"));


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });