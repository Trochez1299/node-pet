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
    persona_id: number;
    mascota_id: number;
    fecha_visita: string;
    fecha_adopcion: string;
    estado: string;
}) => {
    const [result] = await pool.query(
        'INSERT INTO adopcion (persona_id, mascota_id, fecha_visita, fecha_adopcion, estado) VALUES (?, ?, ?, ?, ?)',
        [data.persona_id, data.mascota_id, data.fecha_visita, data.fecha_adopcion, data.estado || null]
    );
    return { id: (result as any).insertId, ...data };
};

export const updateAdopcion = async (
    id: number,
    data: {
        persona_id?: number;
        mascota_id?: number;
        fecha_visita?: string;
        fecha_adopcion?: string;
        estado?: string;
    }
) => {
    await pool.query('UPDATE adopcion SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
};

export const deleteAdopcion = async (id: number) => {
    await pool.query('DELETE FROM adopcion WHERE id = ?', [id]);
    return { message: 'Adopción eliminada', id };
};
