import { RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

export const getAllRoles = async () => {
    const [rows] = await pool.query('SELECT * FROM rol');
    return rows;
};

export const getRolById = async (id: number) => {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM rol WHERE id = ?', [id]);
    return rows[0];
};

export const createRol = async (nombre: string) => {
    const [result] = await pool.query('INSERT INTO rol (nombre) VALUES (?)', [nombre]);
    return { id: (result as any).insertId, nombre };
};

export const updateRol = async (id: number, nombre: string) => {
    await pool.query('UPDATE rol SET nombre = ? WHERE id = ?', [nombre, id]);
    return { id, nombre };
};

export const deleteRol = async (id: number) => {
    await pool.query('DELETE FROM rol WHERE id = ?', [id]);
    return { message: 'Rol eliminado', id };
};
