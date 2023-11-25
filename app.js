const express = require("express");
const mariadb = require("mariadb");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Guiso de Pollo";

const app = express();
const port = 3000;

app.use(express.static("JSON"));

app.post('/login', (req,res) => {
  console.log(req)
  const {user, pass} = req.body //Sacamos user y password del cuerpo de la request
  if(user && pass){ //Chequeamos si los parametro existen y son no vacios
     const token = jwt.sign({user, pass},SECRET_KEY)
     res.json({token: token})
  }else{
    res.status(401).json({error: "Usuario y/o contraseña incorrecta"})
  }
})

app.use("/cart", async(req,res,next)=>{
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY)
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({message: "Usuario no autorizado"});
  }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });