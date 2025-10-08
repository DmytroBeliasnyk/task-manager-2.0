import express, { Router } from 'express';
import { addListController, getListsController } from '../controllers/list';
import { addTaskController } from '../controllers/task';

export const apiRouter: Router = express.Router();

apiRouter.get('/lists', getListsController);
apiRouter.post('/add_list', addListController);
apiRouter.post('/add_task', addTaskController);