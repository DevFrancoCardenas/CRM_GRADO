import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from '@/components/Error';
import { StoreContext } from "@/context/store";
import './Tipo_de_seguimiento_form.css';
import client from "@/api";
export default function Tipo_de_seguimiento_form() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [errors, set_errors] = useState([]);
    //fields
    const [tipo_de_seguimiento, set_tipo_de_seguimiento] = useState({
        //initJStipo_de_seguimiento
tipo_de_seguimiento: "",
//endJStipo_de_seguimiento
//fieldsModel
    });
//extraStates
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
//callForeigns
        ]).finally(() => {
            store.setLoading(false);
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        var errors = [];
        //initJStipo_de_seguimiento
if (!tipo_de_seguimiento?.tipo_de_seguimiento) errors.push("El campo Tipo de Seguimiento es obligatorio");
//endJStipo_de_seguimiento
//validaciones
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/tipo_de_seguimiento/update/${id}`, { tipo_de_seguimiento }).then(r => {
                    store.showSuccess({ message: "Tipo de seguimiento Actualizado", redirect: "/dashboard/tipo_de_seguimiento/list", navigate });
                }).catch(e => {
                    const errorMessage = e?.response?.data?.message || "Error al Actualizar Registro";
                    set_errors([errorMessage]);
                    store.showErrors([errorMessage]);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/tipo_de_seguimiento/create`, { tipo_de_seguimiento }).then(r => {
                    store.showSuccess({ message: "Tipo de seguimiento Creado", redirect: "/dashboard/tipo_de_seguimiento/list", navigate });
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
//extraEffect
    useEffect(() => {
        getForeigns();
        if (id) {
            store.setLoading(true);
            client
                .post("/tipo_de_seguimiento/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(tipo_de_seguimiento).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : tipo_de_seguimiento[key];
                        return acc;
                    }, {});
//convertRead
                    set_tipo_de_seguimiento(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [id]);
    return (
        <>
            <div className="px-2 py-1 sm:py-2 xl:py-4">
                <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
                    <div className="sm:flex-auto">
                        <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">{id ? "EDITAR Tipo de seguimiento" : "REGISTRAR Tipo de seguimiento"}</h1>
                    </div>
                    <div className="ml-8 sm:ml-0 flex-none">
                        <Link
                            to="../tipo_de_seguimiento/list"
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm bg-transparent 2xl:px-6 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <Icon name="ArrowLeftCircleIcon" className="2xl:h-6 2xl:w-6 sm:mr-4 mr-1 sm:h-5 sm:w-5 h-4 w-4" />
                            Atras
                        </Link>
                    </div>
                </div>
                <div className="sm:mt-3 2xl:mt-4 mt-1 bg-gray-50 rounded-lg border border-gray-200">
                    <Error title="Error en el Formulario" errors={errors} />
                    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                        <div className="px-4 py-4">
                            <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 2xl:gap-4 sm:gap-2 gap-1">
                                {/* initJSXtipo_de_seguimiento */}
        <div className="">
            <label htmlFor="tipo_de_seguimiento" className="block font-medium text-black 2xl:text-sm text-xs">
                Tipo de Seguimiento
            </label>
            <input type="text" name="tipo_de_seguimiento" value={tipo_de_seguimiento?.tipo_de_seguimiento} onChange={e => set_tipo_de_seguimiento({ ...tipo_de_seguimiento, tipo_de_seguimiento: e.target.value })} required  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXtipo_de_seguimiento */}
{/* inputFields */}
                            </div>
                        </div>
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