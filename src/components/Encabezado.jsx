const Encabezado = ({ nombreVista, textoEncabezado}) => {
    return (
        <div className="bg-white p-5 mb-10 rounded-md shadow-md">
            <h1 className="font-black text-4xl text-blue-900">{nombreVista}</h1>
            <p className="mt-3">{textoEncabezado}</p>
        </div>
    )
}
export default Encabezado