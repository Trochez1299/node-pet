import { pool } from '../config/db';

export const getAllDesparasitaciones = async () => {
    const [rows] = await pool.query('SELECT * FROM desparasitacion');
    return rows;
};

export const getDesparasitacionById = async (id: number) => {
    const [rows] = await pool.query('SELECT * FROM desparasitacion WHERE id = ?', [id]);
    return rows;
};

export const createDesparasitacion = async (data: {
    id_mascota: number;
    fecha: string;
    observaciones?: string;
}) => {
    const [result] = await pool.query(
        'INSERT INTO desparasitacion (id_mascota, fecha, observaciones) VALUES (?, ?, ?)',
        [data.id_mascota, data.fecha, data.observaciones || null]
    );
    return { id: (result as any).insertId, ...data };
};

export const updateDesparasitacion = async (
    id: number,
    data: {
        id_mascota?: number;
        fecha?: string;
        observaciones?: string;
    }
) => {
    await pool.query('UPDATE desparasitacion SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
};

export const deleteDesparasitacion = async (id: number) => {
    await pool.query('DELETE FROM desparasitacion WHERE id = ?', [id]);
    return { message: 'Desparasitación eliminada', id };
};
