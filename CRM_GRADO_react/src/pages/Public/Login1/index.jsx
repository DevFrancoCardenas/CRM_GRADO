import { useContext, useEffect, useState } from 'react';
import Logo from '@/assets/logo.png';
import './Login.css';
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import { StoreContext } from '@/context/store';
import { Navigate } from 'react-router-dom';
import client from '@/api';

function Login() {
    const store = useContext(StoreContext);
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');
    const [errors, setErrors] = useState([]);
    const [loginSuccess, set_loginSuccess] = useState(false);
    const [oauthLogin, set_oauthLogin] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!username && username != "") {
            setErrors(["Porfavor ingrese su nombre de Usuario"]);
            return;
        }
        if (!password && password != "") {
            setErrors(["Porfavor ingrese la contraseña"]);
            return;
        }
        store.setLoading(true);
        client.post("/user/login", {
            username, password
        }).then(r => {
            store.login(r.data);
        }).catch((e) => {
            store.setLoading(false);
            store.showErrors([e.response.data.message]);
            setErrors([e.response.data.message]);
        });
    };
    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:4000/authGoogle/google';
    };

    useEffect(() => {
        if (store.user) {
            store.setLoading(false);
            set_loginSuccess(true);
        }
    }, [store.user]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedUserData = urlParams.get('user');
        const encodedToken = urlParams.get('token');

        if (encodedUserData && encodedToken) {
            set_oauthLogin(true);
            const user = JSON.parse(atob(encodedUserData));
            const token = atob(encodedToken);
            set_username(user.username);
            store.setLoading(true);
            setTimeout(() => {
                store.login({ user, token });
            }, 1500);
        }
    }, []);

    if (loginSuccess) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            {store.loading && <Loading />}
            <div className="min-h-screen bg-gray-100  flex flex-col justify-center">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <img className="mx-auto h-32 w-auto pb-4" src={Logo} alt="Workflow" />
                                <h2 className="max-w-sm pb-2 mx-auto text-3xl font-extrabold text-blue-900 text-center">
                                    INICIAR SESIÓN
                                </h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <Error title="CREDENCIALES INVÁLIDAS" errors={errors} />
                                <form className="space-y-6" onSubmit={handleSubmit} >
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                            Nombre de Usuario
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="username"
                                                name="username"
                                                type="text"
                                                autoComplete="username"
                                                required
                                                value={username}
                                                onChange={e => set_username(e.target.value)}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    {!oauthLogin &&
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Contraseña
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    value={password}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    onChange={e => set_password(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    }
                                    <div>
                                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                            Ingresar
                                        </button>
                                        {/*<button
                                            type="button"
                                            onClick={handleGoogleLogin}
                                            className="mt-2 w-full flex justify-center items-center py-2 px-4 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <img src="/logo-google-workspace.svg" alt="Logo de Google Workspace" className="h-4 w-auto mr-2" />
                                        </button>*/}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default Login;