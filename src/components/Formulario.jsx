import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import Alerta from "./Alerta"
import Spinner from "./Spinner.jsx";

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate() // Hook para redireccionar

    // validacion de campos con Yup
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3,"El nombre es muy corto")
            .max(40,"El nombre es muy largo")
            .required("El nombre es obligatorio"),
        empresa: Yup.string()
            .required("La empresa es obligatorio")
            .max(255,"El nombre de la empresa es demasiado largo"),
        email: Yup.string()
            .email("El e-mail no es válido")
            .required("El e-mail es obligatorio"),
        telefono: Yup.number()
            .integer()
            .positive("El teléfono no es válido")
            .typeError("El teléfono no es válido"),
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta
            if(cliente.id){
                const url = `/clientes/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }else{
                const url = 'http://localhost:4000/clientes'

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            }
            await respuesta.json()

        }catch (error){
            console.log(error)
        }
    }

    return cargando ? <Spinner /> :(
        <div className="bg-white px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center pb-4 border-b-2">
                {Object.keys(cliente).length===0 ? 'Agregar' : 'Editar'} Cliente
            </h1>

            <Formik
                initialValues={{
                    nombre:cliente?.nombre ?? '',
                    empresa:cliente?.empresa ?? '',
                    email:cliente?.email ?? '',
                    telefono:cliente?.telefono ?? '',
                    notas:cliente?.notas ?? '',
                }}
                onSubmit={ async (values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm()
                    navigate('/clientes')
                } }
                validationSchema={nuevoClienteSchema}
                enableReinitialize={true}
            >
                { ({errors, touched}) => {
                    return (
                        <Form
                            className="mt-10"
                        >
                            {/* nombre */}
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="nombre"
                                >Nombre:</label>
                                <Field
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Nombre del Cliente"
                                />
                                {errors.nombre && touched.nombre && <Alerta>{errors.nombre}</Alerta> }
                            </div>
                            {/* empresa */}
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="empresa"
                                >Empresa:</label>
                                <Field
                                    id="empresa"
                                    name="empresa"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Empresa del Cliente"
                                />
                                {errors.empresa && touched.empresa && <Alerta>{errors.empresa}</Alerta> }
                            </div>
                            {/* email */}
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="email"
                                >E-mail:</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="E-mail del Cliente"
                                />
                                {errors.email && touched.email && <Alerta>{errors.email}</Alerta> }
                            </div>
                            {/* telefono */}
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="telefono"
                                >Teléfono:</label>
                                <Field
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Teléfono del Cliente"
                                />
                                {errors.telefono && touched.telefono && <Alerta>{errors.telefono}</Alerta> }

                            </div>
                            {/* notas */}
                            <div className="mb-4">
                                <label
                                    className="text-gray-800"
                                    htmlFor="notas"
                                >Notas:</label>
                                <Field
                                    as="textarea"
                                    id="notas"
                                    name="notas"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                    placeholder="Notas del Cliente"
                                />
                                {errors.notas && touched.notas && <Alerta>{errors.notas}</Alerta> }
                            </div>
                            <input
                                type="submit"
                                value={Object.keys(cliente).length===0 ? 'Guardar' : 'Actualizar'}
                                className="mt-5 w-full bg-blue-800 hover:bg-blue-600 transition-all
                                     text-white p-3 cursor-pointer uppercase font-bold text-md"
                            />
                        </Form>
                    )}}
            </Formik>

        </div>
    )
}

Formulario.defaultProps = {
    cliente:{},
    cargando:false
}

export default Formulario