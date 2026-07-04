export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  password: string;
  createdAt: Date;
}

export interface TODOs {
  id: number;
  task: string;
  status: boolean;
  date: Date;
  userID: number;
}
