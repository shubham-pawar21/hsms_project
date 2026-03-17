import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";

import Members from "./pages/Members/Member";
import Complaints from "./pages/Complaints/Complaints";
import Notices from "./pages/Notices/Notices";
import Maintenance from "./pages/Maintenance/Maintenance";
import MemberMaintenance from "./pages/Members/MemberMaintenance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <Layout>
                <Complaints />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <Layout>
                <Notices />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Layout>
                <Members />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <Layout>
                <Maintenance />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/member/maintenance"
          element={
            <ProtectedRoute>
              <Layout>
                <MemberMaintenance />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
