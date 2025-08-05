import express from "express";
import { productoModel } from "../models/productos.model.js";

const enrutadorProductos = express.Router();

// Obtener todos los productos
enrutadorProductos.get("/", async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*"); // O especificá tu dominio
    // res.header("Access-Control-Allow-Methods", "GET");
    // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    try {
        const productos = await productoModel.find();
        res.status(200).json(productos);
    } catch (error) {
        res.header()
        console.error("Error al obtener productos:", error);
        res.status(500).send("Ocurrió un error al obtener los productos.");
    }
});

// Obtener un producto por su ID
enrutadorProductos.get("/:id", async (req, res) => {
    try {
        const producto = await productoModel.findById(req.params.id);

        if (!producto) {
            return res.status(404).send("Producto no encontrado.");
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al buscar producto:", error);
        res.status(500).send("Ocurrió un error al buscar el producto.");
    }
});

// Crear un nuevo producto
enrutadorProductos.post("/", async (req, res) => {
    try {
        const { nombre, cantidad, precio } = req.body;

        const productoNuevo = new productoModel({
            name: nombre,
            cantidad,
            precio
        });

        const productoGuardado = await productoNuevo.save();

        res.status(201).json(productoGuardado);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).send("Ocurrió un error al crear el producto.");
    }
});

// Eliminar un producto por su ID
enrutadorProductos.delete("/:id", async (req, res) => {
    try {
        const producto = await productoModel.findById(req.params.id);

        if (!producto) {
            return res.status(404).send("Producto no encontrado.");
        }

        const productoEliminado = await productoModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            mensaje: "Producto eliminado correctamente.",
            producto: productoEliminado
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).send("Ocurrió un error al eliminar el producto.");
    }
});

// Actualizar un producto por su ID
enrutadorProductos.put("/:id", async (req, res) => {
    try {
        const { nombre, cantidad, precio } = req.body;

        const producto = await productoModel.findById(req.params.id);

        if (!producto) {
            return res.status(404).send("Producto no encontrado.");
        }

        const productoActualizado = await productoModel.findByIdAndUpdate(
            req.params.id,
            {
                name: nombre,
                cantidad,
                precio
            },
            { new: true } // Devuelve el documento actualizado
        );

        res.status(200).json({
            mensaje: "Producto actualizado correctamente.",
            producto: productoActualizado
        });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).send("Ocurrió un error al actualizar el producto.");
    }
});

export { enrutadorProductos };
