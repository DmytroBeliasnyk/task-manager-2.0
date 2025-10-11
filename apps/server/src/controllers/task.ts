import { RequestHandler } from 'express';
import { saveTask, updateTask } from '../services/task';
import NonExistentIDError from '../utils/errors/NonExistentIDError';
import { Task } from '@shared/types/task';

export const addTaskController: RequestHandler = async (req, res) => {
  try {
    const { title, description, listId } = req.body;
    if (!title || !listId) {
      res.status(400).json({ messages: 'parameter "title" and "listId" are required' });
      return;
    }

    const id: string = await saveTask(title, description, listId);
    res.status(201).json({ id: id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const updateTaskController: RequestHandler = async (req, res) => {
  try {
    const { id, title, description } = req.body;
    if (!title || !id) {
      res.status(400).json({ messages: 'parameter "title" and "id" are required' });
      return;
    }

    const updatedTask: Task = await updateTask(id, title, description);

    res.status(201).json({updatedTask: updatedTask});
  } catch (err) {
    const status: number = err instanceof NonExistentIDError
      ? 400 : 500;

    res.status(status).json({message: err});
  }
};