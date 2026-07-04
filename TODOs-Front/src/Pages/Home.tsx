import { UserPlusIcon } from 'lucide-react';
import SignInModal from '../Modals/SignInModals';
import SignUpModal from '../Modals/SignUpModal';
import { setSignUpModalStatus } from '../Utils/useTODOStore';



export default function Home() {


  return (
    <div className="max-w-3xl mx-auto mt-8 mb-16 p-4 text-center w-full flex flex-col items-center justify-center gap-10">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)] mb-4">
        ⚡ Welcome to Your Workspace
      </span>
      <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-widest bg-linear-to-r from-slate-100 to-cyan-400 bg-clip-text text-transparent">
        Manage Your Life & Thoughts in a safe space
      </h2>
      <p className="text-slate-400 mb-8 text-lg max-w-xl mx-auto leading-relaxed">
        A secure, lightning-fast digital vault designed to capture the essence of your days and master your daily productivity.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={() => setSignUpModalStatus(true)}
          className="flex gap-2 bg-cyan-600 text-white px-8 py-4 rounded-xl hover:bg-cyan-500 transition duration-300 ease-in shadow-lg shadow-cyan-500/40 cursor-pointer font-bold">
          <UserPlusIcon /> Create Free Account
        </button>
      </div>

      <SignInModal />
      <SignUpModal />

    </div>
  );
}