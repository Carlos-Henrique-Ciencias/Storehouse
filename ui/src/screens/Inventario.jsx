import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Settings, History, Trash2, ClipboardList, Download, Search } from 'lucide-react';

export default function Inventario() {
  const [assets, setAssets] = useState([]);
  const [term, setTerm] = useState('');

  const load = () => api.get('/Asset/relatorio').then(res => setAssets(res.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleDelete = async (tag) => {
    if (window.confirm(`Deseja realmente baixar/excluir o item ${tag}?`)) {
      try { await api.delete(`/Asset/${encodeURIComponent(tag)}`); load(); } catch (err) { alert("Erro ao excluir."); }
    }
  };

  // Lógica para exportar CSV (Cumpre RN02 - Portabilidade)
  const handleExport = () => {
    if (assets.length === 0) return alert("Nada para exportar.");
    
    // Cabeçalho do CSV
    let csv = "Etiqueta;Descricao;Setor;Responsavel;Valor_Aquisicao;Valor_Atual;Status;Vida_Util_Meses\n";
    
    // Linhas
    assets.forEach(a => {
        csv += `${a.tag};${a.description};${a.department};${a.responsible};${a.originalValue};${a.currentValue};${a.status};${a.usefulLife}\n`;
    });

    // Download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inventario_ourolandia_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  // Filtro de busca simples
  const filtered = assets.filter(a => 
    a.description.toLowerCase().includes(term.toLowerCase()) || 
    a.tag.toLowerCase().includes(term.toLowerCase()) ||
    a.department.toLowerCase().includes(term.toLowerCase())
  );

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
        <div className="flex gap-3">
             <button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md flex items-center gap-2 transition-all">
                <Download size={18} /> EXPORTAR DADOS (RN02)
            </button>
            <div className="bg-white border-2 border-blue-100 text-blue-800 px-6 py-2 rounded-xl font-black text-sm shadow-sm flex items-center gap-2">
                <span className="text-xl">{filtered.length}</span> ITENS
            </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-xl">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2 text-gray-500">
            <Search size={20} /> 
            <input 
                className="bg-transparent outline-none font-bold uppercase text-sm w-full placeholder-gray-400" 
                placeholder="FILTRAR POR NOME, PLAQUETA OU SETOR..." 
                value={term}
                onChange={e => setTerm(e.target.value)}
            />
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
            {filtered.map(asset => (
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
