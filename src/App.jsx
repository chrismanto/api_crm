import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./layout/Layout.jsx";

import Inicio from "./views/Inicio";
import NuevoCliente from "./views/NuevoCliente";
import EditarCliente from "./views/EditarCliente";
import VerCliente from "./views/VerCliente";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/clientes" element={<Layout />}>
                <Route index element={<Inicio />} />
                <Route path="nuevo" element={<NuevoCliente />} />
                <Route path="editar/:id" element={<EditarCliente />} />
                <Route path=":id" element={<VerCliente />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
