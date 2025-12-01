import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Signal } from '../types';

const Signals: React.FC = () => {
  const { checkAccess } = useAuth();
  const navigate = useNavigate();
  const hasAccess = checkAccess();
  
  const [loading, setLoading] = useState(false);
  const [currentSignal, setCurrentSignal] = useState<Signal | null>(null);

  // Redirect if no access
  React.useEffect(() => {
    if (!hasAccess) {
      navigate('/subscription');
    }
  }, [hasAccess, navigate]);

  const generateSignal = () => {
    setLoading(true);
    setCurrentSignal(null);

    // Simulate analysis delay
    setTimeout(() => {
      const isRed = Math.random() > 0.5; // Random Red or Black
      
      // Rigged probability: Always <= 39%
      // Random between 20% and 39%
      const riggedProbability = Math.floor(Math.random() * (39 - 20 + 1) + 20);

      const now = new Date();
      // Add 1-2 minutes for the "valid until" time
      now.setMinutes(now.getMinutes() + 2);
      const timeString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      setCurrentSignal({
        id: Date.now().toString(),
        color: isRed ? 'vermelho' : 'preto',
        probability: riggedProbability,
        time: timeString
      });

      setLoading(false);
    }, 2000);
  };

  if (!hasAccess) return null;

  return (
    <Layout title="Sinais Double" showBack={true}>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header Visual */}
        <div className="bg-slate-900 p-6 text-center">
          <h2 className="text-sky-400 font-bold text-xl uppercase tracking-wider">
            Inteligência Artificial
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Analisando padrões em tempo real...
          </p>
        </div>

        <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          
          {loading ? (
            <div className="flex flex-col items-center animate-pulse">
              <Loader2 size={64} className="text-sky-500 animate-spin mb-4" />
              <span className="text-slate-500 font-medium">Lendo histórico...</span>
              <span className="text-slate-400 text-sm mt-2">Identificando tendências...</span>
            </div>
          ) : currentSignal ? (
            <div className="w-full animate-in fade-in zoom-in duration-300">
              
              <div className="flex flex-col items-center gap-6">
                
                {/* Result Box */}
                <div className={`
                  w-48 h-48 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-offset-4
                  ${currentSignal.color === 'vermelho' ? 'bg-red-600 ring-red-200' : 'bg-slate-800 ring-slate-200'}
                `}>
                  <span className="text-white font-extrabold text-3xl uppercase tracking-widest shadow-black drop-shadow-md">
                    {currentSignal.color}
                  </span>
                </div>

                <div className="text-center space-y-2 mt-4">
                  <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">
                    Entrar até
                  </p>
                  <p className="text-5xl font-black text-slate-800 tracking-tighter">
                    {currentSignal.time}
                  </p>
                </div>

                {/* Low Probability Indicator (Persuasion/Reverse Psychology) */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 w-full max-w-xs mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-orange-800 text-xs font-bold uppercase">Probabilidade Calculada</span>
                    <span className="text-orange-600 font-bold">{currentSignal.probability}%</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${currentSignal.probability}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-orange-700 mt-2 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Sinal de risco elevado detectado.
                  </p>
                </div>

                <button 
                  onClick={generateSignal}
                  className="mt-6 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 px-8 rounded-xl transition"
                >
                  Gerar Novo Sinal
                </button>

              </div>

            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-sky-50 p-6 rounded-full inline-block mb-4">
                 <BarChart2 size={48} className="text-sky-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Aguardando solicitação
              </h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-8">
                Nosso sistema está conectado e pronto para analisar as últimas rodadas.
              </p>
              
              <button
                onClick={generateSignal}
                className="bg-sky-500 hover:bg-sky-600 text-white text-xl font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-sky-200 hover:-translate-y-1 transition-all w-full sm:w-auto"
              >
                GERAR SINAL
              </button>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

// Simple icon component for this file
const BarChart2 = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

export default Signals;
