import { RequestHandler } from 'express';
import { getLists, saveList, updateList } from '../services/list';
import NonExistentIDError from '../utils/errors/NonExistentIDError';
import { deleteListFromDB } from '../repo/list';

export const addListController: RequestHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ messages: 'parameter "title" is required' });
      return;
    }

    const id = await saveList(title, description);
    res.status(201).json({ id: id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getListsController: RequestHandler = async (req, res) => {
  try {
    const lists = await getLists();
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
    const status = err instanceof NonExistentIDError
      ? 400 : 500;

    res.status(status).json({ message: err });
  }
};

export const deleteListController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ messages: 'parameter "id" is required' });
      return;
    }

    await deleteListFromDB(id);
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};