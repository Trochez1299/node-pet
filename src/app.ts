import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas base
app.get('/', (_req, res) => {
    res.send('API funcionando');
});

export default app;
