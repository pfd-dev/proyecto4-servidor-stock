import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    cantidad: {
        type: String,
        default: '0'
    },
    imagen: {
        type: String,
        required: false
    },
    imagenes: [{
        type: String,
        required: false
    }]
});


const productoModel = mongoose.model("productos", productoSchema)

export {
    productoModel
}
