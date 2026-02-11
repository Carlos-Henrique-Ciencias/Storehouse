import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Settings, History, Trash2, ClipboardList, Search } from 'lucide-react';

export default function Inventario() {
  const [assets, setAssets] = useState([]);
  const load = () => api.get('/Asset/relatorio').then(res => setAssets(res.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleDelete = async (tag) => {
    if (window.confirm(`Deseja apagar ${tag}?`)) {
      try { await api.delete(`/Asset/${encodeURIComponent(tag)}`); load(); } catch (err) { alert("Erro ao excluir."); }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-3 rounded-2xl text-white shadow-lg shadow-blue-900/20"><ClipboardList size={28} /></div>
            <div>
                <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Inventário Contábil</h2>
                <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">Base de Dados Oficial</p>
            </div>
        </div>
        <div className="bg-white border-2 border-blue-100 text-blue-800 px-6 py-2 rounded-full font-black text-sm shadow-sm flex items-center gap-2">
            <span className="text-xl">{assets.length}</span> ITENS REGISTRADOS
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-xl">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2 text-gray-400">
            <Search size={18} /> <span className="text-sm font-bold tracking-widest uppercase">Filtro Rápido (Em breve)</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-black tracking-widest border-b border-gray-200">
            <tr>
              <th className="p-6">Etiqueta</th>
              <th className="p-6">Descrição</th>
              <th className="p-6">Setor Responsável</th>
              <th className="p-6 text-right">Valor Contábil</th>
              <th className="p-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {assets.map(asset => (
              <tr key={asset.tag} className="hover:bg-blue-50/50 transition-all font-medium text-gray-700">
                <td className="p-6 font-mono text-blue-700 font-bold text-base">{asset.tag}</td>
                <td className="p-6 text-sm">{asset.description}</td>
                <td className="p-6 text-xs font-bold uppercase tracking-wider text-gray-500">{asset.department}</td>
                <td className="p-6 text-right text-gray-800 font-black text-base">R$ {asset.currentValue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="p-6 flex gap-3 justify-center">
                  <Link title="Gestão" to={`/gestao/${encodeURIComponent(asset.tag)}`} className="bg-yellow-100 text-yellow-700 p-3 rounded-xl hover:bg-yellow-500 hover:text-white transition-all shadow-sm">
                    <Settings size={18}/>
                  </Link>
                  <Link title="Histórico" to={`/historico/${encodeURIComponent(asset.tag)}`} className="bg-blue-100 text-blue-700 p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <History size={18}/>
                  </Link>
                  <button title="Excluir" onClick={() => handleDelete(asset.tag)} className="bg-red-100 text-red-700 p-3 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                    <Trash2 size={18}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
