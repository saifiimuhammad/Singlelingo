import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import Header from "./components/Header";
import Loader from "./components/Loader";
import ProtectRoute from "./components/ProtectRoute";

const Home = lazy(() => import("./components/Home"));
const Learning = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));

const App = () => {
  const [user, setUser] = useState<boolean>(() => {
    const auth = localStorage.getItem("user");
    return auth ? true : false;
  });

  useEffect(() => {
    const auth = localStorage.getItem("user");
    setUser(!!auth);
  }, []);

  return (
    <Router>
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learning />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default App;
