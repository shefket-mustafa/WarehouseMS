import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';
import { FiPackage } from 'react-icons/fi';
import { useAuth } from '../context/authContext-hook';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(email, password, companyName);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 bg-linear-to-br from-[#0a0f1f] via-[#05070d] to-black
relative">

  <div className="absolute inset-0 overflow-hidden">
  <div className="absolute top-[-150px] left-[-150px] h-[300px] w-[300px] rounded-full 
  bg-emerald-500/20 blur-[120px]" />

  <div className="absolute bottom-[-150px] right-[-150px] h-[300px] w-[300px] rounded-full 
  bg-cyan-500/20 blur-[120px]" />
</div>
      <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md border-white border">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FiPackage className="w-10 h-10 text-white text-primary" />
          <h1 className="text-3xl text-white font-bold text-foreground">WarehouseMS</h1>
        </div>

        <h2 className="text-2xl text-white font-semibold text-center mb-6 text-card-foreground">
          Sign In
        </h2>

       <form onSubmit={handleSubmit} className="space-y-5 text-white relative z-10">
         {/* Company Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-start mb-1 text-foreground">Company Name</label>
            <input
              type="text"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-borde bg-white  text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-start mb-1 text-foreground">Email</label>
            <input
              type="email"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col">
            <label className="text-sm text-start font-medium mb-1 text-foreground">Password</label>
            <input
              type="password"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-300 hover:bg-amber-400 px-10 rounded-lg text-black font-bold py-2 cursor-pointer"
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-white mt-6 text-sm text-muted-foreground relative z-10">
          Already have an account?{' '}
          <Link to="/login" className="text-primary text-amber-300 hover:underline font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
