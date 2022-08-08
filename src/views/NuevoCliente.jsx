import Formulario from "../components/Formulario"
import Encabezado from "../components/Encabezado";

const NuevoCliente = () =>{
    return(
        <>
            <Encabezado
                nombreVista="Nuevo Cliente"
                textoEncabezado="Llena los siguientes campos para registrar un cliente"
            />
            <Formulario />
        </>
    )
}

export default NuevoCliente