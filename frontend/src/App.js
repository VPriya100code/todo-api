import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import ImageUpload from "./pages/ImageUpload";
import Navbar from "./components/Navbar";

function App() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      {isAuth && <Navbar />}

      <Routes>
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/todo" />}
        />
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate to="/todo" />}
        />

        <Route
          path="/todo"
          element={isAuth ? <Todo /> : <Navigate to="/login" />}
        />
        <Route
          path="/upload"
          element={isAuth ? <ImageUpload /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to={isAuth ? "/todo" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
