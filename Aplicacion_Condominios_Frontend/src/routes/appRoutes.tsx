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
import InfoDepartamento from "../departamento/components/InfoDepartamento";
import GestionVisitas from "../departamento/components/GestionVisitas";
import RegistrarVisita from "../departamento/components/RegistrarVisita";
import EditarContrato from "../departamento/components/EditarContrato";
import MostrarEdificio from "../departamento/components/MostrarEdificios";
import RegistrarParqueo from "../departamento/components/RegistrarParqueo";
import CrearEdificio from "../departamento/components/CrearEdificio";
import HistorialVisitas from "../departamento/components/HistorialVisitas";
import VisualizarParqueos from "../departamento/components/VisualizarParqueos";
import VisualizarBloques from "../departamento/components/VisualizarBloques";

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
        path: "/dashboard/crearEdificio",
        element: <CrearEdificio />,
        state: "dashboard.crearEdificio",
        sidebarProps: {
          displayText: "Registrar Edificio"
        },
      },
      {
        path: "/dashboard/crearDepa",
        element: <CrearDepa />,
        state: "dashboard.crearDepa",
        sidebarProps: {
          displayText: "Registrar Departamento"
        },
      },
      {
        path: "/dashboard/edificios",
        element: <MostrarEdificio />,
        state: "dashboard.edificios",
        sidebarProps: {
          displayText: "GestionarDepartamento"
        },
      },
      {
        path: "/dashboard/departamentos",
        element: <Depa />,
        state: "dashboard.departamentos",
      },
      {
        path: "/dashboard/RegResidente",
        element: <RegistrarResidente />,
        state: "dashboard.regResidente",
        sidebarProps: {
          displayText: "Registrar Residente"
        },
      },
      {
        path: "/dashboard/editarDepa",
        element: <EditarDep />,
        state: "dashboard.editDepa",
      },
      {
        path: "/dashboard/crearContrato",
        element: <CrearContrato />,
        state: "dashboard.crearContrato",
      },
      {
        path: "/dashboard/editContrato",
        element: <EditarContrato />,
        state: "dashboard.editContrato",
      },
      {
        path: "/dashboard/infoDepartamento",
        element: <InfoDepartamento />,
        state: "dashboard.infoDepartamento",
      },
      {
        path: "/dashboard/residentes",
        element: <MostrarResidentes />,
        state: "dashboard.residentes",
        sidebarProps: {
          displayText: "Residentes"
        },
      },
      {
        path: "/dashboard/visitas",
        element: <GestionVisitas />,
        state: "dashboard.visitas",
        sidebarProps: {
          displayText: "Gestionar Visitas"
        },
      },
      {
        path: "/dashboard/registrarVisita",
        element: <RegistrarVisita />,
        state: "dashboard.registrarVisita",
      },
      {
        path: "/dashboard/historialVisitas",
        element: <HistorialVisitas />,
        state: "dashboard.historialVisitas",
        sidebarProps: {
          displayText: "Historial de Visitas"
        },
      },
      {
        path: "/dashboard/parqueo",
        element: <RegistrarParqueo />,
        state: "dashboard.parqueo",
        sidebarProps: {
          displayText: "Gestionar Parqueos"
        },
      },
      {
        path: "/dashboard/visualizarParqueo",
        element: <VisualizarParqueos />,
        state: "dashboard.visualizarParqueo",
        sidebarProps: {
          displayText: "Visualizar Parqueos"
        },
      },
      {
        path: "/dashboard/visualizarBloques",
        element: <VisualizarBloques />,
        state: "dashboard.visualizarBloques",
        sidebarProps: {
          displayText: "Visualizar Bloques"
        },
      },
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