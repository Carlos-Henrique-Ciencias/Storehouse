import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Tombamento from './screens/Tombamento';
import Inventario from './screens/Inventario';
import GestaoAtivo from './screens/GestaoAtivo';
import Historico from './screens/Historico';
import Usuarios from './screens/Usuarios';
import Login from './screens/Login';
import { LayoutDashboard, ShieldCheck, ClipboardList, LogOut, Users } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth') === 'true');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  // Sincroniza a Role sempre que o login mudar
  useEffect(() => {
    if (isAuthenticated) {
      setUserRole(localStorage.getItem('userRole'));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserRole('');
  };

  // Verificação de Poder Total (Item 5.3)
  // Aceita "Gestor", "gestor" ou o login "admin"
  const temPoderTotal = 
    userRole?.toLowerCase() === 'gestor' || 
    localStorage.getItem('userName') === 'admin';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={setIsAuthenticated} /> : <Navigate to="/" />} />
        
        <Route path="/*" element={isAuthenticated ? (
            <LayoutMain onLogout={handleLogout} isGestor={temPoderTotal}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/inventario" element={<Inventario />} />
                    <Route path="/gestao/:tag/*" element={<GestaoAtivo />} />
                    <Route path="/historico/:tag/*" element={<Historico />} />
                    
                    {/* Rotas Bloqueadas */}
                    <Route path="/tombamento" element={temPoderTotal ? <Tombamento /> : <Navigate to="/" />} />
                    <Route path="/usuarios" element={temPoderTotal ? <Usuarios /> : <Navigate to="/" />} />
                </Routes>
            </LayoutMain>
        ) : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function LayoutMain({ children, onLogout, isGestor }) {
    return (
      <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <img src="/logo-camara.png" className="h-16 mx-auto" alt="Câmara Municipal" />
          </div>
          <nav className="flex-1 px-4 py-6 space-y-3">
            <NavLink to="/" icon={<LayoutDashboard size={20} />} label="Painel Geral" />
            
            {/* SÓ APARECE SE TIVER PODER TOTAL */}
            {isGestor && (
                <>
                    <NavLink to="/tombamento" icon={<ShieldCheck size={20} />} label="Novo Tombamento" />
                    <NavLink to="/usuarios" icon={<Users size={20} />} label="Gestão de Operadores" />
                </>
            )}
            
            <NavLink to="/inventario" icon={<ClipboardList size={20} />} label="Inventário Contábil" />
          </nav>
          <div className="p-4 border-t border-gray-100">
            <button onClick={onLogout} className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 font-bold text-sm transition-all">
                <LogOut size={20} /> <span>Sair do Sistema</span>
            </button>
          </div>
        </aside>
        <main className="flex-1 p-10 bg-gray-50">{children}</main>
      </div>
    );
}

function NavLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
  return (
    <Link to={to} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm ${isActive ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50'}`}>
      {icon} <span>{label}</span>
    </Link>
  );
}
