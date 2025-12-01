import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Check, Star, Clock } from 'lucide-react';
import { WHATSAPP_LINK } from '../types';

const Subscription: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const PlanCard = ({ 
    title, 
    price, 
    features, 
    active, 
    onBuy, 
    highlight = false 
  }: { 
    title: string, 
    price: string, 
    features: string[], 
    active: boolean, 
    onBuy?: () => void,
    highlight?: boolean
  }) => (
    <div className={`relative rounded-2xl p-6 border-2 flex flex-col h-full ${
      active ? 'border-green-500 bg-green-50/50' : 
      highlight ? 'border-sky-500 bg-white shadow-xl scale-105 z-10' : 'border-slate-100 bg-white shadow-sm'
    }`}>
      {active && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
          ATIVO
        </div>
      )}
      
      <h3 className={`text-xl font-bold mb-2 ${highlight ? 'text-sky-600' : 'text-slate-800'}`}>
        {title}
      </h3>
      
      <div className="mb-6">
        <span className="text-3xl font-black text-slate-800">{price}</span>
        {price !== 'Grátis' && <span className="text-slate-400 text-sm font-medium">/total</span>}
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
            <Check size={16} className="text-sky-500 mt-0.5 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      
      {active ? (
        <button disabled className="w-full py-3 rounded-xl font-bold bg-green-500 text-white cursor-default">
          Plano Atual
        </button>
      ) : (
         price === 'Grátis' ? (
            <button disabled className="w-full py-3 rounded-xl font-bold bg-slate-200 text-slate-400 cursor-not-allowed">
              Já utilizado
            </button>
         ) : (
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-3 rounded-xl font-bold text-center transition ${
              highlight 
                ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-lg' 
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            COMPRAR AGORA
          </a>
         )
      )}
    </div>
  );

  return (
    <Layout title="Planos" showBack={true}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Escolha o seu nível</h2>
        <p className="text-slate-500">Desbloqueie todo o potencial da IA Blaze Bot 2.0</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Trial */}
        <PlanCard 
          title="Teste Grátis"
          price="Grátis"
          features={[
            "Acesso por 25 horas",
            "Sinais Double",
            "Histórico 15 Rodadas",
            "Suporte Básico"
          ]}
          active={user.plan === 'trial'}
        />

        {/* Monthly */}
        <PlanCard 
          title="Mensal"
          price="R$ 20,00"
          features={[
            "Acesso por 30 dias",
            "Sinais Ilimitados",
            "Alta Prioridade",
            "Histórico em Tempo Real",
            "Suporte VIP"
          ]}
          active={user.plan === 'monthly'}
          highlight={true}
        />

        {/* Premium */}
        <PlanCard 
          title="Premium Vitalício"
          price="R$ 100,00"
          features={[
            "Pagamento Único",
            "Acesso Vitalício",
            "Todas as funções liberadas",
            "Prioridade Máxima",
            "Grupo Exclusivo"
          ]}
          active={user.plan === 'premium'}
        />

      </div>

      <div className="mt-8 bg-sky-50 p-4 rounded-xl flex items-start gap-3 border border-sky-100">
        <Clock className="text-sky-500 mt-1 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-sky-800 text-sm">Ativação Imediata</h4>
          <p className="text-xs text-sky-600 mt-1">
            Após o pagamento via WhatsApp, envie o comprovante e seu e-mail de cadastro para liberação imediata no painel.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;