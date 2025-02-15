import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto">
          <div className="neo-blur rounded-lg p-6 space-y-6">
            <div className="text-center">
              <UserPlus className="w-12 h-12 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white">Create Account</h1>
              <p className="text-white/80 mt-2">Join SympTrack today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-white/80">
                  {User.name}
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-white/80">
                  {user.email}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-white/80">
                  {user.password}
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                Create Account
              </Button>
            </form>

            <div className="text-center text-white/80">
              Already have an account?{" "}
              <Button
                variant="link"
                className="text-primary hover:text-primary/80"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
