import express, { Router } from 'express';
import { addListController, getListsController, updateListController } from '../controllers/list';
import { addTaskController, updateTaskController } from '../controllers/task';

export const apiRouter: Router = express.Router();

apiRouter.post('/add_list', addListController);
apiRouter.get('/lists', getListsController);
apiRouter.post('/update_list', updateListController);

apiRouter.post('/add_task', addTaskController);
apiRouter.post('/update_task', updateTaskController)