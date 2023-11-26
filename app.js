const express = require("express");
const mariadb = require("mariadb");
const jwt = require("jsonwebtoken");
const mySql = require("mysql");
const cors = require("cors");
const SECRET_KEY = "CLAVE";

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "cart",
  connectionLimit: 5,
});
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
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
    req.body.username = decoded.user;
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({message: "Usuario no autorizado"});
  }
})

app.get("/cart", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      "SELECT * FROM articulos"
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});
app.post("/cart", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO articulos(idArticulo, name, count, unitCost, currency, subtotal, username) VALUES(?, ?, ?, ?, ?, ?, ?)`,
      [req.body.idArticulo, req.body.name, req.body.count, req.body.unitCost, req.body.currency, req.body.count*req.body.unitCost, req.body.username]
    );

    res.json({ id: parseInt(response.insertId), ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

/* app.put("/todo/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `UPDATE todo SET name=?, description=?, created_at=?, updated_at=?, status=? WHERE id=?`,
      [req.body.name, req.body.description, req.body.created_at, req.body.updated_at, req.body.status, req.params.id]
    );

    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
});

app.delete("/todo/:id", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("DELETE FROM todo WHERE id=?", [
      req.params.id,
    ]);
    res.json({ message: "Elemento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Se rompió el servidor" });
  } finally {
    if (conn) conn.release(); //release to pool
  }
}); */

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });