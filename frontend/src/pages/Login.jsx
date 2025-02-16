import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { loginUser, setLoading } from "../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
  
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
  
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(resultAction.payload || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-background">
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
