import {createPool} from '../utils/db.js';

class Usuario {
    constructor(){
    }
    get id_user(){
        return this._id_user;
    }
    set id_user(id_user){
        this._id_user = id_user;
    }
    get nombre(){
        return this._nombre;
    }
    set nombre(nombre){
        this._nombre = nombre;
    }
    get balance(){
        return this._balance;
    }
    set balance(balance){
        this._balance = balance;
    }
    //createUser function
    crearUsuario = async (usuario) =>{ 
        let result = null;
        try {               
            const pool = await createPool();                
            const connection = await pool.getConnection();                
            const query = `INSERT INTO usuarios (nombre, balance) VALUES(?,?);`;
            const [rows] = await connection.execute(query, [usuario.nombre, usuario.balance]);               
            if(rows.insertId > 0){
                result = true;
            }
            connection.release();
            console.log('Se ingresó satisfactoriamente usuario: ', result);        
        } catch (error) {
            console.log('error al ingresar un usuario: ', error);
        }
        return result;    
    };
    obtenerUsuarios = async () =>{
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = 'SELECT * FROM usuarios;'; 
            const [rows] = await connection.execute(query);
            if(rows) result = rows;
            connection.release();
            console.log('se obtuvieron los usuarios exitosamente', result);
        } catch (error) {
            console.log('error al obtener los usuarios: ', error);
        }
        return result
    };
    actualizarUsuario = async (usuario) =>{ 
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `UPDATE usuarios SET nombre = ?, balance = ? WHERE id_user = ?;`;
            const [rows] = await connection.execute(query, [usuario.nombre, usuario.balance,  usuario.id_user]);
            if(rows.changedRows > 0){
                result = true;
            }
            connection.release();
            console.log('El usuario se actualizó exitosamente: ', result)
        } catch (error) {
            console.log('Error al actualizar usuario: ', error);
        }
        return result
    };
    borrarUsuario = async (usuario) =>{ 
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `DELETE FROM usuarios WHERE id_user = ?;`;
            const [rows] = await connection.execute(query, [usuario.id_user]);
            result = true;
            connection.release();
            console.log('usuario eliminado con éxito: ', result);
        } catch (error) {
            console.log('delete user error: ',error);
        }
        return result
    };
}

export {Usuario};