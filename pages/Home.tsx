import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ShieldCheck, Zap, BarChart3, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <Layout title="Blaze Bot 2.0" showBack={false}>
      <div className="text-center py-10 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-sky-900 leading-tight">
            Domine o Double com a <br />
            <span className="text-sky-500">Inteligência Blaze Bot 2.0</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Análises avançadas, sinais em tempo real e histórico detalhado para você tomar as melhores decisões.
          </p>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleStart}
            className="bg-sky-500 hover:bg-sky-600 text-white text-xl font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform"
          >
            {user ? 'ACESSAR DASHBOARD' : 'COMEÇAR AGORA - GRÁTIS'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-sky-100 p-3 rounded-lg text-sky-600">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Sinais Rápidos</h3>
              <p className="text-slate-500 text-sm">Gere sinais instantâneos baseados em padrões de cores.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-sky-100 p-3 rounded-lg text-sky-600">
              <BarChart3 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Histórico Completo</h3>
              <p className="text-slate-500 text-sm">Acompanhe as últimas 15 rodadas em tempo real.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-sky-100 p-3 rounded-lg text-sky-600">
              <Lock size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Acesso Seguro</h3>
              <p className="text-slate-500 text-sm">Plataforma protegida e gerenciamento de conta simplificado.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
            <div className="bg-sky-100 p-3 rounded-lg text-sky-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Teste Grátis</h3>
              <p className="text-slate-500 text-sm">Comece com 25 horas gratuitas para testar nossa assertividade.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;