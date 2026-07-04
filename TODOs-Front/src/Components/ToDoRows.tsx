import { Check, CheckCheck, Clock, PenSquareIcon, TargetIcon, Trash2 } from "lucide-react";
import { setDeleteModalStatus, setEditModalStatus, setTarget } from "../Utils/useTODOStore";
import type { TaskType } from "../Utils/myTypes";



export default function ToDoRows({ todo }: { todo: TaskType }) {


  return (

    <tbody className="divide-y divide-slate-700/50 text-slate-300">
      <tr className="group transition-colors hover:bg-slate-800/50">
        <td className="p-5">
          {
            todo.status ?
              <div className="flex items-center gap-3">
                <CheckCheck className="text-emerald-400" />
                <span className="font-bold text-slate-400 text-lg line-through decoration-slate-500">{todo.task}</span>
              </div>
              :
              <div className="flex items-center gap-3">
                <TargetIcon className="text-cyan-400 group-hover:animate-pulse" />
                <span className="font-bold text-white text-lg">{todo.task}</span>
              </div>
          }
        </td>
        <td className="p-5">
          <span className="text-sm font-mono text-slate-400">{new Date(todo.date).toUTCString()}</span>
        </td>
        <td className="p-5">
          {
            todo.status ?
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)] uppercase">
                <Check size={17} /> Completed
              </span>
              :
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)] uppercase">
                <Clock size={17} /> Pending
              </span>

          }
        </td>
        <td className="p-5 text-center">
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => {
              setTarget(todo)
              setEditModalStatus(true)
            }}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:border-cyan-500 hover:bg-slate-700 hover:text-white">
              <PenSquareIcon size={17} /> Edit
            </button>
            <button onClick={() => {
              setTarget(todo)
              setDeleteModalStatus(true)
            }}
              className="flex items-center justify-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/20 hover:text-rose-300">
              <Trash2 size={17} /> Delete
            </button>
          </div>
        </td>
      </tr>



    </tbody>
  );
}