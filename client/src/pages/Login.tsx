import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {  Button, CircularProgress } from '@mui/material';
import { FiPackage } from 'react-icons/fi';
import { useAuth } from '../context/authContext-hook';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 bg-linear-to-br from-slate-200 via-slate-100 to-white">
      <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md border bg-linear-to-br from-slate-700">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FiPackage className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">WarehouseMS</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-card-foreground">
          Sign In
        </h2>

       <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-foreground">Email</label>
            <input
              type="email"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-foreground">Password</label>
            <input
              type="password"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            className="bg-primary hover:bg-primary-hover text-primary-foreground py-3"
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
