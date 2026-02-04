import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


const StudentDashboard = () => {
    
     redirect("/dashboard/create-bookings")
};

export default StudentDashboard;