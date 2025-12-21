import express, { Router } from 'express';
import {
  addListController,
  deleteListController,
  getListsController,
  updateListController,
} from '../controllers/list';
import {
  addTaskController,
  deleteTaskController,
  getTasksController,
  updateTaskController,
} from '../controllers/task';

export const apiRouter: Router = express.Router();

apiRouter.post('/list', addListController);
apiRouter.get('/list', getListsController);
apiRouter.put('/list/:id', updateListController);
apiRouter.delete('/list/:id', deleteListController);

apiRouter.post('/task', addTaskController);
apiRouter.get('/task', getTasksController);
apiRouter.put('/task/:id', updateTaskController);
apiRouter.delete('/task/:id', deleteTaskController);
