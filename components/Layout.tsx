import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, ArrowLeft, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, showBack = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {showBack && location.pathname !== '/dashboard' && location.pathname !== '/' && (
              <button 
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-white/20 rounded-full transition"
                aria-label="Voltar"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            <h1 className="text-xl font-bold tracking-tight">
              {title || "Blaze Bot 2.0"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             {user ? (
               <div className="flex items-center gap-3">
                  <span className="hidden md:inline text-sm font-medium opacity-90">
                    {user.name.split(' ')[0]}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition"
                  >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Sair</span>
                  </button>
               </div>
             ) : (
                location.pathname !== '/login' && (
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-sm font-bold bg-white text-sky-600 px-4 py-1.5 rounded-full hover:shadow-md transition"
                  >
                    Entrar
                  </button>
                )
             )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
        {children}
      </main>

      {/* Disclaimer Footer - Sticky Bottom of content or viewport */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800 mt-auto">
        <div className="container mx-auto px-4">
          <p className="max-w-2xl mx-auto leading-relaxed">
            🚨 Este site envia sinais baseados em análise estatística e padrões históricos. 
            Não garantimos lucro. Jogos de azar envolvem risco financeiro. 
            Use com responsabilidade e jogue apenas o que pode perder.
          </p>
          <p className="mt-2 text-slate-500">
            &copy; {new Date().getFullYear()} Blaze Bot 2.0. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;