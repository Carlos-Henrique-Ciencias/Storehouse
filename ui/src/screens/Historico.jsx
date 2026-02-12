import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { History, ArrowLeft, UserCheck, Calendar } from 'lucide-react';

export default function Historico() {
  const { tag } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get(`/Asset/historico/${tag}`).then(res => setLogs(res.data)).catch(console.error);
  }, [tag]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <Link to="/inventario" className="p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-800 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
        <div>
           <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Trilha de Auditoria</h2>
           <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">Patrimônio: {decodeURIComponent(tag)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {logs.map((log, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border-l-8 border-l-blue-600 shadow-md flex justify-between items-center group hover:scale-[1.01] transition-all">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Calendar size={12} /> {new Date(log.date).toLocaleString('pt-BR')}
                </div>
                <h4 className="text-lg font-black text-gray-800 uppercase">{log.action}</h4>
                <p className="text-gray-600 font-medium">{log.description}</p>
            </div>
            <div className="text-right border-l border-gray-100 pl-6">
                <div className="flex items-center justify-end gap-2 text-blue-700 font-bold text-xs uppercase">
                    <UserCheck size={14} /> Operador
                </div>
                <p className="text-sm font-black text-gray-800 uppercase">{log.user || 'Admin Master'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
