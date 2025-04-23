import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("/token.json");
    const data = await res.json();
    login(data.token);
    navigate("/seeker/profile");
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login (Dev)</button>
    </div>
  );
};

export default LoginPage;
