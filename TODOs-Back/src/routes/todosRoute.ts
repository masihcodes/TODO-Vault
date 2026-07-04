import { Router } from "express"

import { createTask, getAllTask, removeTask, updateTask } from "#controllers/todosController.js";
import { validateBodyZod } from "#middlewares/validateBodyZod.js";
import { createTaskSchema, updateTaskSchema } from "#zosSchema/index.js";
import { authenticate } from "#middlewares/authenticate.js";





export const todosRouter = Router()


todosRouter.route("/")
  .get(authenticate, getAllTask)
  .post(authenticate, validateBodyZod(createTaskSchema), createTask)
  .put(authenticate, validateBodyZod(updateTaskSchema), updateTask)

todosRouter.route("/:id")
  .delete(authenticate, removeTask)
// .put(authenticate, validateBodyZod(taskSchema), updateTask)
