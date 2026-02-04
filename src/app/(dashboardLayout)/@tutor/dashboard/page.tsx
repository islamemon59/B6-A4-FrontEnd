import { redirect } from 'next/navigation';
import React from 'react';

const DashboardPage = () => {
    redirect("/dashboard/create-profile")
};

export default DashboardPage;