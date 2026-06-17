import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from '../pages/Dashboard.jsx'
import Students from '../pages/Students.jsx'
import Analytics from '../pages/Analytics.jsx'
export const router = createBrowserRouter([{
    element: <DashboardLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: "/students",
            element: <Students />
        },
        {
            path: "/analytics",
            element: <Analytics />
        }
    ]
}])