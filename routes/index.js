import express from 'express';
import { crearUsuario, obtenerUsuarios, actualizarUsuario, borrarUsuario } from '../controller/usuariosController.js';
import { crearTransferencia, obtenerTransferencias } from '../controller/transferenciasController.js';


const router = express.Router();


router.post('/usuario', crearUsuario );
router.get('/usuarios', obtenerUsuarios);
router.put('/usuario/:id', actualizarUsuario);
router.delete('/usuario/:id', borrarUsuario);
router.post('/transferencia', crearTransferencia);
router.get('/transferencias', obtenerTransferencias);

export default router;