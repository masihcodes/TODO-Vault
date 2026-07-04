import { ChevronDown, ListCheckIcon, PlusIcon } from "lucide-react";
import ToDoRows from "../Components/ToDoRows";
import EditModal from "../Modals/EditModal";
import DeleteModal from "../Modals/DeleteModal";
import { useGetAllTasks } from "../API/useTODOQueries";
import { resetTarget, setAddModalStatus } from "../Utils/useTODOStore";
import AddModal from "../Modals/AddModal";
import { useState } from "react";






export default function ToDo() {

  const [sort, setSort] = useState("")

  const { data } = useGetAllTasks(sort)




  return (
    <main className="mx-auto p-4 mt-10 w-full max-w-8xl">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-800 pb-6 gap-4">
        <div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <ListCheckIcon className="text-cyan-500" /> Active Tasks
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Organize today, conquer tomorrow.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">

          <div className="flex w-full sm:w-auto overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 transition-all focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
            <div className="relative w-full bg-slate-900/30 transition-colors hover:bg-slate-800">
              <select onChange={e => setSort(e.target.value)}
                className="w-full cursor-pointer appearance-none bg-transparent py-3 pl-4 pr-10 text-white focus:outline-none">
                <option value="date">Sort By Date</option>
                <option value="task">Sort By Task</option>
                <option value="status">Sort By Status</option>
                <option value="id">Recently Added</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                <ChevronDown />
              </div>
            </div>
          </div>

          <button onClick={() => {
            resetTarget()
            setAddModalStatus(true)
          }}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/40 transition-all hover:bg-cyan-500 disabled:opacity-75">
            <PlusIcon /> Add New Task
          </button>

        </div>
      </div>

      <div id="table-container" className="mt-8 max-w-7xl mx-auto">

        <div className="w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/30 shadow-2xl shadow-cyan-900/20">
          <table className="w-full text-left border-collapse">

            <thead>
              <tr
                className="border-b border-slate-700/50 bg-slate-800/50 text-sm font-bold uppercase tracking-wider text-slate-400">
                <th className="p-5">Task Name</th>
                <th className="p-5">Date & Time</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>

            {data.map(todo => (<ToDoRows key={todo.id} todo={todo} />))}

          </table>
        </div>

      </div>

      <EditModal />
      <DeleteModal />
      <AddModal />

    </main>
  );
}