import express, { Router } from 'express';
import { addListController, deleteListController, getListsController, updateListController } from '../controllers/list';
import { addTaskController, deleteTaskController, getTasksController, updateTaskController } from '../controllers/task';

export const apiRouter: Router = express.Router();

apiRouter.post('/add_list', addListController);
apiRouter.get('/lists', getListsController);
apiRouter.post('/update_list', updateListController);
apiRouter.delete('/list', deleteListController);

apiRouter.post('/add_task', addTaskController);
apiRouter.get('/tasks', getTasksController);
apiRouter.post('/update_task', updateTaskController);
apiRouter.delete('/task', deleteTaskController);