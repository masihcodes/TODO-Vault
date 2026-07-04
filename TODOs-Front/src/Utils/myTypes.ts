export interface todoStoreType<T1, T2> {
  signInModalStatus: boolean;
  signUpModalStatus: boolean;
  editModalStatus: boolean;
  deleteModalStatus: boolean;
  addModalStatus: boolean;
  target: T1;
  user: T2;
}


export interface TaskType {
  id: number;
  task: string;
  status: boolean;
  date: string;
  userID: number;
}


export interface UserType {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  password?: string;
}