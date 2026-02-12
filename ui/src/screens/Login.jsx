import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Lock, User } from 'lucide-react';

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.post('/Auth/login', { username: user, password: pass });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('auth', 'true');
      localStorage.setItem('userName', response.data.user);
      localStorage.setItem('userRole', response.data.role);
      
      onLogin(true);
      navigate('/');
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
        <div className="flex justify-center mb-6">
            <img src="/logo-camara.png" alt="Câmara Municipal" className="h-24 object-contain" />
        </div>
        
        <h2 className="text-2xl font-black text-center text-gray-800 uppercase mb-2">Acesso Restrito</h2>
        <p className="text-center text-green-700 text-[10px] font-bold mb-8 uppercase tracking-widest">Sistema de Patrimônio • Forja Codebros</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Usuário de Rede</label>
            <div className="flex items-center gap-3 bg-white border-2 border-gray-300 p-3 rounded-xl mt-1 focus-within:border-green-600 transition-all shadow-sm">
                <User className="text-gray-400" size={18} />
                <input 
                  className="bg-transparent outline-none font-bold text-gray-900 w-full placeholder-gray-400" 
                  value={user} 
                  onChange={e => setUser(e.target.value)} 
                  placeholder="Digite seu usuário" 
                  required 
                />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Chave de Acesso</label>
             <div className="flex items-center gap-3 bg-white border-2 border-gray-300 p-3 rounded-xl mt-1 focus-within:border-green-600 transition-all shadow-sm">
                <Lock className="text-gray-400" size={18} />
                <input 
                  type="password" 
                  className="bg-transparent outline-none font-bold text-gray-900 w-full placeholder-gray-400" 
                  value={pass} 
                  onChange={e => setPass(e.target.value)} 
                  placeholder="••••••••" 
                  required 
                />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button className="w-full bg-green-700 hover:bg-green-800 text-white p-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-green-900/20 transition-all active:scale-[0.98]">
            Entrar no Sistema
          </button>
        </form>
        
        <p className="text-center text-[9px] text-gray-400 mt-8 font-mono uppercase">
            Ambiente Seguro • LGPD Compliant
        </p>
      </div>
    </div>
  );
}
