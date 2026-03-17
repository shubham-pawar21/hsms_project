import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminDashboard />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
