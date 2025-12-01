import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { User, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [birthDate, setBirthDate] = useState(user?.birthDate || '');
  const [success, setSuccess] = useState('');

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      ...user,
      name,
      phone,
      birthDate
    });
    setSuccess('Dados atualizados com sucesso!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <Layout title="Meu Perfil" showBack={true}>
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
            <User size={40} />
          </div>
        </div>

        {success && (
          <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-lg text-center text-sm font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">E-mail (Não editável)</label>
            <input 
              type="email" 
              value={user.email} 
              disabled 
              className="w-full px-4 py-2 rounded-lg bg-slate-100 text-slate-500 border border-transparent cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nome Completo</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Telefone</label>
            <input 
              type="tel" 
              value={phone} 
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Data de Nascimento</label>
            <input 
              type="date" 
              value={birthDate} 
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-200 outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-6 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <Save size={18} />
            Salvar Alterações
          </button>

        </form>
      </div>
    </Layout>
  );
};

export default Profile;
