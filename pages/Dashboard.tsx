import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ADMIN_EMAILS } from '../types';
import { 
  BarChart2, 
  History, 
  User, 
  CreditCard, 
  Settings, 
  AlertCircle 
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, checkAccess } = useAuth();
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);
  const hasAccess = checkAccess();

  // Calculate remaining time for trial
  const getTrialStatus = () => {
    if (!user) return null;
    if (user.plan === 'premium' || user.plan === 'monthly') return <span className="text-green-500 font-bold">ATIVO</span>;
    
    const now = Date.now();
    if (now > user.trialExpiresAt) {
      return <span className="text-red-500 font-bold">EXPIRADO</span>;
    }
    
    const diff = user.trialExpiresAt - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return <span className="text-sky-500 font-bold">{hours}h {minutes}m restantes</span>;
  };

  return (
    <Layout title="Dashboard" showBack={false}>
      <div className="space-y-6">
        
        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-sky-500">
          <h2 className="text-xl font-bold text-slate-800">Olá, {user?.name.split(' ')[0]}</h2>
          <div className="mt-2 text-sm text-slate-600 flex flex-col sm:flex-row sm:items-center gap-2">
            <span>Plano Atual: <strong className="uppercase">{user?.plan}</strong></span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>Status: {getTrialStatus()}</span>
          </div>
          {!hasAccess && (
            <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertCircle size={18} />
              <span>Seu acesso aos sinais expirou. Renove seu plano.</span>
            </div>
          )}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <button 
            onClick={() => navigate('/signals')}
            className={`p-6 rounded-xl shadow-md border flex flex-col items-center justify-center gap-3 transition-all ${
              hasAccess 
              ? 'bg-sky-500 border-sky-500 text-white hover:bg-sky-600 hover:shadow-lg hover:-translate-y-1' 
              : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!hasAccess}
          >
            <BarChart2 size={40} />
            <span className="font-bold text-lg">Gerar Sinais Double</span>
            {!hasAccess && <span className="text-xs uppercase font-bold text-red-400">Bloqueado</span>}
          </button>

          <button 
            onClick={() => navigate('/history')}
            className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center gap-3 text-slate-700 hover:text-sky-600 hover:border-sky-200 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <History size={40} />
            <span className="font-bold text-lg">Histórico (15 Rodadas)</span>
          </button>

          <button 
            onClick={() => navigate('/profile')}
            className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center gap-3 text-slate-700 hover:text-sky-600 hover:border-sky-200 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <User size={40} />
            <span className="font-bold text-lg">Meu Perfil</span>
          </button>

          <button 
            onClick={() => navigate('/subscription')}
            className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center gap-3 text-slate-700 hover:text-sky-600 hover:border-sky-200 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <CreditCard size={40} />
            <span className="font-bold text-lg">Planos e Assinaturas</span>
          </button>

          {isAdmin && (
            <button 
              onClick={() => navigate('/admin')}
              className="col-span-1 sm:col-span-2 bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700 flex flex-col items-center justify-center gap-3 text-sky-400 hover:bg-slate-700 hover:text-sky-300 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <Settings size={40} />
              <span className="font-bold text-lg">Painel Admin</span>
            </button>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
