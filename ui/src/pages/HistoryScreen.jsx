import React, { useEffect, useState } from 'react';
import api from '../api';
import { History, Search, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function HistoryScreen() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    api.get('/Inventory/history').then(res => setMovements(res.data));
  }, []);

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <History className="text-blue-500" /> Auditoria de Movimentações
          </h2>
          <p className="text-gray-500 mt-1">Rastreabilidade completa de entradas e saídas</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800/50 border-b border-gray-800">
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Data/Hora</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Produto (SKU)</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Operação</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Qtd</th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Lote Originário</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {movements.map((mov, idx) => (
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors group">
                <td className="p-6 text-sm text-gray-500 font-mono">{mov.date}</td>
                <td className="p-6 text-sm font-bold text-gray-200">{mov.sku}</td>
                <td className="p-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase ${
                    mov.type === 'ENTRADA' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {mov.type === 'ENTRADA' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                    {mov.type}
                  </div>
                </td>
                <td className="p-6 text-center font-black text-lg">{mov.quantity}</td>
                <td className="p-6 text-sm text-gray-500 italic">{mov.batchNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {movements.length === 0 && (
          <div className="p-20 text-center">
            <Search size={48} className="mx-auto text-gray-800 mb-4" />
            <p className="text-gray-600 font-bold uppercase tracking-widest">Nenhum rastro encontrado ainda</p>
          </div>
        )}
      </div>
    </div>
  );
}
