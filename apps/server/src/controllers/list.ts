import { RequestHandler } from 'express';
import { getLists, saveList, updateList } from '../services/list';
import { deleteListFromDB } from '../repo/list';
import ValidationError from '../utils/errors/ValidationError';
import { asyncHandler } from '../middleware/asyncHandler';

export const addListController: RequestHandler = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    throw new ValidationError('parameter "title" is required');
  }

  const id = await saveList(title, description);
  res.status(201).json({ id: id });
});

export const getListsController: RequestHandler = asyncHandler(async (req, res) => {
  const lists = await getLists();
  res.status(200).json({ lists: lists });
});

export const updateListController: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title) {
    throw new ValidationError('parameter "title" is required');
  }

  if (!id) {
    throw new ValidationError('parameter "id" is required');
  }

  const updatedList = await updateList(id, title, description);
  res.status(200).json({ updatedList: updatedList });
});

export const deleteListController: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ValidationError('parameter "id" is required');
  }

  await deleteListFromDB(id);
  res.status(200).end();
});
