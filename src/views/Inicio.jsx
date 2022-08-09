import { useState, useEffect } from "react"
import Encabezado from "../components/Encabezado";
import Cliente from "../components/Cliente";
import Spinner from "../components/Spinner.jsx";

const Inicio = () =>{
    const [clientes, setClientes] = useState([])
    const [mostrarTabla, setMostrarTabla] = useState(false)

    useEffect( () => {
        const obtenerClientesAPI = async () => {
            try{
                const url = `${import.meta.env.VITE_API_URL}/clientes`
                const respuesta = await fetch(url)
                const data = await respuesta.json()
                setClientes(data)
                setMostrarTabla(true)
            }catch (error){
                console.log(error)
            }
        }
        obtenerClientesAPI()
    },[])

    const handleEliminar = async id => {
        if(confirm("¿Deseas eliminar este cliente?")){
            try{
                const url = `${import.meta.env.VITE_API_URL}/clientes/${id}`
                const respuesta = await fetch(url,{
                    method: 'DELETE'
                })
                await respuesta.json()

                setClientes( clientes.filter(cliente => cliente.id !== id) )
            }catch (error)
            {
                console.log(error)
            }
        }
    }

    return(
        <>
            <Encabezado
                nombreVista="Clientes"
                textoEncabezado="Administra tus clientes"
            />
            { mostrarTabla ? (
                <table className="w-full table-auto shadow bg-white">
                    <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientes.map( cliente => (
                            <Cliente
                                key = {cliente.id}
                                cliente = {cliente}
                                handleEliminar = {handleEliminar}
                            />
                        )
                    )}
                    </tbody>

                </table>
            ) : <Spinner />}
        </>
    )
}

export default Inicio