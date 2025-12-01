import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { BlazeHistoryItem } from '../types';

const History: React.FC = () => {
  const [history, setHistory] = useState<BlazeHistoryItem[]>([]);

  // Function to generate a random history item
  const generateItem = (): BlazeHistoryItem => {
    const rand = Math.random();
    let color: 'white' | 'red' | 'black';
    let value: number;

    if (rand < 0.07) { // ~7% chance for white (14x)
      color = 'white';
      value = 0;
    } else if (rand < 0.535) {
      color = 'red';
      value = Math.floor(Math.random() * 7) + 1;
    } else {
      color = 'black';
      value = Math.floor(Math.random() * 7) + 8;
    }

    return {
      color,
      value,
      id: Math.random().toString(36).substr(2, 9)
    };
  };

  // Initial Load
  useEffect(() => {
    const initial: BlazeHistoryItem[] = [];
    for (let i = 0; i < 15; i++) {
      initial.push(generateItem());
    }
    setHistory(initial);

    // Simulate real-time updates every 15-30 seconds
    const interval = setInterval(() => {
      setHistory(prev => {
        const newItem = generateItem();
        return [newItem, ...prev.slice(0, 14)];
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title="Histórico Blaze" showBack={true}>
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-bold text-slate-700">Últimas 15 Rodadas</h2>
          <span className="text-xs text-green-600 font-semibold animate-pulse flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            AO VIVO
          </span>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {history.map((item, index) => (
              <div 
                key={item.id}
                className={`
                  w-14 h-14 rounded-lg flex items-center justify-center shadow-md border-2 
                  transform transition-all duration-500
                  ${index === 0 ? 'scale-110 ring-2 ring-sky-400 z-10' : 'opacity-80 scale-95'}
                  ${item.color === 'white' ? 'bg-white border-slate-300 text-slate-800' : ''}
                  ${item.color === 'red' ? 'bg-red-600 border-red-700 text-white' : ''}
                  ${item.color === 'black' ? 'bg-slate-900 border-black text-white' : ''}
                `}
              >
                {item.color === 'white' ? (
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="font-bold text-xs">14x</span>
                  </div>
                ) : (
                  <span className="font-bold text-lg">{item.value}</span>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center text-xs text-slate-400">
            Dados sincronizados com servidor Double
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
