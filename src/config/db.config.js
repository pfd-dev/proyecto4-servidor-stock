import mongoose from "mongoose";

async function conectarBBDD(urlDataBase) {
    try {
        await mongoose.connect(urlDataBase);
        console.log("Conectado a MongoDB con Mongoose!");
    } catch (error) {
        console.log("Error en la conexion con Mongoose:");
        console.log(error);
    }
}

export {
    conectarBBDD
}