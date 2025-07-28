import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            required: true
        }
    }
);

const usuarioModel = mongoose.model("usuarios", usuarioSchema)

export {
    usuarioModel
}
