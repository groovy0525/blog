import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import AuthForm from "../components/AuthForm";

function LoginPage() {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.auth.data.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return <AuthForm type="login" />;
}

export default LoginPage;
