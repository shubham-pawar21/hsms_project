import AdminDashboard from "./Admin/AdminDashboard";
import MemberDashboard from "./Members/MemberDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  return <MemberDashboard />;
};

export default Dashboard;
