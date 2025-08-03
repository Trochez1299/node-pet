import { Request, Response } from 'express';
import * as RegistroMovimientoModel from '../models/registroMovimiento.model';

// Obtener todos los movimientos
export const getAllMovimientos = async (_req: Request, res: Response) => {
    try {
        const movimientos = await RegistroMovimientoModel.getAllMovimientos();
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener movimientos', error });
    }
};

// Obtener movimiento por ID
export const getMovimientoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const movimiento = await RegistroMovimientoModel.getMovimientoById(Number(id));
        if (movimiento) {
            res.json(movimiento);
        } else {
            res.status(404).json({ message: 'Movimiento no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar movimiento', error });
    }
};

// Crear movimiento
export const createMovimiento = async (req: Request, res: Response) => {
    const { id_mascota, tipo_movimiento, fecha, descripcion } = req.body;
    if (!id_mascota || !tipo_movimiento || !fecha) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }
    try {
        const movimiento = await RegistroMovimientoModel.createMovimiento({
            id_mascota,
            tipo_movimiento,
            fecha,
            descripcion,
        });
        res.status(201).json(movimiento);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear movimiento', error });
    }
};

// Actualizar movimiento
export const updateMovimiento = async (req: Request, res: Response) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const existente = await RegistroMovimientoModel.getMovimientoById(Number(id));
        if (!existente) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }
        const movimiento = await RegistroMovimientoModel.updateMovimiento(Number(id), datos);
        res.json(movimiento);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar movimiento', error });
    }
};

// Eliminar movimiento
export const deleteMovimiento = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existente = await RegistroMovimientoModel.getMovimientoById(Number(id));
        if (!existente) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }
        const result = await RegistroMovimientoModel.deleteMovimiento(Number(id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar movimiento', error });
    }
};
