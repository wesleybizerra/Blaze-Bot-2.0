import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { ADMIN_EMAILS, User, PlanType } from '../types';
import { Search, Edit, Clock, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const { user, getAllUsers, updateUserPlan, addTime } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(0); // Trigger re-render

  // Security Check
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return (
      <Layout title="Acesso Negado">
        <div className="text-center py-20">
          <h2 className="text-red-500 font-bold text-2xl">Acesso Restrito</h2>
          <p className="text-slate-500 mt-2">Você não tem permissão para ver esta página.</p>
          <button onClick={() => navigate('/dashboard')} className="mt-4 text-sky-500 underline">Voltar</button>
        </div>
      </Layout>
    );
  }

  const users = getAllUsers();
  
  const filteredUsers = users.filter((u: User) => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlanChange = (email: string, plan: PlanType) => {
    if(window.confirm(`Tem certeza que deseja mudar o plano de ${email} para ${plan}?`)) {
      updateUserPlan(email, plan);
      setRefresh(p => p + 1);
    }
  };

  const handleAddTime = (email: string) => {
    const daysStr = prompt("Quantos DIAS deseja adicionar?", "0");
    const hoursStr = prompt("Quantas HORAS deseja adicionar?", "0");
    const minutesStr = prompt("Quantos MINUTOS deseja adicionar?", "0");
    
    const days = parseInt(daysStr || "0");
    const hours = parseInt(hoursStr || "0");
    const minutes = parseInt(minutesStr || "0");

    if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes)) {
        addTime(email, hours, minutes, days);
        setRefresh(p => p + 1);
        alert(`Tempo adicionado com sucesso para ${email}`);
    } else {
        alert("Valores inválidos.");
    }
  };

  return (
    <Layout title="Painel Administrativo" showBack={true}>
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar usuário por nome ou email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-200 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-xs">
              <tr>
                <th className="p-4">Usuário</th>
                <th className="p-4">Plano</th>
                <th className="p-4">Expira em</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u: User) => (
                <tr key={u.email} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{u.name}</div>
                    <div className="text-slate-500 text-xs">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      u.plan === 'premium' ? 'bg-purple-100 text-purple-600' :
                      u.plan === 'monthly' ? 'bg-green-100 text-green-600' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {u.plan}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 text-xs">
                    {u.plan === 'trial' ? new Date(u.trialExpiresAt).toLocaleString() : '---'}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                        
                        {/* Toggle Plans */}
                        {u.plan !== 'monthly' && (
                            <button 
                                onClick={() => handlePlanChange(u.email, 'monthly')}
                                title="Ativar Mensal"
                                className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100"
                            >
                                <CheckCircle size={16} />
                            </button>
                        )}
                        
                        {u.plan !== 'premium' && (
                            <button 
                                onClick={() => handlePlanChange(u.email, 'premium')}
                                title="Ativar Premium"
                                className="p-2 bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
                            >
                                <Shield size={16} />
                            </button>
                        )}
                        
                        {u.plan !== 'trial' && (
                             <button 
                                onClick={() => handlePlanChange(u.email, 'trial')}
                                title="Desativar (Voltar para Trial)"
                                className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                             >
                                <XCircle size={16} />
                             </button>
                        )}

                        {/* Add Time Button */}
                        <button 
                            onClick={() => handleAddTime(u.email)}
                            title="Adicionar Tempo"
                            className="p-2 bg-sky-50 text-sky-600 rounded hover:bg-sky-100"
                        >
                            <Clock size={16} />
                        </button>
                        
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
