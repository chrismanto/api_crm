import { useNavigate } from "react-router-dom"
const LoginForm = () => {
    const navigate = useNavigate()

    return (
        <div
            className="md:flex md:min-h-screen bg-slate-100">
            <div
                className="md:m-auto m-3 bg-blue-900 text-white p-10 hover:bg-blue-700 transition-all
                 font-black text-2xl cursor-pointer rounded-2xl"
                onClick={() => navigate(`/clientes`)}
            >ACCEDER A CLIENTES</div>
        </div>
    )
}

export default LoginForm