import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import PostForm from "../components/PostForm";

function WritePage() {
  const navigate = useNavigate();
  const user = useAppSelector((state: RootState) => state.auth.data.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return <PostForm />;
}

export default WritePage;
