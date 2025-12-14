import {  Link } from "react-router";
import {
  registerSchema,
  type RegisterSchemaType,
} from "../zod-validator/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { FiPackage } from "react-icons/fi";
import { useAuth } from "../context/authContext-hook";

const Register = () => {

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });
  const {registerUser} = useAuth();

  const handleRegister = async (data: RegisterSchemaType) => {
    const { companyName, email, password } = data;

    try {
      const res = await registerUser(email, password, companyName)

console.log(res);
      

    } catch (error) {
      if(error instanceof Error){
        setError("root", {message: error.message})
      }else{
        setError("root", {message: "Failed to register!"})
      }
    } 
    }
  

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-4 bg-linear-to-br from-[#0a0f1f] via-[#05070d] to-black
relative"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-150px] left-[-150px] h-[300px] w-[300px] rounded-full 
  bg-emerald-500/20 blur-[120px]"
        />

        <div
          className="absolute bottom-[-150px] right-[-150px] h-[300px] w-[300px] rounded-full 
  bg-cyan-500/20 blur-[120px]"
        />
      </div>
      <div className="bg-card rounded-lg shadow-lg p-8 w-full max-w-md border-white border">
        <div className="flex items-center justify-center gap-2 mb-8">
          <FiPackage className="w-10 h-10 text-white text-primary" />
          <h1 className="text-3xl text-white font-bold text-foreground">
            WarehouseMS
          </h1>
        </div>

        <h2 className="text-2xl text-white font-semibold text-center mb-6 text-card-foreground">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-5 text-white relative z-10"
        >

          {errors.root && (
            <p className="text-sm text-red-500 mb-3 p-1 rounded-lg text-center">{errors.root.message}</p>
          )}
          {/* Company Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium  text-start mb-1 text-foreground">
              Company Name
            </label>
            <input
            {...register("companyName")}
              placeholder="Google"
              type="text"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-foreground text-black bg-white
                focus:outline-none focus:ring-2 focus:ring-primary
              "
            />
              {errors.companyName && (
            <p className="text-sm text-red-500 mb-3 p-1 rounded-lg text-center">{errors.companyName.message}</p>
          )}
          </div>
          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-start mb-1 text-foreground">
              Email
            </label>
            <input
            {...register("email")}
              type="email"
              placeholder="admin@abv.bg"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-black bg-white text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
            />
              {errors.email && (
            <p className="text-sm text-red-500 mb-3 p-1 rounded-lg text-center">{errors.email.message}</p>
          )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col">
            <label className="text-sm text-start  font-medium mb-1 text-foreground">
              Password
            </label>
            <input
            {...register("password")}
              type="password"
              placeholder="******"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-black bg-white text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
            />
              {errors.password && (
            <p className="text-sm text-red-500 mb-3 p-1 rounded-lg text-center">{errors.password.message}</p>
          )}
          </div>

          {/* Confirm PASSWORD */}
          <div className="flex flex-col">
            <label className="text-sm text-start  font-medium mb-1 text-foreground">
              Confirm Password
            </label>
            <input
            {...register("confirmPassword")}
              type="password"
              placeholder="******"
              className="
                w-full px-3 py-2 rounded-md
                bg-card border border-border text-black bg-white text-foreground
                focus:outline-none focus:ring-2 focus:ring-primary
              "
            />
              {errors.confirmPassword && (
            <p className="text-sm text-red-500 mb-3 p-1 rounded-lg text-center">{errors.confirmPassword.message}</p>
          )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-300 hover:bg-amber-400 px-10 rounded-lg text-black font-bold py-2 cursor-pointer"
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Sign up"}
          </button>
        </form>
        <div className="flex gap-1 justify-center items-center">
          <p className="text-center text-white py-3 text-sm text-muted-foreground">
            Already signed?{" "}
          </p>
          <Link
            to="/login"
            className="text-primary text-amber-300 hover:underline cursor-pointer font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
