import { RequestHandler } from 'express';
import { getLists, saveList } from '../services/list';
import { List } from '@shared/types/list';

export const addListController: RequestHandler = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ messages: 'parameter "title" is required' });
      return;
    }

    const { title = '', description = '' } = req.body;
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
    res.json({ data: lists });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
