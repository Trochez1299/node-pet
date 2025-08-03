import { pool } from '../config/db';

export const getAllAdopciones = async () => {
    const [rows] = await pool.query('SELECT * FROM adopcion');
    return rows;
};

export const getAdopcionById = async (id: number) => {
    const [rows] = await pool.query('SELECT * FROM adopcion WHERE id = ?', [id]);
    return rows;
};

export const createAdopcion = async (data: {
    id_persona: number;
    id_mascota: number;
    fecha_adopcion: string;
    observaciones?: string;
}) => {
    const [result] = await pool.query(
        'INSERT INTO adopcion (id_persona, id_mascota, fecha_adopcion, observaciones) VALUES (?, ?, ?, ?)',
        [data.id_persona, data.id_mascota, data.fecha_adopcion, data.observaciones || null]
    );
    return { id: (result as any).insertId, ...data };
};

export const updateAdopcion = async (
    id: number,
    data: {
        id_persona?: number;
        id_mascota?: number;
        fecha_adopcion?: string;
        observaciones?: string;
    }
) => {
    await pool.query('UPDATE adopcion SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
};

export const deleteAdopcion = async (id: number) => {
    await pool.query('DELETE FROM adopcion WHERE id = ?', [id]);
    return { message: 'Adopción eliminada', id };
};
