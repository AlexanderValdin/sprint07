//importa el modulo mysql2
import mysql from 'mysql2/promise';
//importa el módulo dotenv
import dotenv from 'dotenv';

//llama al método config del modulo dotenv, esto se usa con el archivo .env
dotenv.config();

//creamos el pool de conexiones para la interacción con la base de datos
const createPool = async () => {
    return await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 20, //cantidad limite de conexiones
        maxIdle: 10, //cantidad limite de conexiones inactivas
        idleTimeout: 5000, //tiempo limite para que una conexion este inactiva
        queueLimit: 2 //cantidad limite de conexiones en cola
        //acquireTimeout: 2000 // tiempo en adquirir una nueva conexion
    });
};
export {createPool};