import {Transferencia} from '../model/transferencias.js'
import { validateTransferencia } from '../validator/validation.js';

//transaction controller
export const crearTransferencia= async (req, res) =>{
    let response = {
        msg:'Hacer transferencia',
        error: null,
        data: null
    };

    try {
        const {error, value} = validateTransferencia(req.body);
        if (error) {
            console.log(error);
            return res.send(error.details);
        }
        console.log(value);
        const transferencia = new Transferencia();
        
        const { emisor, receptor, monto } = req.body;
        transferencia.emisor = emisor;
        transferencia.receptor = receptor;
        transferencia.monto = monto;
        const model_result = await transferencia.crearTransferencia(transferencia);
        if(model_result != null) response.data = model_result;
        else response.error = 'Error al hacer la transferencia';

    res.send(response);
    } catch (error) {
        response.error = "Server internal error";
        res.status(500).send(response);
    }
};

export const obtenerTransferencias = async (req, res) =>{
    let response = {
        msg:'Obtener todas las transferencias',
        error: null,
        data: null
    };
    try {
        const transferencia = new Transferencia();
        const model_result = await transferencia.obtenerTransferencias();
        if(model_result != null){
            if(model_result.length == 0){
                response.error = 'No hay transferencias en la base de datos'; 
            }
            response.data = model_result;            
        }
        else{
            response.error = 'Error al obtener el historial de transferencias';
        } 
        res.json(model_result);
    } catch (error) {
        response.error = 'Server internal error';
        res.status(500).send(response);
    }
    
};


//   // Ruta para obtener todas las transferencias
//   app.get("/transferencias", (req, res) => {
//     const query = "SELECT * FROM transferencias";
//     connection.query(query, (err, result) => {
//       if (err) {
//         console.error("Error al obtener las transferencias de la base de datos:", err);
//         res.status(500).json({ error: "Error al obtener las transferencias de la base de datos" });
//       } else {
//         res.json(result);
//         console.log(result)
//       }
//     });
//   });