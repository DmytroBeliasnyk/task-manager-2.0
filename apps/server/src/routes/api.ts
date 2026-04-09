import express, { Router } from 'express';
import {
  addListController,
  deleteListController,
  getListsController,
  updateListController,
} from '../controllers/api/list';
import {
  addTaskController,
  deleteTaskController,
  getTasksController,
  updateTaskController,
} from '../controllers/api/task';
import { updateUserData, updateUserPassword } from '../controllers/api/user';

export const apiRouter: Router = express.Router();

apiRouter.post('/list', addListController);
apiRouter.get('/list', getListsController);
apiRouter.put('/list/:id', updateListController);
apiRouter.delete('/list/:id', deleteListController);

apiRouter.post('/task', addTaskController);
apiRouter.get('/task', getTasksController);
apiRouter.put('/task/:id', updateTaskController);
apiRouter.delete('/task/:id', deleteTaskController);

apiRouter.put('/user/profile', updateUserData);
apiRouter.put('/user/password', updateUserPassword);
