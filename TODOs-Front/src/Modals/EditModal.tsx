import { setEditModalStatus, useTODOStore } from "../Utils/useTODOStore";
import { useUpdateTask } from "../API/useTODOQueries";
import { ChevronDown, Loader } from "lucide-react";

export default function EditModal() {

  const editModalStatus = useTODOStore((s) => s.editModalStatus);
  const target = useTODOStore((s) => s.target);

  const { mutate, isPending } = useUpdateTask();

  function handleForm(formData: FormData) {
    const id = target.id as number
    const task = formData.get('task') as string
    const date = formData.get('date') as string
    const status = (formData.get('status') === 'true') ? true : false
    const userID = target.userID
    mutate({ id, task, date, status, userID })
  }

  return (
    <>
      {editModalStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-[0_0_40px] shadow-amber-900 transition-all">
            <div className="p-8 flex flex-col items-center gap-4">
              <div className="text-6xl mb-4 flex items-center justify-center gap-4">
                <span className="animate-spin-slow">⏳</span>
                <span>✍️</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight text-center">
                The{" "}
                <span className="text-amber-400">"Tactical Adjustment"</span> 🪄
              </h2>

              <form action={handleForm} className="w-full space-y-4">

                <label className="block text-sm font-medium text-slate-400 text-left">
                  Mission Name
                  <input
                    name="task"
                    defaultValue={target.task}
                    type="text"
                    placeholder="Rename your glorious mission..."
                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white transition-colors focus:border-amber-500 focus:outline-none"
                  />
                </label>

                <div className="flex gap-4">
                  <label className="block text-sm font-medium text-slate-400 text-left w-full relative">
                    New Deadline
                    <input
                      name="date"
                      defaultValue={target.date.slice(0, 16)}
                      type="datetime-local"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white transition-colors focus:border-amber-500 focus:outline-none"
                    />
                    <div className="pointer-events-none absolute right-5 bottom-2.5 text-slate-500">
                      <ChevronDown />
                    </div>
                  </label>

                  <label className="block text-sm font-medium text-slate-400 text-left w-full relative">
                    Status
                    <select
                      name="status"
                      defaultValue={String(target.status)}
                      className="mt-1 w-full appearance-none rounded-lg border border-slate-700 bg-slate-950 p-3 text-white transition-colors focus:border-amber-500 focus:outline-none cursor-pointer">
                      <option value="false">Pending (Still thinking...)</option>
                      <option value="true">Completed (Nailed it! 🎯)</option>
                    </select>
                  </label>
                </div>

                <div className="flex w-full gap-4 mt-8 pt-6 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditModalStatus(false)}
                    className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
                    Oops, Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex justify-center rounded-lg bg-amber-600 px-6 py-3 font-bold text-white shadow-lg shadow-amber-500/40 transition-all hover:bg-amber-500 hover:-translate-y-1">
                    {isPending ? (<Loader className="animate-spin" />) : ""}Rewrite History ✨
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
