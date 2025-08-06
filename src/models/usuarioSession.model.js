import mongoose from "mongoose";

const usuarioSessionSchema = mongoose.Schema(
    {
        // idSession: {
        //     type: String,
        // },
    }
);

const usuarioSessionModel = mongoose.model("sesiones", usuarioSessionSchema)

export {
    usuarioSessionModel
}
