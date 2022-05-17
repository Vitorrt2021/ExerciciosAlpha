import "./App.css";
import Layout from "./components/Layout";
import Rick from "./components/Pages/Rick";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/rick"
          element={
            <Layout>
              <Rick />
            </Layout>
          }
        />
        <Route
          path="about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />

        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
