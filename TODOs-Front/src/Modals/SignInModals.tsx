import { Loader, LogIn, X } from "lucide-react";
import {
  setSignInModalStatus,
  setSignUpModalStatus,
  useTODOStore,
} from "../Utils/useTODOStore";
import { useState } from "react";
import { useLogin } from "../API/useAuthQueries";

export default function SignInModal() {
  const signInModalStatus = useTODOStore((s) => s.signInModalStatus);

  const [user, setUser] = useState({ email: "", password: "" });

  const { mutate, isPending } = useLogin();

  return (
    <>
      {signInModalStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-cyan-900/20 p-6">
            <button
              className="text-slate-400 transition-colors hover:text-white absolute top-4 right-4 "
              onClick={() => {
                setSignInModalStatus(false);
              }}>
              <X />
            </button>

            <div className="mb-8 text-center">
              <LogIn className="mx-auto mb-3 h-10 w-10 text-cyan-400" />
              <h2 className="text-3xl font-extrabold text-white">Sign In</h2>
              <p className="mt-2 text-slate-400">
                Welcome back to DevStack Vault
              </p>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-medium text-slate-400">
                Email
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <label className="block text-sm font-medium text-slate-400">
                Password
                <input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                />
              </label>
              <button
                onClick={() => mutate(user)}
                type="button"
                disabled={isPending}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 py-3 font-medium text-white shadow-lg shadow-cyan-500/40 transition-all hover:bg-cyan-500 disabled:opacity-75">
                {isPending ? (<Loader className="animate-spin" />) : (<LogIn className="h-4 w-4" />)}Sign In
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => {
                  setSignUpModalStatus(true);
                  setSignInModalStatus(false);
                }}
                className="font-medium text-cyan-400 hover:text-cyan-300 cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
