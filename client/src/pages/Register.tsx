import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {  Button, CircularProgress } from '@mui/material';
import { FiPackage } from 'react-icons/fi';
import { useAuth } from '../context/authContext-hook';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firmName, setFirmName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(email, password, firmName);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md border border-border">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FiPackage className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">WarehouseMS</h1>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-card-foreground">
          Create Account
        </h2>

       <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-foreground">Firm Name</label>
            <input
              type="text"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
            />
          </div>

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

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-foreground">Confirm Password</label>
            <input
              type="password"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
