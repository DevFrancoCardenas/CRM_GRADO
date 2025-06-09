//initJSbanner
import FilesUpload from "@/components/FilesUpload";
//endJSbanner
//initJSbanner
import { useRef } from "react";
//endJSbanner
//initJSunidad_academica_mensaje
import Select from "@/components/Select1";
//endJSunidad_academica_mensaje
import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from '@/components/Error';
import { StoreContext } from "@/context/store";
import './Mensajeria_form.css';
import client from "@/api";
export default function Mensajeria_form() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [errors, set_errors] = useState([]);
    //fields
    const [mensajeria, set_mensajeria] = useState({
        //initJSunidad_academica_mensaje
unidad_academica_mensaje: "",
//endJSunidad_academica_mensaje
//initJSbanner
banner: [],
//endJSbanner
//fieldsModel
    });
//initJSbanner
        const banner_upload = useRef();
//endJSbanner
//extraStates
    //initJSunidad_academica_mensaje
const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
//endJSunidad_academica_mensaje
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            //initJSunidad_academica_mensaje
client.post('/unidades_academicas/list').then(r => set_unidades_academicas_list(r?.data?.list || [])),
//endJSunidad_academica_mensaje
//callForeigns
        ]).finally(() => {
            store.setLoading(false);
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        var errors = [];
        //initJSunidad_academica_mensaje
if (!mensajeria?.unidad_academica_mensaje) errors.push("El campo Unidad Academica es obligatorio");
//endJSunidad_academica_mensaje
//validaciones
        if (errors.length == 0) {
            store.setLoading(true);
//initJSbanner
        mensajeria.banner = [...mensajeria.banner, ...await banner_upload.current.uploadFilesComponent()];
//endJSbanner
//beforeSend
            if (id) {
                client.put(`/mensajeria/update/${id}`, { mensajeria }).then(r => {
                    store.showSuccess({ message: "Mensajeria Actualizado", redirect: "/dashboard/mensajeria/list", navigate });
                }).catch(e => {
                    const errorMessage = e?.response?.data?.message || "Error al Actualizar Registro";
                    set_errors([errorMessage]);
                    store.showErrors([errorMessage]);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/mensajeria/create`, { mensajeria }).then(r => {
                    store.showSuccess({ message: "Mensajeria Creado", redirect: "/dashboard/mensajeria/list", navigate });
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
                .post("/mensajeria/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(mensajeria).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : mensajeria[key];
                        return acc;
                    }, {});
//convertRead
                    set_mensajeria(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [id]);
    return (
        <>
            <div className="px-2 py-1 sm:py-2 xl:py-4">
                <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
                    <div className="sm:flex-auto">
                        <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">{id ? "EDITAR Mensajeria" : "REGISTRAR Mensajeria"}</h1>
                    </div>
                    <div className="ml-8 sm:ml-0 flex-none">
                        <Link
                            to="../mensajeria/list"
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
                                {/* initJSXunidad_academica_mensaje */}
                <div className="col-span-1">
                    <Select label="Seleccionar Unidad Academica" options={unidades_academicas_list} field="nombre_unidad_academica" value={mensajeria?.unidad_academica_mensaje} setValue={e => set_mensajeria({ ...mensajeria, unidad_academica_mensaje: e })} />
                </div>
{/* endJSXunidad_academica_mensaje */}
{/* initJSXbanner */}
        <div className="col-span-3">
            <FilesUpload label="Banner" name="banner" files={mensajeria?.banner} setFiles={e => set_mensajeria({ ...mensajeria, banner: e })} ref={banner_upload} accept="image/*" maxFiles={1} maxSize={10} maxSizeImage={1}  />
        </div>
{/* endJSXbanner */}
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