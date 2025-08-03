import app from './app';
import { pool } from './config/db';
import rolRoutes from './routes/rol.routes';
import personaRoutes from './routes/persona.routes';
import mascotaRoutes from './routes/mascota.routes';
import adopcionRoutes from './routes/adopcion.routes';
import desparasitacionRoutes from './routes/desparasitacion.routes';
import registroMovimientoRoutes from './routes/registroMovimiento.routes';

const PORT = process.env.PORT || 3000;

app.use('/api/roles', rolRoutes);
app.use('/api/personas', personaRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/adopciones', adopcionRoutes);
app.use('/api/desparasitaciones', desparasitacionRoutes);
app.use('/api/movimientos', registroMovimientoRoutes);

async function startServer() {
    try {
        const conn = await pool.getConnection();
        console.log('Conexión a MySQL exitosa');
        conn.release();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error de conexión a MySQL:', err);
    }
}

startServer();
