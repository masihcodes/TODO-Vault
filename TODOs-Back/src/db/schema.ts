import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";


export const userRole = pgEnum("role", ["admin", "user"])

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  role: userRole("role").default("user").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})


export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: text("task").notNull(),
  status: boolean("status").default(false).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  userID: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
})