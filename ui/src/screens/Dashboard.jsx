import React, { useEffect, useState } from 'react';
import api from '../api';
import { TrendingDown, Package, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ totalAssets: 0, totalValue: 0, currentValue: 0 });

  useEffect(() => {
    api.get('/Asset/relatorio').then(res => {
      const data = res.data || [];
      const total = data.reduce((acc, item) => acc + (item.originalValue || 0), 0);
      const current = data.reduce((acc, item) => acc + (item.currentValue || 0), 0);
      setMetrics({ totalAssets: data.length, totalValue: total, currentValue: current });
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Painel Geral</h2>
        <p className="text-green-700 font-bold text-sm uppercase tracking-widest">Visão Estratégica do Patrimônio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Verde - Ativos */}
        <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-lg shadow-green-900/5 flex items-center gap-6 group hover:border-green-300 transition-all">
          <div className="bg-green-100 p-4 rounded-xl text-green-700 group-hover:bg-green-600 group-hover:text-white transition-all">
             <Package size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ativos Tombados</p>
            <p className="text-4xl font-black text-green-800">{metrics.totalAssets}</p>
          </div>
        </div>

        {/* Card Azul - Investimento */}
        <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-lg shadow-blue-900/5 flex items-center gap-6 group hover:border-blue-300 transition-all">
           <div className="bg-blue-100 p-4 rounded-xl text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-all">
             <ShieldCheck size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Investimento Total</p>
            <p className="text-3xl font-black text-blue-800">R$ {metrics.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Card Amarelo/Dourado - Valor Atual */}
        <div className="bg-white p-8 rounded-2xl border border-yellow-100 shadow-lg shadow-yellow-900/5 flex items-center gap-6 group hover:border-yellow-300 transition-all">
           <div className="bg-yellow-100 p-4 rounded-xl text-yellow-700 group-hover:bg-yellow-500 group-hover:text-white transition-all">
             <TrendingDown size={32} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Valor Contábil Atual</p>
            <p className="text-3xl font-black text-yellow-600">R$ {metrics.currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
