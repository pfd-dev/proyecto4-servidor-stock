import mongoose from "mongoose";

const usuarioSessionSchema = mongoose.Schema(
    {},
    { strict: false }
);

const usuarioSessionModel = mongoose.model("sesiones", usuarioSessionSchema)

export {
    usuarioSessionModel
}
