import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authUser.js";

const Login = () => {
  const navigate = useNavigate();

  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#1C2529]">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto">
          <div className="glass-morphism rounded-lg p-6 space-y-6">
            <div className="text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <Heart className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
              </div>
              <p className="text-white/80">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-white/80">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => getEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-white/80">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  onChange={(e) => getPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4FD1C5] hover:bg-[#38B2AC] text-white"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="space-y-4">
              <div className="text-center">
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/80"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot your password?
                </Button>
              </div>

              <div className="text-center text-white/80">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="text-primary hover:text-primary/80"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
