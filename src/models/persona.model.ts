import { pool } from '../config/db';

export const getAllPersonas = async () => {
  const [rows] = await pool.query('SELECT * FROM persona');
  return rows;
};

export const getPersonaById = async (id: number) => {
  const [rows] = await pool.query('SELECT * FROM persona WHERE id = ?', [id]);
  return rows;
};

export const createPersona = async (data: any) => {
  const [result] = await pool.query('INSERT INTO persona SET ?', [data]);
  return { id: (result as any).insertId, ...data };
};

export const updatePersona = async (id: number, data: any) => {
  await pool.query('UPDATE persona SET ? WHERE id = ?', [data, id]);
  return { id, ...data };
};

export const deletePersona = async (id: number) => {
  await pool.query('DELETE FROM persona WHERE id = ?', [id]);
  return { message: 'Persona eliminada', id };
};
