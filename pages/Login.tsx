import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && phone && birthDate) {
      login(email, name, phone, birthDate);
      navigate('/dashboard');
    }
  };

  return (
    <Layout title="Entrar no Blaze Bot 2.0" showBack={true}>
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
          Identifique-se
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
              placeholder="Seu Nome"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Data de Nascimento</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 mt-4"
          >
            Acessar Plataforma
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;