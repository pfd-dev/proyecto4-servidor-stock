import mongoose from "mongoose";

const productoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        precio: {
            type: Number,
            required: true
        },
        cantidad: {
            type: String,
            default: 0
        }
    }
);

const productoModel = mongoose.model("productos", productoSchema)

export {
    productoModel
}
