import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Tombamento from './screens/Tombamento';
import Inventario from './screens/Inventario';
import GestaoAtivo from './screens/GestaoAtivo';
import Historico from './screens/Historico';
import { LayoutDashboard, ShieldCheck, ClipboardList } from 'lucide-react';

export default function App() {
  return (
    <Router>
      {/* MUDANÇA DE TEMA: Fundo claro (bg-gray-50) e texto escuro (text-gray-800) */}
      <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
        
        {/* MUDANÇA DE TEMA: Sidebar branca (bg-white) com borda clara (border-gray-200) */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen shadow-sm">
          
          {/* ÁREA DA LOGO: Substituímos o ícone e texto pela imagem */}
          <div className="p-6 flex justify-center items-center border-b border-gray-100 bg-white">
            <img 
              src="/logo-camara.png" 
              alt="Câmara Municipal de Ourolândia" 
              className="h-20 w-auto object-contain hover:scale-105 transition-transform"
            />
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-3 bg-white">
            <NavLink to="/" icon={<LayoutDashboard size={20} />} label="Painel Geral" />
            <NavLink to="/tombamento" icon={<ShieldCheck size={20} />} label="Novo Tombamento" />
            <NavLink to="/inventario" icon={<ClipboardList size={20} />} label="Inventário Contábil" />
          </nav>
        </aside>
        
        {/* MUDANÇA DE TEMA: Fundo principal claro */}
        <main className="flex-1 p-10 bg-gray-50 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tombamento" element={<Tombamento />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/gestao/:tag/*" element={<GestaoAtivo />} />
            <Route path="/historico/:tag/*" element={<Historico />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function NavLink({ to, icon, label }) {
  const location = useLocation();
  // Lógica de seleção ajustada para não prender a cor
  const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
  
  return (
    <Link to={to} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm tracking-tight
      ${isActive 
        ? 'bg-green-600 text-white shadow-md shadow-green-900/20' // Ativo: Verde bandeira com texto branco
        : 'text-gray-600 hover:bg-green-50 hover:text-green-700' // Inativo: Cinza, hover verde claro
      }`}>
      {icon} <span>{label}</span>
    </Link>
  );
}
