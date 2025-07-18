import { useForm } from "react-hook-form";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import carImage from "../../assets/loginimg/car-img.png";

type SignupData = {
  username: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const { register, handleSubmit } = useForm<SignupData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignupData) => {
    console.log("Signup Data:", data);
  };

  const text = "Car Service";

  return (
    <>
      {/* Animations */}
      <style>
        {`
          @keyframes slideLeftToRightOnce {
            0% { transform: translateX(0); }
            50% { transform: translateX(100px); }
          }
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .letter {
            display: inline-block;
            opacity: 0;
            animation-name: fadeInUp;
            animation-fill-mode: forwards;
            animation-duration: 0.5s;
            animation-timing-function: ease-out;
          }
        `}
      </style>

      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Animated Text */}
        <div className="hidden md:block absolute top-6 left-4 md:top-16 md:left-20 z-10">

          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg">
            {text.split("").map((char, index) => (
              <span
                key={index}
                className="letter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>

        {/* Left Image Section - 60% */}
        <div className="hidden md:block w-full md:w-3/5 h-64 md:h-screen relative">
        <div
    className="bg-[#9b111e] h-full rounded-none md:rounded-l-xl"
    style={{ width: "90%" }} // reduce from 100% to 90%
  >
            <img
              src={carImage}
              alt="Sign up illustration"
              className="object-cover rounded-none md:rounded-l-xl"
              style={{
                width: "100%",     // Explicitly control width smaller than full
                height: "auto",   // Maintain aspect ratio
                left: "135px",
                top: "50px",
                animation: "slideLeftToRightOnce 1.5s ease forwards",
                position: "relative",
              }}
            />
          </div>
        </div>

{/* Right Form Section - 40% */}
<div className="w-full md:w-2/5 flex items-center justify-center bg-white px-6 sm:px-8 md:px-12 py-12 md:py-0">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-6"
          >
            <h2 className="text-3xl font-bold text-[#9b111e] text-center">
              Create an Account
            </h2>

            <div>
              <label className="block mb-1 text-sm font-medium text-[#9b111e]">
                Username
              </label>
              <input
                {...register("username")}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-[#E6A895] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e] placeholder-[#c18383]"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-[#9b111e]">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-[#E6A895] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e] placeholder-[#c18383]"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-[#9b111e]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-[#E6A895] rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#9b111e] placeholder-[#c18383]"
                />
                <span
                  className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white font-semibold py-2 rounded-3xl transition duration-300 hover:brightness-110"
              style={{
                backgroundImage:
                  "linear-gradient(44.99deg, #700808 11%, #d23c3c 102.34%)",
              }}
            >
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-[#9b111e] hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
