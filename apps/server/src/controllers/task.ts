import { RequestHandler } from 'express';
import { saveTask } from '../services/task';

export const addTaskController: RequestHandler = async (req, res) => {
  try {
    const { title = '', description = '', listId = ''} = req?.body;
    if (!req.body || !title || !listId) {
      res.status(400).json({ messages: 'parameter "title" and "listId" are required' });
      return;
    }

    const id: string = await saveTask(title, description, listId);
    res.status(201).json({ id: id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};