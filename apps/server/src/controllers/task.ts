import { RequestHandler } from 'express';
import { getTasks, saveTask, updateTask } from '../services/task';
import { deleteTaskFromDB } from '../repo/task';
import ValidationError from '../utils/errors/ValidationError';
import { asyncHandler } from '../middleware/asyncHandler';

export const addTaskController: RequestHandler = asyncHandler(async (req, res) => {
  const { title, description, listId } = req.body;
  if (!title || !listId) {
    throw new ValidationError('parameter "title" and "listId" are required');
  }

  const id = await saveTask(title, description, listId);
  res.status(201).json({ id: id });
});

export const getTasksController: RequestHandler = asyncHandler(async (req, res) => {
  const { list_id: listId } = req.query;

  if (!listId) {
    throw new ValidationError('list_id is required');
  }

  const tasks = await getTasks(String(listId));
  res.status(200).json({ tasks: tasks });
});

export const updateTaskController: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title) {
    throw new ValidationError('parameter "title" is required');
  }

  if (!id) {
    throw new ValidationError('parameter "id" is required');
  }

  const updatedTask = await updateTask(id, title, description);
  res.status(200).json({ updatedTask: updatedTask });
});

export const deleteTaskController: RequestHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ValidationError('parameter "id" is required');
  }

  await deleteTaskFromDB(id);
  res.status(200).end();
});
