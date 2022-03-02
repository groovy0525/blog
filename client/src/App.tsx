import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="write" element={<WritePage />} />
        <Route path=":postId" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
