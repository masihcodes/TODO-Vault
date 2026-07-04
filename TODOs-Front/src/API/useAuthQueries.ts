import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { resetUser, setSignInModalStatus, setSignUpModalStatus, setUser } from "../Utils/useTODOStore"
import type { UserType } from "../Utils/myTypes"
import { useNavigate } from "react-router-dom"






const url = "https://todo-vault-api.onrender.com/auth/"


export function useRegister() {
  const client = useQueryClient()
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newUser: Pick<UserType, "name" | "email" | "password">) => {
      const res = await axios.post(url + "register", newUser, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      return res.data
    },
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["user"] })
      setUser(data.user)
      setSignInModalStatus(false)
      setSignUpModalStatus(false)
      navigate('/todo', { replace: true });
    }
  })
}


export function useLogin() {
  const client = useQueryClient()
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (user: Pick<UserType, "email" | "password">) => {
      const res = await axios.post(url + "login", user, { headers: { "Content-Type": "application/json" }, withCredentials: true })
      return res.data
    },
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["user"] })
      setUser(data.user)
      setSignInModalStatus(false)
      setSignUpModalStatus(false)
      navigate('/todo', { replace: true });
    }
  })
}


export function useLogout() {
  const client = useQueryClient()
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(url + "logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      return res.data
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user"] })
      resetUser()
      navigate('/', { replace: true });
    }
  })
}