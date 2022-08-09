import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import Encabezado from "../components/Encabezado";
import Spinner from "../components/Spinner"

const DatoCliente = ({titulo, valor}) => {
    return (
        <p className="text-2xl text-gray-600 mt-4">
            <span className="font-bold uppercase text-gray-800">{titulo}: </span>{valor}
        </p>
    )
}

const VerCliente = () => {
    const [cliente, setCliente] = useState({})
    const [mostrarCliente, setMostrarCliente] = useState(false)
    const {id} = useParams()

    useEffect(()=>{
        const obtenerClienteAPI = async () => {
            try{
                const url = `${import.meta.env.VITE_API_URL}/clientes/${id}`
                const respuesta = await fetch(url)
                const data = await respuesta.json()
                setCliente(data)
                setMostrarCliente(!mostrarCliente)

            }catch (error){
                console.log(error)
            }
        }
        obtenerClienteAPI()
    },[])


    return (
        <>
            <Encabezado
                nombreVista="Ver Cliente"
                textoEncabezado="Ve toda la información del cliente"
            />

            {mostrarCliente ? (<div className="bg-white p-5 rounded-md shadow-md">
                {Object.keys(cliente).length > 0
                    ? (<>
                        <p className="text-3xl text-gray-700 mt-3">
                            <span className="font-bold uppercase">Cliente: </span>{cliente.nombre}
                        </p>

                        {cliente.empresa && (
                            <DatoCliente
                                titulo="Empresa"
                                valor={cliente.empresa}
                            />
                        )}

                        {cliente.email && (
                            <DatoCliente
                                titulo="E-mail"
                                valor={cliente.email}
                            />
                        )}

                        {cliente.telefono && (
                            <DatoCliente
                                titulo="Teléfono"
                                valor={cliente.telefono}
                            />
                        )}

                        {cliente.notas && (
                            <DatoCliente
                                titulo="Notas"
                                valor={cliente.notas}
                            />
                        )}

                    </>)
                    : (<p>No hay resultados</p>)
                }
            </div>): <Spinner />}
        </>

    )
}

export default VerCliente