import { Outlet, Link, useLocation } from "react-router-dom"

const Layout = () => {
    const location = useLocation()
    const urlActual = location.pathname

    const activarLink = url => urlActual === url 
        ? 'bg-white text-blue-900 rounded-md font-bold p-2 pl-3 m-3' 
        : 'text-white hover:text-blue-300'

    return (
        <div className="md:flex md:min-h-screen bg-slate-100">
            <div className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white ">CRM - Clientes</h2>
                <nav className="mt-10">
                    <Link className={`${activarLink('/clientes')} text-2xl block mt-2 transition-all delay-120`}
                        to="/clientes">Clientes</Link>

                    <Link className={`${activarLink('/clientes/nuevo')} text-2xl block mt-2 transition-all delay-120`}
                        to="/clientes/nuevo">Nuevo Cliente</Link>
                    <Link className={`text-white hover:text-red-300 text-2xl block mt-2 transition-all delay-120`}
                          to="/">Salir</Link>
                </nav>
            </div>

            <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
                <Outlet />
            </div>            
        </div>
    )
 }

 export default Layout