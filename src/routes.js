
// @material-ui/icons

// views
import DashboardPage from "views/Dashboard/Dashboard.js"
import Dashboard from "@material-ui/icons/Dashboard";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/admin",
        childOf: "Dashboard",
        isNested: false
    },
];

export default dashboardRoutes;
