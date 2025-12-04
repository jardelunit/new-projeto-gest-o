import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, AlertCircle } from 'lucide-react';
import { Button, Input, Card } from '../../components/ui/Common';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock Auth Logic
    setTimeout(() => {
      setLoading(false);
      if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      if (email === 'admin@logi.com') {
        // Admin Login
        localStorage.setItem('userRole', 'ADMIN');
        navigate('/admin');
      } else {
        // Client Login (any other email)
        localStorage.setItem('userRole', 'CLIENT');
        navigate('/client');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-blue-600/20 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-blue-500" />
            </div>
        </div>
        <h1 className="text-3xl font-bold text-white">Bem-vindo de volta</h1>
        <p className="text-slate-400 mt-2">Faça login para acessar seu painel</p>
      </div>

      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="Endereço de Email" 
            type="email" 
            placeholder="nome@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Senha" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={loading}>
            Entrar
          </Button>

          <div className="text-center">
             <p className="text-xs text-slate-500">
                Dica: Use <strong>admin@logi.com</strong> para Visão Admin, qualquer outro para Visão Cliente.
             </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;