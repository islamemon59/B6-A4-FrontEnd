import { redirect } from "next/navigation";

const AdminDashboard = () => {
  redirect("/dashboard/all-bookings")
};

export default AdminDashboard;
