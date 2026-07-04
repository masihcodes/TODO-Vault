import z from "zod";



export const userSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),
  email: z.email('a valid email is required'),
  password: z.string().min(6, 'password must be at least 6 characters'),
})

export const createTaskSchema = z.object({
  task: z.string().min(10, 'name must be at least 10 characters'),
  status: z.boolean().optional(),
  date: z.string().optional(),
})

export const updateTaskSchema = z.object({
  id: z.number(),
  task: z.string().min(10, 'name must be at least 10 characters'),
  status: z.boolean().optional(),
  date: z.string().optional(),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),
  email: z.email('a valid email is required'),
  password: z.string().min(6, 'password must be at least 6 characters'),
}).strict();

export const loginSchema = z.object({
  email: z.email('a valid email is required'),
  password: z.string().min(1, 'password is required'),
}).strict();