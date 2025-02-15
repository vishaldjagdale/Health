import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "@/store/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchParams } = new URL(document.location);
  const emailParam = searchParams.get("email");

  const [email, setEmail] = useState(emailParam ? emailParam : "");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    // Simulating an API call
    setTimeout(() => {
      dispatch(setUser({ username, email }));
      dispatch(setLoading(false));
      navigate("/");
    }, 1000);
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
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  id="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-white/80">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="xyz@example.com"
                  required
                  id="email"
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
                  type="password"
                  placeholder="********"
                  required
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
