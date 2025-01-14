import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) =>{
        console.log(data)

    }
         
    return (
        <div className='flex w-10/12 mx-auto'>
            <div>
                <img src="https://i.ibb.co.com/Wy6hGm4/Login-amico.png" alt="" />
            </div>
            <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>
      <div className="mb-4">
                 <Label htmlFor="password">Password</Label>
                 <Input
                   id="password"
                   type="password"
                   {...register("password", { required: true })}
                   placeholder="Enter your Password"
                 />
                 {errors.password && (
                   <span className="text-red-500">Password is required</span>
                 )}
               </div>

      {errors.password && <span>This field is required</span>}

      <Input className="bg-blue-600 text-white" type="submit" />
    </form>
    <p>Doesn't have an Account? <Link to='/auth/register' className='text-blue-700 underline'>Signup</Link></p>
            </div>
        </div>
    );
};

export default Login;