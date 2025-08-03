import { Request, Response } from 'express';
import * as DesparasitacionModel from '../models/desparasitacion.model';

// Obtener todas las desparasitaciones
export const getAllDesparasitaciones = async (_req: Request, res: Response) => {
    try {
        const desparasitaciones = await DesparasitacionModel.getAllDesparasitaciones();
        res.json(desparasitaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener desparasitaciones', error });
    }
};

// Obtener desparasitación por ID
export const getDesparasitacionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const desparasitacion = await DesparasitacionModel.getDesparasitacionById(Number(id));
        if (desparasitacion) {
            res.json(desparasitacion);
        } else {
            res.status(404).json({ message: 'Desparasitación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar desparasitación', error });
    }
};

// Crear desparasitación
export const createDesparasitacion = async (req: Request, res: Response) => {
    const { id_mascota, fecha, observaciones } = req.body;
    if (!id_mascota || !fecha) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }
    try {
        const desparasitacion = await DesparasitacionModel.createDesparasitacion({
            id_mascota,
            fecha,
            observaciones,
        });
        res.status(201).json(desparasitacion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear desparasitación', error });
    }
};

// Actualizar desparasitación
export const updateDesparasitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const existente = await DesparasitacionModel.getDesparasitacionById(Number(id));
        if (!existente) {
            return res.status(404).json({ message: 'Desparasitación no encontrada' });
        }
        const desparasitacion = await DesparasitacionModel.updateDesparasitacion(Number(id), datos);
        res.json(desparasitacion);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar desparasitación', error });
    }
};

// Eliminar desparasitación
export const deleteDesparasitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existente = await DesparasitacionModel.getDesparasitacionById(Number(id));
        if (!existente) {
            return res.status(404).json({ message: 'Desparasitación no encontrada' });
        }
        const result = await DesparasitacionModel.deleteDesparasitacion(Number(id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar desparasitación', error });
    }
};
