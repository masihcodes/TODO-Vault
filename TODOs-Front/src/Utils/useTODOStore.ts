import { create } from "zustand";
import type { TaskType, todoStoreType, UserType } from "./myTypes";





export const useTODOStore = create<todoStoreType<TaskType, UserType>>()(() => ({
  signInModalStatus: false,
  signUpModalStatus: false,
  editModalStatus: false,
  deleteModalStatus: false,
  addModalStatus: false,
  target: {
    id: 0,
    task: "",
    status: false,
    date: "",
    userID: 0
  },
  user: {
    id: 0,
    name: "",
    email: "",
    role: "user",
    createdAt: ""
  }

}))



export function setSignInModalStatus(input: boolean) {
  useTODOStore.setState({ signInModalStatus: input });
}

export function setSignUpModalStatus(input: boolean) {
  useTODOStore.setState({ signUpModalStatus: input });
}

export function setEditModalStatus(input: boolean) {
  useTODOStore.setState({ editModalStatus: input });
}

export function setDeleteModalStatus(input: boolean) {
  useTODOStore.setState({ deleteModalStatus: input });
}

export function setAddModalStatus(input: boolean) {
  useTODOStore.setState({ addModalStatus: input });
}

export function setTarget(input: TaskType) {
  useTODOStore.setState({
    target: {
      id: input?.id,
      task: input.task,
      status: input.status,
      date: input.date,
      userID: input?.userID
    }
  })
}


export function resetTarget() {
  useTODOStore.setState({
    target: {
      id: 0,
      task: "",
      status: false,
      date: "",
      userID: 0
    }
  })
}

export function setUser(input: UserType) {
  useTODOStore.setState({
    user: {
      id: input.id,
      name: input.name,
      email: input.email,
      role: input.role,
      createdAt: input.createdAt
    }
  })
}


export function resetUser() {
  useTODOStore.setState({
    user: {
      id: 0,
      name: "",
      email: "",
      role: "user",
      createdAt: ""
    }
  })
}