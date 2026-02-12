import React, { useState } from 'react';
import api from '../api';
import { ShieldCheck, Save, Hash, Info, DollarSign, Calendar, MapPin, UserCheck } from 'lucide-react';

export default function Tombamento() {
  const [formData, setFormData] = useState({
    tag: '', description: '', value: '', usefulLife: 60, dept: '', resp: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        value: parseFloat(formData.value),
        usefulLife: parseInt(formData.usefulLife),
        user: localStorage.getItem('userName') || 'admin'
      };
      await api.post('/Asset/tombamento', payload);
      alert("Bem tombado com sucesso!");
      setFormData({ tag: '', description: '', value: '', usefulLife: 60, dept: '', resp: '' });
    } catch (err) {
      alert("Erro ao salvar. Verifique se a TAG já existe.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans">
      <div className="flex items-center gap-4 pb-4 border-b-2 border-green-600/20">
        <div className="bg-green-700 p-3 rounded-2xl text-white shadow-lg">
            <ShieldCheck size={32} />
        </div>
        <div>
           <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Tombamento de Patrimônio</h2>
           <p className="text-sm font-bold text-green-700 uppercase tracking-widest">Módulo de Incorporação Ativa • Item 5.3</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl space-y-10">
        
        {/* BLOCO 1: IDENTIFICAÇÃO */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-green-700 font-black uppercase text-xs tracking-tighter">
            <Info size={16}/> 1. Identificação do Objeto
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1"><Hash size={10}/> Plaqueta (Tag)</label>
              <input className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mt-1 font-bold focus:border-green-600 outline-none transition-all" 
                placeholder="CMO-001" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} required />
            </div>
            <div className="md:col-span-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Descrição Detalhada do Bem</label>
              <input className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mt-1 font-bold focus:border-green-600 outline-none transition-all" 
                placeholder="Ex: Notebook Dell Vostro 3520 i7 16GB RAM 512GB SSD" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            </div>
          </div>
        </div>

        {/* BLOCO 2: FINANCEIRO E DEPRECIAÇÃO */}
        <div className="space-y-6 pt-6 border-t border-gray-50">
          <div className="flex items-center gap-2 text-green-700 font-black uppercase text-xs tracking-tighter">
            <DollarSign size={16}/> 2. Valorização e Vida Útil
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Valor de Aquisição (R$)</label>
              <input type="number" step="0.01" className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mt-1 font-black text-xl text-green-800 focus:border-green-600 outline-none" 
                placeholder="0,00" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} required />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1"><Calendar size={10}/> Depreciação (Vida Útil em Meses)</label>
              <input type="number" className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mt-1 font-bold focus:border-green-600 outline-none" 
                value={formData.usefulLife} onChange={e => setFormData({...formData, usefulLife: e.target.value})} required />
            </div>
          </div>
        </div>

        {/* BLOCO 3: LOCALIZAÇÃO */}
        <div className="space-y-6 pt-6 border-t border-gray-50">
          <div className="flex items-center gap-2 text-green-700 font-black uppercase text-xs tracking-tighter">
            <MapPin size={16}/> 3. Localização e Responsabilidade
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Setor / Departamento</label>
              <input className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mt-1 font-bold focus:border-green-600 outline-none" 
                placeholder="Ex: Secretaria de Administração" value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})} required />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1"><UserCheck size={10}/> Servidor Responsável (Cautela)</label>
              <input className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mt-1 font-bold focus:border-green-600 outline-none" 
                placeholder="Nome Completo" value={formData.resp} onChange={e => setFormData({...formData, resp: e.target.value})} required />
            </div>
          </div>
        </div>

        <button className="w-full bg-green-700 text-white p-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-green-800 transition-all shadow-xl shadow-green-900/20 flex items-center justify-center gap-4 active:scale-[0.98]">
          <Save size={24} /> Confirmar Registro de Patrimônio
        </button>
      </form>
    </div>
  );
}
