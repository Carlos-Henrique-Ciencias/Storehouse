import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Settings, ArrowLeft, TrendingUp, Save } from 'lucide-react';

export default function GestaoAtivo() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [valForm, setValForm] = useState({ newValue: '', just: '' });

  const handleReevaluate = async (e) => {
    e.preventDefault();
    try {
      // O PONTO CHAVE: Incluir o 'user' para a auditoria
      const payload = {
        tagNumber: tag,
        newValue: parseFloat(valForm.newValue),
        justification: valForm.just,
        user: localStorage.getItem('userName') || 'admin'
      };

      await api.post('/Asset/reavaliar', payload);
      alert("Valor reavaliado com sucesso!");
      setValForm({ newValue: '', just: '' });
      navigate('/inventario');
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar valor. Verifique os dados.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-800 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </button>
        <div className="bg-yellow-500 p-3 rounded-2xl text-white shadow-lg shadow-yellow-900/20">
            <Settings size={28} />
        </div>
        <div>
           <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Gestão de Ativo</h2>
           <p className="text-sm font-bold text-yellow-600 uppercase tracking-wider">{tag}</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl">
        <form onSubmit={handleReevaluate} className="space-y-8">
          <div className="flex items-center gap-2 text-yellow-700 font-black uppercase text-xs tracking-widest">
            <TrendingUp size={18}/> Reavaliação Contábil / Depreciação
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Novo Valor Contábil (R$)</label>
            <input 
              type="number" step="0.01" 
              className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl font-black text-2xl text-gray-800 focus:border-yellow-500 outline-none transition-all" 
              value={valForm.newValue} 
              onChange={e => setValForm({...valForm, newValue: e.target.value})} 
              placeholder="0.00"
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Justificativa Técnica (Obrigatória)</label>
            <textarea 
              className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl font-bold text-gray-700 focus:border-yellow-500 outline-none transition-all h-32" 
              value={valForm.just} 
              onChange={e => setValForm({...valForm, just: e.target.value})} 
              placeholder="Descreva o motivo da alteração de valor..."
              required 
            />
          </div>

          <button className="w-full bg-yellow-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-700 transition-all shadow-xl shadow-yellow-900/20 flex items-center justify-center gap-3 active:scale-[0.98]">
            <Save size={22} /> Confirmar Reavaliação
          </button>
        </form>
      </div>
    </div>
  );
}
