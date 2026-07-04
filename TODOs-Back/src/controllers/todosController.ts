import type { RequestHandler } from 'express';


import { db } from '#db/db.js';
import { todos } from '#db/schema.js';
import { and, asc, desc, eq } from 'drizzle-orm';




export const getAllTask: RequestHandler = async (req, res, next) => {

  const sort = req.query.sort || "id"
  let orderByClause;
  switch (sort) {
    case "task":
      orderByClause = asc(todos.task);
      break;
    case "status":
      orderByClause = asc(todos.status);
      break;
    case "date":
      orderByClause = desc(todos.date);
      break;
    case "id":
    default:
      orderByClause = desc(todos.id);
      break;
  }


  try {
    const userID = Number(req?.user?.id)
    const allTask = await db.select().from(todos).where(eq(todos.userID, userID)).orderBy(orderByClause)
    // const allTask = await db.select().from(todos).where(eq(todos.userID, userID)).orderBy(desc(todos[sort]))

    res.status(200).json(allTask)
  }
  catch (err: unknown) {
    return err instanceof Error ? next({ status: 500, details: err.message }) : next({ status: 500, details: String(err) })
  }
}



export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const payload = {
      task: req.body.task,
      date: new Date(req.body.date),
      userID: Number(req?.user?.id)
    }
    const [newTask] = await db.insert(todos).values(payload).returning()

    if (!newTask) return next({ status: 500, details: "TODO Not Created" })

    res.status(200).json(newTask)
  }
  catch (err: unknown) {
    return err instanceof Error ? next({ status: 500, details: err.message }) : next({ status: 500, details: String(err) })
  }
}



export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const payload = {
      id: Number(req.body.id),
      task: req.body.task,
      date: new Date(req.body.date),
      status: req.body.status,
      userID: Number(req?.user?.id)
    }
    const [newTask] = await db
      .update(todos)
      .set(payload)
      .where(
        and(
          eq(todos.id, payload.id),
          eq(todos.userID, payload.userID)
        )
      ).returning()

    if (!newTask) return next({ status: 404, details: "TODO Not Updated" })

    res.status(200).json(newTask)
  }
  catch (err: unknown) {
    return err instanceof Error ? next({ status: 500, details: err.message }) : next({ status: 500, details: String(err) })
  }
}


export const removeTask: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const userID = Number(req?.user?.id)

    const removedTask = await db
      .delete(todos)
      .where(
        and(
          eq(todos.id, id),
          eq(todos.userID, userID)
        )
      )
      .returning()

    if (removedTask.length === 0) return next({ status: 404, details: "TODO Not Deleted" })

    res.status(200).json(removedTask)
  }
  catch (err: unknown) {
    return err instanceof Error ? next({ status: 500, details: err.message }) : next({ status: 500, details: String(err) })
  }
}

