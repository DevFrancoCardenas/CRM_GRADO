import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from '@/components/Error';
import MultiCheckbox from "@/components/Multicheckbox";
import Toggle from '@/components/Toggle';
import { StoreContext } from "@/context/store";
import './User_form.css';
import client from "@/api";

export default function User_form() {
    // Essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [errors, set_errors] = useState([]);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        set_user({ ...user, password: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Fields
    const [user, set_user] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        groups: [],
        permissions: [],
        is_admin: false,
        is_active: true
    });

    const [repeat_password, set_repeat_password] = useState('');

    // Foreigns
    const [groups_list, set_groups_list] = useState([]);
    const [permissions_list, set_permissions_list] = useState([]);

    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            client.post('/group/list').then(r => set_groups_list(r?.data?.list || [])),
            client.post('/permission/list').then(r => set_permissions_list(r.data.list || [])),
        ]).finally(() => {
            store.setLoading(false);
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        let errors = [];
        if (user.password !== repeat_password) errors.push("- Las contraseñas no coinciden");

        if (errors.length === 0) {
            store.setLoading(true);
            if (id) {
                client.put(`/user/update/${id}`, { user }).then(r => {
                    store.showSuccess({ message: "Usuario Actualizado", redirect: "/dashboard/user/list", navigate });
                }).catch(e => {
                    const errorMessage = e?.response?.data?.message || "Error al Actualizar Registro";
                    set_errors([errorMessage]);
                    store.showErrors([errorMessage]);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/user/create`, { user }).then(r => {
                    store.showSuccess({ message: "Usuario Creado", redirect: "/dashboard/user/list", navigate });
                }).catch(e => {
                    const errorMessage = e?.response?.data?.message || "Error al Crear Registro";
                    set_errors([errorMessage]);
                    store.showErrors([errorMessage]);
                }).finally(() => store.setLoading(false));
            }
        } else {
            set_errors([errors[0]]);
            store.showErrors([errors]);
        }
    }

    useEffect(() => {
        getForeigns();
        if (id) {
            store.setLoading(true);
            client.post('/user/read', {
                query: {
                    find: { _id: id },
                }
            }).then(r => {
                const fetchedData = r?.data || {};
                const update = Object.keys(user).reduce((acc, key) => {
                    acc[key] = fetchedData.hasOwnProperty(key) ? fetchedData[key] : user[key];
                    return acc;
                }, {});
                set_user(update);
            }).finally(() => store.setLoading(false));
        }
    }, [id]);

    return (
        <>
            <div className="px-2 py-1 sm:py-2 xl:py-4">
            <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
                    <div className="sm:flex-auto">
                        <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">{id ? "EDITAR USUARIO" : "REGISTRAR USUARIO"}</h1>
                    </div>
                    <div className="ml-8 sm:ml-0  flex-none">
                        <Link
                            to="../user/list"
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm bg-transparent 2xl:px-6 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <Icon name="ArrowLeftCircleIcon" className="2xl:h-6 2xl:w-6 sm:mr-4 mr-1 sm:h-5 sm:w-5 h-4 w-4" />
                            Atras
                        </Link>
                    </div>
                </div>
                <div className="sm:mt-3 2xl:mt-4 mt-1 bg-gray-50 rounded-lg border border-gray-200">
                    <Error title="Error en el Formulario"  errors={errors} />
                    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                        <div className="px-4 py-4">
                            <div className="grid 2xl:grid-cols-5 sm:grid-cols-4 grid-cols-1 2xl:gap-4 sm:gap-2 gap-1">
                                <div className="bg-blue-200 rounded-lg border-t border-b 2xl:col-span-5 sm:col-span-4 col-span-1">
                                    <h1 className="sm:text-sm  text-xs leading-6 sm:py-1.5 py-0.5 font-medium text-gray-900 text-center">Información Personal</h1>
                                </div>
                                <div className=" ">
                                    <label htmlFor="name" className="block  font-medium text-black 2xl:text-sm text-xs">
                                        Nombre
                                    </label>
                                    <input required type="text" maxLength="50" name="name" value={user?.name} onChange={e => set_user({ ...user, name: e.target.value })} className=" focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
                                </div>
                                <div className="">
                                    <label htmlFor="username" className="block  font-medium text-black 2xl:text-sm text-xs">
                                        Nombre de Usuario
                                    </label>
                                    <input required type="text" minLength="4" maxLength="25" name="username" value={user?.username} onChange={e => set_user({ ...user, username: e.target.value })} className=" focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
                                </div>
                                <div className="">
                                    <label htmlFor="email" className="block  font-medium text-black 2xl:text-sm text-xs">
                                        Email
                                    </label>
                                    <div className="relative  rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Icon name="EnvelopeIcon" className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input type="email" name="email" value={user?.email} onChange={e => set_user({ ...user, email: e.target.value })} className="pl-10 focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
                                    </div>
                                </div>
                                {/* Password Field with Toggle */}
                                <div className="">
                                    <label htmlFor="password" className="block font-medium text-black 2xl:text-sm text-xs">
                                        Contraseña
                                    </label>
                                    <div className="relative  rounded-md shadow-sm">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            required={!id}
                                            className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md pe-10 2xl:text-sm text-xs "
                                        />
                                        <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <Icon name={showPassword ? "EyeIcon" : "EyeSlashIcon"} className="h-5 w-5 text-gray-500" />
                                        </div>
                                    </div>
                                </div>
                                {/* Repeat Password Field */}
                                <div className="">
                                    <label htmlFor="repeat_password" className="block font-medium text-black 2xl:text-sm text-xs">
                                        Repita la Contraseña
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="repeat_password"
                                        value={repeat_password}
                                        onChange={e => set_repeat_password(e.target.value)}
                                        required={!id}
                                        className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs  border-gray-300 rounded-md"
                                    />
                                </div>
                                 <div className="bg-blue-200 rounded-lg border-t border-b 2xl:col-span-5 sm:col-span-4 col-span-1 sm:mt-0 mt-1">
                                    <h1 className="sm:text-sm  text-xs leading-6 sm:py-1.5 py-0.5 font-medium text-gray-900 text-center">Información Permisos</h1>
                                </div>
                                <div className="col-span-1 ">
                                    <Toggle label="Usuario Activo" value={user?.is_active} setValue={(e) => set_user({ ...user, is_active: e })} />
                                </div>
                                <div className="col-span-1">
                                    <Toggle label="Usuario Administrador" value={user?.is_admin} setValue={(e) => set_user({ ...user, is_admin: e })} />
                                </div>
                                <div className="2xl:col-span-5 sm:col-span-4 col-span-1 border-b-4  border-gray-200">
                                    <MultiCheckbox label="Grupos de Permisos" options={groups_list} values={user?.groups} setValues={e => set_user({ ...user, groups: e })} />
                                </div>
                                <div className="2xl:col-span-5 sm:col-span-4 col-span-1  border-b-4  border-gray-200">
                                    <MultiCheckbox label="Permisos Individuales" options={permissions_list} values={user?.permissions} setValues={(e) => set_user({ ...user, permissions: e })} cols={5} />
                                </div>
                                {/* Other form fields go here */}
                            </div>
                        </div>
                        {/* Submit Button */}
                        <div className="p-2">
                            <div className="flex justify-end">
                                <Link
                                    to="../user/list"
                                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
