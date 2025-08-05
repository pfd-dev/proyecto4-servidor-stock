import express from "express"

const enrutadorCompras = express.Router();


enrutadorCompras.get("/", (req, res) => {
    res.send("compras pagina")
})

enrutadorCompras.post("/", (req, res) => {
    console.log(req.body)
    res.send("compras pagina")
})

export {
    enrutadorCompras
}
