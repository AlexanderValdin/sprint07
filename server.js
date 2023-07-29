import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'))
app.use('/', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

