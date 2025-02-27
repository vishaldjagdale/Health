import { Button } from "@/components/ui/button"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { logoutUser } from "@/store/authSlice"; // Ensure this Redux action clears the user state
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { user } = useSelector((store) => store.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation function

  const logoutHandler = () => {
    dispatch(logoutUser()); // Clears user session from Redux
    toast.success(t("logout_success"));
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-morphism ">
      <div className="container mx-auto px-4 bg-[#303434]">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img
              className="#ffff"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAPBJREFUSEvtVtsNwjAMvE4CbAKb0MlgE9gEmARkVJAbHHSOg5JKROpPZPv8uF48oNEZGuHCA7wGsC9I9AxAvtlhgQ+FoC+wI4BRI7PA94JKtcsVwMYLvAVwmpx2Vtu+JJX1ZSruClgTTeYnrbTuqldsBWTvnpMpbTULUr1iluTLAdZEWSnxECLdpnJTRQqTy6NSWpHYuWfJ5VEprUghYFYswnbp7xQOmNCdZrVlyJKGtTNnzM4pYtc/sKVSYS50Ta5/xdKBn86YffpYu9m+lpJLRODCRnLayZYp2p59JGRplwRqno+lnll9aibwjtUM+AHyJ5AfJMP1bgAAAABJRU5ErkJggg=="
              alt="HealthNodes Logo"
            />
            <span className="text-xl font-semibold text-white">{t("healthnodes")}</span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              {t("home")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/symptoms")}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              {t("check_symptoms")}
            </Button>
      
            <Button
              variant="ghost"
              onClick={() => navigate("/history")}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              {t("history")}
            </Button>
          </nav>

          <LanguageSwitcher />

          {/* Authentication Buttons */}
          {!user ? (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {t("sign_in")}
              </Button>
              <Button
                onClick={() => navigate("/register")}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {t("sign_up")}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-white">
                {t("welcome")}, {user?.username || t("user")} 
              </span>
              <Button
                onClick={logoutHandler}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {t("logout")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
