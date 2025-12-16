import { Link } from 'react-router';
import { CircularProgress } from '@mui/material';
import { FiPackage } from 'react-icons/fi';
import {useForm} from "react-hook-form"
import { loginSchema, type LoginSchemaType } from '../zod-validator/loginSchema';
import {zodResolver} from "@hookform/resolvers/zod"
import { useAuth } from '../context/auth/authContext-hook';

const Login = () => {
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    formState: {isSubmitting, errors},
    setError
    

  } = useForm<LoginSchemaType>({resolver: zodResolver(loginSchema)});

  const handleLogin = async (data: LoginSchemaType) => {
    try {
      const {email, password} = data;
      const res = await login(email, password);
      console.log(res);
      

      if(!res.ok){
        setError("root", {message: "Invalid credentials!"});
        return
      }
    } catch (error) {
      if(error instanceof Error){
        setError("root", {message: error.message})

      }else {
        setError("root", {message: "Failed to login!"})
      }
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

       <form onSubmit={handleSubmit(handleLogin)} className="space-y-5 flex flex-col text-white relative z-10">
          {/* EMAIL */}

          {errors.root && (
            <p className='text-sm text-red-500 mb-3 p-1 rounded-lg text-center'>{errors.root.message}</p>
          )}

            <label className="text-sm font-medium text-start mb-1 text-foreground">Email</label>
            <input
            {...register("email")}
              type="email"
              className="
                w-full px-3 py-2 rounded-md text-black bg-white
                bg-card border border-border text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
            />
            {errors.email && (
              <p className='text-sm text-red-500 mb-3 p-2 rounded-lg text-center'>{errors.email.message}</p>
            )}

          {/* PASSWORD */}
            <label className="text-sm text-start font-medium mb-1 text-foreground">Password</label>
            <input
            {...register("password")}
              type="password"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-black bg-white text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
            />
             {errors.password && (
              <p className='text-sm text-red-500 mb-3 p-2 rounded-lg text-center'>{errors.password.message}</p>
            )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-300 hover:bg-amber-400 px-10 rounded-lg text-black font-bold py-2 cursor-pointer"
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-white mt-6 text-sm text-muted-foreground relative z-10">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary text-amber-300 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
