import { useState } from "react";
import { setAddModalStatus, useTODOStore } from "../Utils/useTODOStore";
import { useCreateTask } from "../API/useTODOQueries";
import { ChevronDown, Loader } from "lucide-react";




export default function AddModal() {

  const addModalStatus = useTODOStore((s) => s.addModalStatus);

  const [task, setTask] = useState({ task: "", date: new Date().toISOString().slice(0, 16) });

  const { mutate, isPending } = useCreateTask();




  return (
    <>
      {addModalStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-[0_0_40px] shadow-lime-900 transition-all">
            <div className="p-8 flex flex-col items-center gap-4">

              <div className="text-6xl mb-4 animate-pulse flex gap-2">
                <span>📜</span>
                <span className="animate-bounce">⚔️</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight text-center">
                NEW <span className="text-cyan-400">QUEST</span> AVAILABLE!
              </h2>

              <p className="text-md font-medium text-slate-300 leading-relaxed max-w-sm text-center mb-6">
                A wild challenge appears!
              </p>

              <div className="w-full space-y-4">
                <label className="block text-sm font-medium text-slate-400 text-left">
                  Quest Title / Mission Name
                  <input
                    onChange={(e) => setTask({ ...task, task: e.target.value })}
                    type="text"
                    required
                    placeholder="What epic deed shall you perform?..."
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-400 text-left w-full relative">
                  Time Window (Target Deadline)
                  <input
                    defaultValue={task.date}
                    onChange={(e) => setTask({ ...task, date: e.target.value })}
                    type="datetime-local"
                    required
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                  />
                  <div className="pointer-events-none absolute right-5 bottom-2.5 text-slate-500">
                    <ChevronDown />
                  </div>
                </label>

                <div className="flex w-full gap-4 mt-8 pt-6 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setAddModalStatus(false)}
                    className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
                    Run Away! 🏃‍♂️
                  </button>
                  <button
                    onClick={() => mutate(task)}
                    type="button"
                    className="flex-1 flex justify-center rounded-lg bg-cyan-600 px-6 py-3 font-bold text-white shadow-lg shadow-cyan-500/40 transition-all hover:bg-cyan-500 hover:-translate-y-1">
                    {isPending ? (<Loader className="animate-spin" />) : ""}Accept Quest ⚔️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
