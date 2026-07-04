import { useDeleteTask } from "../API/useTODOQueries";
import { setDeleteModalStatus, useTODOStore } from "../Utils/useTODOStore";



export default function DeleteModal() {
  const deleteModalStatus = useTODOStore(s => s.deleteModalStatus);
  const target = useTODOStore(s => s.target)
  const { mutate } = useDeleteTask()

  return (
    <>
      {deleteModalStatus && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4'>
          <div className='relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-[0_0_40px] shadow-rose-900 transition-all'>

            <div className="p-8 flex flex-col items-center text-center">

              <div className="text-7xl mb-4 animate-bounce">🗑️</div>

              <h2 className="text-4xl font-extrabold text-white mb-2">ABANDON SHIP! 🚨</h2>

              <p className="text-rose-400 mb-6 font-semibold">
                -50 Productivity XP (Procrastination: +9000)
              </p>

              <p className="text-md font-medium text-slate-300 leading-relaxed max-w-sm">
                Giving up already? 😂 <br />
                We get it, some tasks are just too scary. We'll send this one straight to the digital void. <br />
                Nobody has to know... 🤫
              </p>

              <div className="flex w-full gap-4 mt-8 justify-center">
                <button
                  onClick={() => setDeleteModalStatus(false)}
                  className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-6 py-3 font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
                  Nah, I'm brave!
                </button>
                <button
                  onClick={() => {
                    mutate(target.id)
                    console.log(target.id)
                  }}
                  className="flex-1 rounded-lg bg-rose-600 px-6 py-3 font-bold text-white shadow-lg shadow-rose-500/40 transition-all hover:bg-rose-500 hover:-translate-y-1">
                  Nuke it! 💥
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}