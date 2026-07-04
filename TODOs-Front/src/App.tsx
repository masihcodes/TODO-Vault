import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToDo from './Pages/ToDo';
import { Suspense } from 'react';
import ProtectedRoute from './Components/ProtectedRoute';

const client = new QueryClient();

export default function App() {


  return (
    <QueryClientProvider client={client}>
      <div className="bg-slate-950 text-slate-200 flex flex-col w-full min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col w-full mx-auto p-4 mt-10">
          <Suspense fallback={<div className="flex mt-10 justify-center min-h-screen text-5xl text-cyan-400 font-bold">Loading...⏳</div>}>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/todo' element={
                <ProtectedRoute>
                  <ToDo />
                </ProtectedRoute>} />
            </Routes>

          </Suspense>
        </div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}