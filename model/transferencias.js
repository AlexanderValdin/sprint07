import { createPool } from "../utils/db.js";

//clase Transaction
class Transferencia {
    constructor(){
    }   
    get emisor(){
        return this._emisor;
    }
    set emisor(emisor){
        this._emisor = emisor;
    }
    get receptor(){
        return this._receptor;
    }
    set receptor(receptor){
        this._receptor = receptor;
    }
    get monto(){
        return this._monto;
    }
    set monto(monto){
        this._monto = monto;
    }
    //funcion para hacer transacciones de montos entre usuarios
    crearTransferencia = async (transferencia) =>{ 
        let result = null;
        const pool = await createPool();
        const connection = await pool.getConnection();
        try { 
            await connection.beginTransaction();
            console.log('transferencia', transferencia);
            let [rows1] = await connection.execute(`UPDATE usuarios SET balance = balance - '${this.monto}' WHERE nombre = '${this.emisor}';`,[ transferencia.monto, transferencia.emisor])
            console.log('actualizada la cuenta de origen', rows1);


            let [rows2] = await connection.execute(`UPDATE usuarios SET balance = balance + '${this.monto}' WHERE nombre = '${this.receptor}';`,[ transferencia.monto, transferencia.receptor])
            console.log('actualizada la cuenta de destino', rows2);

            let [rows3] = await connection.execute(`INSERT INTO transferencias (emisor, receptor, monto) VALUES(?,?,?);`, [transferencia.emisor, transferencia.receptor, transferencia.monto]);
            console.log('registrada la transferencia', rows3)
            await connection.commit();
            result = true;
            connection.release();
            console.log('Transferencia realizada con éxito: ', result)
        } catch (error) {
            await connection.rollback()
            console.log('Error al realizar la transferencia: ', error);
        }
        return result;    
    }
    //funcion para obtener el historial de transacciones
    obtenerTransferencias = async () => {
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `SELECT * FROM transferencias;`;
            const [rows] = await connection.execute(query);
            if(rows) result = rows;
            connection.release();
            console.log('Se obtuvieron con éxito todas las transferencias: ', result);
        } catch (error) {
            console.log('select user error: ',error);
        }
        return result
    }
}

export {Transferencia};