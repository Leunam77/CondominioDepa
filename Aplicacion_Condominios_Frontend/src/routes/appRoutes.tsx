import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AlertPage from "../pages/component/AlertPage";
import ButtonPage from "../pages/component/ButtonPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BuildIcon from '@mui/icons-material/Build';
import ApartmentIcon from '@mui/icons-material/Apartment';
import NotificationPage from "../pages/notifications/NotificationPage";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EmployePage from "../pages/employes/EmployePage";
import EngineeringIcon from '@mui/icons-material/Engineering';

import CrearDepa from "../departamento/components/CrearDepartamento.js";
import Depa from "../departamento/components/MostrarDep.js"
import EditarDep from "../departamento/components/EditarDep.js"
import RegistrarResidente from "../departamento/components/CrearResidente"
import CrearContrato from "../departamento/components/CrearContrato";
import MostrarResidentes from "../departamento/components/MostrarResidentes";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Departamentos",
      icon: <ApartmentIcon />
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index"
      },
      {
        path: "/dashboard/crearDepa",
        element: <CrearDepa />,
        state: "dashboard.crearDepa",
        sidebarProps: {
          displayText: "Crear Departamento"
        },
      },
      {
        path: "/dashboard/departamentos",
        element: <Depa />,
        state: "dashboard.depa",
        sidebarProps: {
          displayText: "Gestionar Departamento"
        },
      },
      {
        path: "/dashboard/RegResidente",
        element: <RegistrarResidente />,
        state: "dashboard.depa",
        sidebarProps: {
          displayText: "Registrar Residente"
        },
      },
      {
        path: "/dashboard/editarDepa",
        element: <EditarDep />,
        state: "dashboard.depa",
      },
      {
        path: "/dashboard/crearContrato",
        element: <CrearContrato />,
        state: "dashboard.depa",
      },
      {
        path: "/dashboard/residentes",
        element: <MostrarResidentes />,
        state: "dashboard.depa",
        sidebarProps: {
          displayText: "Residentes"
        },
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Habitaciones"
        }
      },
      {
        path: "/dashboard/saas",
        element: <SaasPage />,
        state: "dashboard.saas",
        sidebarProps: {
          displayText: "Parqueos"
        }
      }
    ]
  },
  {
    path: "/component",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Cobro por Servicios",
      icon: <MonetizationOnIcon />
    },
    child: [
      {
        path: "/component/alert",
        element: <AlertPage />,
        state: "component.alert",
        sidebarProps: {
          displayText: "Agua (Ejemplo)"
        },
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Electricidad"
        }
      }
    ]
  },
  {
    path: "/documentation",
    element: <DocumentationPage />,
    state: "documentation",
    sidebarProps: {
      displayText: "Areas Comunes",
      icon: <DashboardOutlinedIcon />
    }
  },

  {
    path: "/changelog",
    element: <ChangelogPage />,
    state: "changelog",
    sidebarProps: {
      displayText: "Mantenimiento",
      icon: <BuildIcon />
    }
  },

  {
    path: "/notifications",
    element: <NotificationPage />,
    state: "notification",
    sidebarProps: {
      displayText: "Notificaciones",
      icon: <NotificationsActiveIcon />
    }
  },

  {
    path: "/employees",
    element: <EmployePage />,
    state: "employee",
    sidebarProps: {
      displayText: "Empleados",
      icon: <EngineeringIcon />
    }
  },
  
];

export default appRoutes;