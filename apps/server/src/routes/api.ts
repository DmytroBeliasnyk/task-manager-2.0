import express, {Router} from "express";
import {addListController, getListsController} from "../controllers/list";

export const apiRouter: Router = express.Router()

apiRouter.get('/lists', getListsController)
apiRouter.post('/add_list', addListController)