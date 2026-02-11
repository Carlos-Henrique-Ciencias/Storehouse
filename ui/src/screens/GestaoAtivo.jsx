import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { Settings, ArrowLeft } from 'lucide-react';

export default function GestaoAtivo() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [newValue, setNewValue] = useState('');
  const [justification, setJustification] = useState('');
  const decodedTag = decodeURIComponent(tag);

  const handleUpdate = async () => {
    if (!newValue || !justification) { alert("Preencha valor e justificativa."); return; }
    try {
        await api.post('/Asset/reavaliar', { tagNumber: decodedTag, newValue: parseFloat(newValue), justification });
        alert("Valor atualizado com sucesso!"); navigate('/inventario');
    } catch (error) { alert("Erro ao atualizar."); }
  };

  const inputClass = "w-full bg-white border-2 border-gray-200 p-4 rounded-xl mt-2 focus:border-yellow-500 outline-none text-gray-800 font-bold transition-all hover:border-gray-300";
  const labelClass = "text-xs font-black text-gray-500 uppercase tracking-widest";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <Link to="/inventario" className="p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-yellow-500 hover:text-white transition-all"><ArrowLeft size={24} /></Link>
        <div className="bg-yellow-500 p-3 rounded-2xl text-white shadow-lg shadow-yellow-900/20"><Settings size={28} /></div>
        <div>
           <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Gestão de Ativo</h2>
           <p className="text-xl font-mono font-bold text-yellow-600">{decodedTag}</p>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl space-y-8">
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
            <h3 className="text-lg font-black text-yellow-800 uppercase mb-4">Reavaliação Contábil / Depreciação</h3>
            
            <div className="space-y-6">
                <div>
                    <label className={labelClass}>Novo Valor Contábil (R$)</label>
                    <input type="number" step="0.01" className={`${inputClass} text-2xl text-yellow-700`} placeholder="0,00" value={newValue} onChange={e => setNewValue(e.target.value)} />
                </div>
                <div>
                    <label className={labelClass}>Justificativa Técnica (Obrigatória)</label>
                    <textarea rows="4" className={inputClass} placeholder="Descreva o motivo da alteração de valor..." value={justification} onChange={e => setJustification(e.target.value)} />
                </div>
            </div>
        </div>
        
        <button onClick={handleUpdate} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white p-5 rounded-xl font-black text-lg tracking-widest shadow-lg shadow-yellow-900/20 transition-all active:scale-[0.99] uppercase">
          Confirmar Reavaliação
        </button>
      </div>
    </div>
  );
}
