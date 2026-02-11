import React, { useEffect, useState } from 'react';
import { getDashboardMetrics } from '../api'; // Caminho relativo correto
import { Package, AlertTriangle, Activity } from 'lucide-react';

export default function DashboardScreen() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    getDashboardMetrics().then(res => setMetrics(res.data)).catch(console.error);
  }, []);

  if (!metrics) return <div className="p-8 text-white">Carregando Dashboard...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Activity className="text-orange-500" /> Visão Geral
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex justify-between mb-4"><Package className="text-blue-400" /><span className="text-xs text-gray-500">TOTAL</span></div>
          <h2 className="text-5xl font-bold">{metrics.totalProducts}</h2>
          <p className="text-gray-400">Produtos</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex justify-between mb-4"><AlertTriangle className="text-orange-500" /><span className="text-xs text-gray-500">CRÍTICO</span></div>
          <h2 className="text-5xl font-bold text-orange-500">{metrics.criticalItemsCount}</h2>
          <p className="text-gray-400">Estoque Baixo</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
           <div className="flex justify-between mb-4"><Activity className="text-green-400" /><span className="text-xs text-gray-500">STATUS</span></div>
           <h2 className="text-2xl font-mono text-green-400">Online</h2>
           <p className="text-xs text-gray-500 mt-2">Update: {metrics.lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}
