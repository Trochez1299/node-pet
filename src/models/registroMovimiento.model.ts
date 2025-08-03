import { pool } from '../config/db';

export const getAllMovimientos = async () => {
    const [rows] = await pool.query('SELECT * FROM registro_movimiento');
    return rows;
};

export const getMovimientoById = async (id: number) => {
    const [rows] = await pool.query('SELECT * FROM registro_movimiento WHERE id = ?', [id]);
    return rows;
};

export const createMovimiento = async (data: {
    id_mascota: number;
    tipo_movimiento: string; // Ejemplo: 'ingreso', 'salida', 'fallecimiento'
    fecha: string;
    descripcion?: string;
}) => {
    const [result] = await pool.query(
        'INSERT INTO registro_movimiento (id_mascota, tipo_movimiento, fecha, descripcion) VALUES (?, ?, ?, ?)',
        [data.id_mascota, data.tipo_movimiento, data.fecha, data.descripcion || null]
    );
    return { id: (result as any).insertId, ...data };
};

export const updateMovimiento = async (
    id: number,
    data: {
        id_mascota?: number;
        tipo_movimiento?: string;
        fecha?: string;
        descripcion?: string;
    }
) => {
    await pool.query('UPDATE registro_movimiento SET ? WHERE id = ?', [data, id]);
    return { id, ...data };
};

export const deleteMovimiento = async (id: number) => {
    await pool.query('DELETE FROM registro_movimiento WHERE id = ?', [id]);
    return { message: 'Movimiento eliminado', id };
};
