
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import RoomIcon from '@material-ui/icons/Room';
import PersonIcon from '@material-ui/icons/Person';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PaymentIcon from '@material-ui/icons/Payment';
import ReportIcon from '@material-ui/icons/Report';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import StreetviewIcon from '@material-ui/icons/Streetview';
import MapIcon from '@material-ui/icons/Map';

// views
import DashboardPage from "views/Dashboard/Dashboard.js"
import Maps from "views/Maps/Maps.js"
import Profile from "views/Profile/Profile.js"
import Bikes from "views/Management/Bikes.js"
import Users from "views/Management/Users.js"
import Payments from "views/Management/Payments.js"
import Reports from "views/Management/Reports.js"
import Transactions from "views/Management/Transactions.js"
import Usages from "views/Management/Usages.js"
import Zones from "views/Management/Zones.js"

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
    {
        path: "/maps",
        name: "Maps",
        icon: MapIcon,
        component: Maps,
        layout: "/admin",
        childOf: "Yourself",
        isNested: false
    },
    {
        path: "/profile",
        name: "Admin Profile",
        icon: PersonIcon,
        component: Profile,
        layout: "/admin",
        childOf: "Yourself",
        isNested: false
    },
    {
        path: "/users",
        name: "Users",
        icon: SupervisorAccountIcon,
        component: Users,
        layout: "/admin",
        childOf: "Management",
        isNested: true
    },
    {
        path: "/bikes",
        name: "Bikes",
        icon: DirectionsBikeIcon,
        component: Bikes,
        layout: "/admin",
        childOf: "Management",
        isNested: true
    },
    {
        path: "/payments",
        name: "Payments",
        icon: PaymentIcon,
        component: Payments,
        layout: "/admin",
        childOf: "Management",
        isNested: true
    },
    {
        path: "/reports",
        name: "User Reports",
        icon: ReportIcon,
        component: Reports,
        layout: "/admin",
        childOf: "Management",
        isNested: true
    },
    {
        path: "/transactions",
        name: "Transactions",
        icon: LocalAtmIcon,
        component: Transactions,
        layout: "/admin",
        childOf: "Management",
        isNested: true
    },
    {
        path: "/usages",
        name: "Usages",
        icon: StreetviewIcon,
        component: Usages,
        layout: "/admin",
        childOf: "Management",
        isNested: true
    },
    {
        path: "/zones",
        name: "Zones",
        icon: RoomIcon,
        component: Zones,
        layout: "/admin",
        childOf: "Management",
        isNested: true
    },
];

export default dashboardRoutes;
