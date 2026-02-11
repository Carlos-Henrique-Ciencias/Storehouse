import React, { useState } from 'react';
import api from '../api';
import { Toaster, toast } from 'react-hot-toast';
import { ArrowDownCircle, ArrowUpCircle, Check, PackagePlus, Truck } from 'lucide-react';

export default function OperationScreen() {
  const [type, setType] = useState('entry');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // States da Entrada
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [expiry, setExpiry] = useState('');
  const [aisle, setAisle] = useState('');
  const [shelf, setShelf] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (type === 'entry') {
        await api.post('/Inventory/entry', {
          sku, name, quantity: parseInt(quantity),
          batchNumber: batch, expiryDate: new Date(expiry).toISOString(),
          aisle, shelf, minimumStock: 5
        });
        toast.success('Entrada processada com sucesso!');
      } else {
        await api.post('/Inventory/withdraw', { sku, quantity: parseInt(quantity) });
        toast.success('Saída realizada (Protocolo FEFO)!');
      }
      setQuantity(1);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erro na operação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' } }} />
      
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            {type === 'entry' ? <PackagePlus className="text-green-500" /> : <Truck className="text-red-500" />}
            Operação de Movimentação
          </h2>
          <p className="text-gray-500 mt-1">Registre entradas e saídas no Codebros Storehouse</p>
        </div>

        <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button onClick={() => setType('entry')} className={`px-8 py-2.5 rounded-lg text-sm font-black transition-all ${type === 'entry' ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'text-gray-500 hover:text-gray-300'}`}>ENTRADA</button>
          <button onClick={() => setType('withdraw')} className={`px-8 py-2.5 rounded-lg text-sm font-black transition-all ${type === 'withdraw' ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-gray-500 hover:text-gray-300'}`}>SAÍDA</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-3xl p-10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest border-b border-gray-800 pb-2">Informações Base</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Código SKU</label>
              <input value={sku} onChange={e => setSku(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl focus:ring-2 focus:ring-orange-500/50 outline-none transition-all placeholder:text-gray-700" placeholder="Ex: PROD-123" required />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Quantidade</label>
              <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl focus:ring-2 focus:ring-orange-500/50 outline-none transition-all font-bold" min="1" required />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest border-b border-gray-800 pb-2">Logística e Detalhes</h3>
            
            {type === 'entry' ? (
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Nome do Produto</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl focus:ring-2 focus:ring-orange-500/50 outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Lote</label>
                      <input value={batch} onChange={e => setBatch(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Validade</label>
                      <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl text-gray-300" required />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Corredor</label>
                      <input value={aisle} onChange={e => setAisle(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl" placeholder="A1" required />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Prateleira</label>
                      <input value={shelf} onChange={e => setShelf(e.target.value)} className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl" placeholder="05" required />
                   </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-950/50 border border-gray-800 border-dashed rounded-2xl p-8 h-full flex items-center justify-center text-center">
                <p className="text-gray-500 text-sm">A saída será processada automaticamente <br/> priorizando o lote com vencimento mais próximo <br/> <span className="text-orange-500/50 font-bold">(Protocolo FEFO)</span>.</p>
              </div>
            )}
          </div>
        </div>

        <button disabled={loading} className={`w-full mt-10 py-5 rounded-2xl font-black text-lg transition-all active:scale-[0.98] flex justify-center items-center gap-3 shadow-xl ${
          type === 'entry' 
          ? 'bg-green-600 hover:bg-green-500 shadow-green-900/20' 
          : 'bg-red-600 hover:bg-red-500 shadow-red-900/20'
        }`}>
          {loading ? 'PROCESSANDO...' : <><Check size={24} strokeWidth={3} /> CONFIRMAR {type === 'entry' ? 'ENTRADA DE MATERIAL' : 'SAÍDA DE MATERIAL'}</>}
        </button>
      </form>
    </div>
  );
}
