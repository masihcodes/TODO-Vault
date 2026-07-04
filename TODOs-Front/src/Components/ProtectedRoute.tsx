import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UserType } from "../Utils/myTypes";
import { Navigate } from "react-router-dom";
import { setUser } from "../Utils/useTODOStore";





export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

  const { isSuccess, isPending, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {

      const res = await axios.get("/api/auth/me", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      // const res = await axios.get("https://todo-vault-api.onrender.com/auth/me", {
      //   headers: { "Content-Type": "application/json" },
      //   withCredentials: true
      // });

      setUser(res.data as UserType);
      return res.data as UserType;
    },
    retry: false
  });

  if (isPending)
    return <div className="flex items-center justify-center min-h-screen text-cyan-400 font-bold">Verifying access...</div>;

  if (isError)
    return <Navigate to="/" replace />;

  if (isSuccess)
    return children;
}
