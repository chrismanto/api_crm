import Formulario from "../components/Formulario";
import Encabezado from "../components/Encabezado.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const EditarCliente = () =>{
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)
    const {id} = useParams()

    useEffect(()=>{

        const obtenerClienteAPI = async () => {
            try{
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const data = await respuesta.json()
                setCliente(data)
                setCargando(!cargando)
            }catch (error){
                console.log(error)
            }
        }
        obtenerClienteAPI()
    },[])

    return (
        <>
            <Encabezado
                nombreVista="Editar Cliente"
                textoEncabezado="Modifica los campos necesarios para actualizar el cliente"
            />
            {Object.keys(cliente).length===0 && cargando===false ? <p className="m-auto w-full">Cliente ID no válido</p> :
                <Formulario
                    cliente={cliente}
                    cargando={cargando}
                />
            }

        </>
    )
}

export default EditarCliente