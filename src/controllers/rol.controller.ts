import { Request, Response } from 'express';
import * as RolModel from '../models/rol.model';

export const getAllRoles = async (_req: Request, res: Response) => {
    try {
        const roles = await RolModel.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener roles', error });
    }
};

export const getRolById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rol = await RolModel.getRolById(Number(id));
        if (rol) {
            res.json(rol);
        } else {
            res.status(404).json({ message: 'Rol no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener rol', error });
    }
};

export const createRol = async (req: Request, res: Response) => {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: 'Nombre es requerido' });
    }
    try {
        const nuevoRol = await RolModel.createRol(nombre);
        res.status(201).json(nuevoRol);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear rol', error });
    }
};

export const updateRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: 'Nombre es requerido' });
    }
    try {
        const rolExistente = await RolModel.getRolById(Number(id));
        if (!rolExistente) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        const rolActualizado = await RolModel.updateRol(Number(id), nombre);
        res.json(rolActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar rol', error });
    }
};

export const deleteRol = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const rolExistente = await RolModel.getRolById(Number(id));
        if (!rolExistente) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        const resultado = await RolModel.deleteRol(Number(id));
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar rol', error });
    }
};
