import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Plane } from "lucide-react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import logo from "../../assets/icon.png";
import leftImage from "../../assets/left.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side - Image Card */}
        <div className="hidden lg:block w-1/2">
          <div className="bg-white p-1 h-full flex items-center justify-center">
            <img
              src={leftImage}
              alt="ILTC Travels"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Login Form Card */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white p-8 h-full">
            {/* Logo and Branding */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow overflow-hidden">
                <img
                  src={logo}
                  alt="ILTC Travels"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-3xl text-gray-800 mb-2">ILTC Travels</h1>
              <p className="text-gray-600">Admin/Staff Login</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email or Mobile"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or mobile"
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  aria-label="Toggle password visibility"
                  className="pr-10 transition-colors"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
              <p className="text-xs text-gray-700">
                <strong>Super Admin:</strong> admin@tourmanager.com / admin123
              </p>
              <p className="text-xs text-gray-700">
                <strong>Staff:</strong> staff@tourmanager.com / staff123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
