import { Request, Response } from 'express';
import * as AdopcionModel from '../models/adopcion.model';

// Obtener todas las adopciones
export const getAllAdopciones = async (_req: Request, res: Response) => {
    try {
        const adopciones = await AdopcionModel.getAllAdopciones();
        res.json(adopciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener adopciones', error });
    }
};

// Obtener adopción por ID
export const getAdopcionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const adopcion = await AdopcionModel.getAdopcionById(Number(id));
        if (adopcion) {
            res.json(adopcion);
        } else {
            res.status(404).json({ message: 'Adopción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar adopción', error });
    }
};

// Crear adopción
export const createAdopcion = async (req: Request, res: Response) => {
    console.log(req.body);
    const { persona_id, mascota_id, fecha_visita, fecha_adopcion, estado } = req.body;
    if (!persona_id || !mascota_id || !fecha_visita || !fecha_adopcion || !estado) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }
    try {
        const adopcion = await AdopcionModel.createAdopcion({
            persona_id,
            mascota_id,
            fecha_visita,
            fecha_adopcion,
            estado,
        });
        res.status(201).json(adopcion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear adopción', error });
    }
};

// Actualizar adopción
export const updateAdopcion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const existente = await AdopcionModel.getAdopcionById(Number(id));
        if (!existente) {
            return res.status(404).json({ message: 'Adopción no encontrada' });
        }
        const adopcion = await AdopcionModel.updateAdopcion(Number(id), datos);
        res.json(adopcion);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar adopción', error });
    }
};

// Eliminar adopción
export const deleteAdopcion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existente = await AdopcionModel.getAdopcionById(Number(id));
        if (!existente) {
            return res.status(404).json({ message: 'Adopción no encontrada' });
        }
        const result = await AdopcionModel.deleteAdopcion(Number(id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar adopción', error });
    }
};
