import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import axios from "axios"
import type { TaskType } from "../Utils/myTypes"
import { setAddModalStatus, setDeleteModalStatus, setEditModalStatus } from "../Utils/useTODOStore"




// const url = "https://todo-vault-api.onrender.com/todos/"
const url = "/api/todos/";



export function useGetAllTasks(sort: string) {
  return useSuspenseQuery({
    queryKey: ["todo", sort],
    queryFn: async () => {
      const res = await axios.get(url + `?sort=${sort}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      return res.data as TaskType[]
    }
  })
}


export function useCreateTask() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async (newTask: Pick<TaskType, 'task' | 'date'>) => {
      const res = await axios.post(url, newTask, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      return res.data
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todo"] })
      setAddModalStatus(false)
    }
  })
}

export function useUpdateTask() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async (task: TaskType) => {
      const res = await axios.put(url, task, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      return res.data
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todo"] })
      setEditModalStatus(false)
    }
  })
}


export function useDeleteTask() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await axios.delete(url + String(id), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      return res.data
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["todo"] })
      setDeleteModalStatus(false)
    }
  })
}