import mongoose from "mongoose";

const productoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: String,
            default: 0
        }
    }
);

const productoModel = mongoose.model("productos", productoSchema)

export {
    productoModel
}
