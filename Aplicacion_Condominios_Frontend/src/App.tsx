import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import MostrarDep from "./components/moduloDep/MostrarDep.js";
import CrearDep from "./components/moduloDep/CrearDep";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>{routes}</Route>
        <Route path="/depas" element={<MostrarDep/>}/>
        <Route path="/crearDepartamento" element={<CrearDep/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
