import { Request, Response } from 'express';
import * as MascotaModel from '../models/mascota.model';

// Obtener todas las mascotas
export const getAllMascotas = async (_req: Request, res: Response) => {
    try {
        const mascotas = await MascotaModel.getAllMascotas();
        res.json(mascotas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener mascotas', error });
    }
};

// Obtener mascota por ID
export const getMascotaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const mascota = await MascotaModel.getMascotaById(Number(id));
        if (mascota) {
            res.json(mascota);
        } else {
            res.status(404).json({ message: 'Mascota no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar mascota', error });
    }
};

// Crear mascota
export const createMascota = async (req: Request, res: Response) => {
    const { nombre, edad, raza, tamano, estado_salud, estado_adopcion } = req.body;
    if (!nombre || !edad || !raza || !tamano || !estado_salud || !estado_adopcion) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }
    try {
        const mascota = await MascotaModel.createMascota({
            nombre,
            edad,
            raza,
            tamano,
            estado_salud,
            estado_adopcion,
        });
        res.status(201).json(mascota);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear mascota', error });
    }
};

// Actualizar mascota
export const updateMascota = async (req: Request, res: Response) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const existente = await MascotaModel.getMascotaById(Number(id));
        if (!existente) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        const mascota = await MascotaModel.updateMascota(Number(id), datos);
        res.json(mascota);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar mascota', error });
    }
};

// Eliminar mascota
export const deleteMascota = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existente = await MascotaModel.getMascotaById(Number(id));
        if (!existente) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        const result = await MascotaModel.deleteMascota(Number(id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar mascota', error });
    }
};
