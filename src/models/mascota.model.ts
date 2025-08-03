import { pool } from '../config/db';

export const getAllMascotas = async () => {
    const [rows] = await pool.query('SELECT * FROM mascota');
    return rows;
};

export const getMascotaById = async (id: number) => {
    const [rows] = await pool.query('SELECT * FROM mascota WHERE id = ?', [id]);
    return rows;
};

export const createMascota = async (data: {
    nombre: string;
    edad: number;
    raza: string;
    tamano: string;
    estado_salud: string;
    estado_adopcion: string;
}) => {
    const [result] = await pool.query(
        'INSERT INTO mascota (nombre, edad, raza, tamano, estado_salud, estado_adopcion) VALUES (?, ?, ?, ?, ?, ?)',
        [
            data.nombre,
            data.edad,
            data.raza,
            data.tamano,
            data.estado_salud,
            data.estado_adopcion,
        ]
    );
    return { id: (result as any).insertId, ...data };
};

export const updateMascota = async (
    id: number,
    data: {
        nombre?: string;
        edad?: number;
        raza?: string;
        tamano?: string;
        estado_salud?: string;
        estado_adopcion?: string;
    }
) => {
    await pool.query('UPDATE mascota SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
};

export const deleteMascota = async (id: number) => {
    await pool.query('DELETE FROM mascota WHERE id = ?', [id]);
    return { message: 'Mascota eliminada', id };
};
