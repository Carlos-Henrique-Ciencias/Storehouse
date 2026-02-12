import React, { useState } from 'react';
import api from '../api';
import { UserPlus, Shield, Users } from 'lucide-react';

export default function Usuarios() {
  const [form, setForm] = useState({ username: '', password: '', role: 'Operador' });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Auth/register', form);
      alert("Usuário " + form.username + " cadastrado com sucesso!");
      setForm({ username: '', password: '', role: 'Operador' });
    } catch (err) {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <div className="bg-purple-600 p-3 rounded-2xl text-white shadow-lg shadow-purple-900/20">
            <Users size={28} />
        </div>
        <div>
           <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Gestão de Operadores</h2>
           <p className="text-sm font-bold text-purple-600 uppercase tracking-wider">Controle de Acessos (Item 5.3)</p>
        </div>
      </div>

      <div className="max-w-xl bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex items-center gap-2 text-purple-800 font-bold uppercase text-xs mb-4">
            <UserPlus size={18} /> Cadastrar Novo Acesso
          </div>
          
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome de Usuário</label>
            <input className="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl mt-1 outline-none font-bold focus:border-purple-500" 
              value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Senha Provisória</label>
            <input type="password" className="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl mt-1 outline-none font-bold focus:border-purple-500" 
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Perfil de Acesso</label>
            <select className="w-full bg-gray-50 border-2 border-gray-100 p-3 rounded-xl mt-1 outline-none font-bold focus:border-purple-500"
              value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
              <option value="Operador">Operador (Apenas Consulta/Tombamento)</option>
              <option value="Gestor">Gestor (Acesso Total)</option>
              <option value="Auditor">Auditor (Apenas Relatórios)</option>
            </select>
          </div>

          <button className="w-full bg-purple-600 text-white p-4 rounded-xl font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/20">
            Confirmar Cadastro
          </button>
        </form>
      </div>
    </div>
  );
}
