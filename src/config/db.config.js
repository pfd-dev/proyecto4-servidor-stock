import mongoose from 'mongoose';

async function conectarBBDD(urlDataBase) {
    try {
        await mongoose.connect(urlDataBase);
        console.log('Base de datos: Conectado a MongoDB con Mongoose.');
    } catch (error) {
        console.log('Base de datos: Error en la conexion con Mongoose:');
        console.log(error);
    }
}

export default conectarBBDD;