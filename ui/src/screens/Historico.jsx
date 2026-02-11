import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import { ArrowLeft, Clock, History as HistoryIcon } from 'lucide-react';

export default function Historico() {
  const { tag } = useParams();
  const [logs, setLogs] = useState([]);
  const decodedTag = decodeURIComponent(tag);

  useEffect(() => {
    api.get(`/Asset/historico/${encodeURIComponent(tag)}`).then(res => setLogs(res.data)).catch(console.error);
  }, [tag]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
        <Link to="/inventario" className="p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-blue-600 hover:text-white transition-all"><ArrowLeft size={24} /></Link>
        <div className="bg-blue-700 p-3 rounded-2xl text-white shadow-lg shadow-blue-900/20"><HistoryIcon size={28} /></div>
        <div>
           <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Histórico do Bem</h2>
           <p className="text-xl font-mono font-bold text-blue-700">{decodedTag}</p>
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
        {logs.length === 0 ? (
          <div className="p-12 text-center text-gray-400 border-2 border-gray-200 rounded-[2rem] border-dashed font-bold uppercase tracking-widest bg-white">
            Nenhum registro de auditoria encontrado.
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-blue-100 text-blue-600 group-[.is-active]:bg-blue-600 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <Clock size={18} />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-gray-200 shadow-md shadow-gray-200/50 flex flex-col gap-2 transition-all hover:border-blue-300">
                    <div className="flex justify-between items-center mb-1">
                        <h4 className="text-lg font-black text-gray-800 uppercase">{log.type}</h4>
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">{new Date(log.occurredAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed border-l-4 border-blue-100 pl-4">
                      {log.description}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 text-right uppercase tracking-wider mt-2">
                      Horário: {new Date(log.occurredAt).toLocaleTimeString('pt-BR')}
                    </p>
                </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
