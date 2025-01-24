import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SocialLogin from "@/componentsOfWeb/SocialLogin";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const {loginUser} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) =>{
        console.log(data)

        loginUser(data.email, data.password)
        .then(res=>{
          navigate(location?.state ? location.state : "/");
          console.log(res.user);
          Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your are successfully logged in",
                  showConfirmButton: false,
                  timer: 1500
                });
          
        })
        

    }
         
    return (
     <div>
       <h1 className="text-3xl lg:text-4xl text-center text-[#25224B]  mt-8 font-bold">
      Sign in to <span className="text-[#F06728]">ParCella</span>
    </h1>
       <div className="flex flex-col lg:flex-row w-10/12 mx-auto p-6 lg:p-10 gap-8">
      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center items-center">
        <img
          className="max-w-full h-auto"
          src="https://i.ibb.co/Wy6hGm4/Login-amico.png"
          alt="Login Illustration"
        />
      </div>
    
      {/* Form Section */}
      <div className="lg:w-1/2 bg-white shadow-lg rounded-lg p-6 lg:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("email", { required: true })}
              placeholder="Enter your Email"
            />
            {errors.email && (
              <span className="text-sm text-red-500">Email is required</span>
            )}
          </div>
    
          {/* Password Input */}
          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("password", { required: true })}
              placeholder="Enter your Password"
            />
            {errors.password && (
              <span className="text-sm text-red-500">Password is required</span>
            )}
          </div>
    
          {/* Submit Button */}
          <Input
            className="w-full bg-[#F06728] text-white font-bold rounded-lg py-2 cursor-pointer hover:bg-[#25224B]"
            type="submit"
            value="Log In"
          />
        </form>
    
        <p className="mt-4 text-center text-gray-700">
          Don't have an Account?{" "}
          <Link to="/auth/register" className="text-blue-700 underline">
            Sign up
          </Link>
        </p>
        <Separator orientation="horizontal" className="my-10 bg-gray-400"></Separator>
        <SocialLogin></SocialLogin>
      </div>
    </div>
     </div>
    
    );
};

export default Login;