import { Request, Response } from 'express';
import * as PersonaModel from '../models/persona.model';

export const getAllPersonas = async (_req: Request, res: Response) => {
  const personas = await PersonaModel.getAllPersonas();
  res.json(personas);
};

export const getPersonaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const persona = await PersonaModel.getPersonaById(Number(id));
  persona ? res.json(persona) : res.status(404).json({ message: 'No encontrada' });
};

export const createPersona = async (req: Request, res: Response) => {
  const persona = await PersonaModel.createPersona(req.body);
  res.status(201).json(persona);
};

export const updatePersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  const persona = await PersonaModel.updatePersona(Number(id), req.body);
  res.json(persona);
};

export const deletePersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PersonaModel.deletePersona(Number(id));
  res.json(result);
};
