import React, { useState } from 'react';
import api from '../api';
import { ShieldCheck } from 'lucide-react';

export default function Tombamento() {
  const [form, setForm] = useState({ description: '', tagNumber: '', value: '', months: 60, deptName: '', responsible: '', quantity: 1 });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Asset/tombamento', { 
        ...form, 
        value: parseFloat(form.value), 
        months: parseInt(form.months), 
        quantity: parseInt(form.quantity) 
      });
      alert(`SUCESSO! ${form.quantity} item(s) tombado(s).`);
      setForm({ description: '', tagNumber: '', value: '', months: 60, deptName: '', responsible: '', quantity: 1 });
    } catch (err) { 
      const msg = err.response?.data?.error || "Erro ao salvar.";
      alert("ATENÇÃO: " + msg); 
    }
  };

  const inputClass = "w-full bg-white border-2 border-gray-200 p-4 rounded-xl mt-2 focus:border-green-600 outline-none text-gray-800 font-bold transition-all hover:border-gray-300";
  const labelClass = "text-xs font-black text-gray-500 uppercase tracking-widest";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <div className="bg-green-600 p-3 rounded-2xl text-white shadow-lg shadow-green-900/20"><ShieldCheck size={28} /></div>
        <div>
           <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Novo Tombamento</h2>
           <p className="text-sm font-bold text-green-700 uppercase tracking-wider">Registro Oficial de Patrimônio</p>
        </div>
      </div>
      
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-10 rounded-3xl border border-gray-100 shadow-xl">
        
        <div className="md:col-span-8">
          <label className={labelClass}>Descrição Completa do Bem</label>
          <input className={inputClass} placeholder="Ex: Mesa de Reunião em MDF..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        </div>
        
        <div className="md:col-span-4">
          <label className={labelClass}>Nº Plaqueta (Base)</label>
          <input className={`${inputClass} text-blue-700 font-mono text-lg`} placeholder="CM-2026-001" value={form.tagNumber} onChange={e => setForm({...form, tagNumber: e.target.value})} required />
        </div>

        <div className="md:col-span-3">
          <label className={labelClass}>Quantidade</label>
          <input type="number" className={inputClass} value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} min="1" required />
        </div>

        <div className="md:col-span-3">
           <label className={labelClass}>Valor Unit. (R$)</label>
           <input type="number" step="0.01" className={`${inputClass} text-green-700`} value={form.value} onChange={e => setForm({...form, value: e.target.value})} required />
        </div>

        <div className="md:col-span-6">
          <label className={labelClass}>Setor de Destino</label>
          <input className={inputClass} placeholder="Ex: Presidência" value={form.deptName} onChange={e => setForm({...form, deptName: e.target.value})} required />
        </div>

        <div className="md:col-span-12 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex gap-6">
            <div className="flex-1">
                <label className={labelClass}>Responsável Pelo Bem</label>
                <input className="w-full bg-transparent border-b-2 border-gray-300 p-2 mt-1 focus:border-green-600 outline-none text-gray-800 font-bold" placeholder="Nome do Servidor" value={form.responsible} onChange={e => setForm({...form, responsible: e.target.value})} required />
            </div>
            <div className="w-1/4">
                <label className={labelClass}>Vida Útil (Meses)</label>
                <input type="number" className="w-full bg-transparent border-b-2 border-gray-300 p-2 mt-1 text-center font-bold text-gray-800 focus:border-green-600 outline-none" value={form.months} onChange={e => setForm({...form, months: e.target.value})} required />
            </div>
        </div>

        <button type="submit" className="md:col-span-12 bg-green-700 hover:bg-green-800 text-white p-5 rounded-xl font-black text-lg tracking-widest shadow-lg shadow-green-900/20 transition-all active:scale-[0.99] uppercase">
          Concluir Registro
        </button>
      </form>
    </div>
  );
}
