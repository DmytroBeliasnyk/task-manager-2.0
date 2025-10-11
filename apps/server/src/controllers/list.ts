import { RequestHandler } from 'express';
import { getLists, saveList, updateList } from '../services/list';
import { List } from '@shared/types/list';
import NonExistentIDError from '../utils/errors/NonExistentIDError';

export const addListController: RequestHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ messages: 'parameter "title" is required' });
      return;
    }

    const id: string = await saveList(title, description);
    res.status(201).json({ id: id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getListsController: RequestHandler = async (req, res) => {
  try {
    const lists: Array<List> = await getLists();
    res.status(200).json({ lists: lists });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const updateListController: RequestHandler = async (req, res) => {
  try {
    const { id, title, description } = req.body;

    if (!id) {
      res.status(400).json({ messages: 'parameter "id" is required' });
      return;
    }

    if (!title) {
      res.status(400).json({ messages: 'parameter "title" is required' });
      return;
    }

    await updateList(id, title, description);

    res.status(201).end();
  } catch (err) {
    const status: number = err instanceof NonExistentIDError
      ? 400 : 500;

    res.status(status).json({message: err});
  }
};