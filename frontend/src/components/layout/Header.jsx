import { Button } from "@/components/ui/button"; // Ensure this is a valid import
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism ">
      <div className="container mx-auto px-4 bg-[#141515]">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            {/* <Heart clas/sName="w-6 h-6 text-primary" /> */}
            <img className="#ffff" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAPBJREFUSEvtVtsNwjAMvE4CbAKb0MlgE9gEmARkVJAbHHSOg5JKROpPZPv8uF48oNEZGuHCA7wGsC9I9AxAvtlhgQ+FoC+wI4BRI7PA94JKtcsVwMYLvAVwmpx2Vtu+JJX1ZSruClgTTeYnrbTuqldsBWTvnpMpbTULUr1iluTLAdZEWSnxECLdpnJTRQqTy6NSWpHYuWfJ5VEprUghYFYswnbp7xQOmNCdZrVlyJKGtTNnzM4pYtc/sKVSYS50Ta5/xdKBn86YffpYu9m+lpJLRODCRnLayZYp2p59JGRplwRqno+lnll9aibwjtUM+AHyJ5AfJMP1bgAAAABJRU5ErkJggg=="/>      
                  <span className="text-xl font-semibold text-white">
              HealthNodes
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/symptoms")}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              Check Symptoms
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/history")}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              History
            </Button>
          </nav>

          {/* Authentication Buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
