//initJStipo_seguimiento
import Select from "@/components/Select1";
//endJStipo_seguimiento
import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from '@/components/Error';
import { StoreContext } from "@/context/store";
import './Seguimiento_plataforma_form.css';
import client from "@/api";
export default function Seguimiento_plataforma_form() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [errors, set_errors] = useState([]);
    //fields
    const [seguimiento_plataforma, set_seguimiento_plataforma] = useState({
        //initJSfecha_seguimiento
fecha_seguimiento: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
//endJSfecha_seguimiento
//initJStipo_seguimiento
tipo_seguimiento: "",
//endJStipo_seguimiento
//initJSestado_seguimiento
estado_seguimiento: "ATENDIDO",
//endJSestado_seguimiento
//initJSobservacion_seguimiento_plataforma
observacion_seguimiento_plataforma: "",
//endJSobservacion_seguimiento_plataforma
//initJSnombre_atencion
nombre_atencion: "",
//endJSnombre_atencion
//fieldsModel
    });
//extraStates
//initJStipo_seguimiento
const [tipo_de_seguimiento_list, set_tipo_de_seguimiento_list] = useState([]);
//endJStipo_seguimiento
//initJSnombre_atencion
const [atencion_list, set_atencion_list] = useState([]);
//endJSnombre_atencion
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
//initJStipo_seguimiento
client.post('/tipo_de_seguimiento/list').then(r => set_tipo_de_seguimiento_list(r?.data?.list || [])),
//endJStipo_seguimiento
//initJSnombre_atencion
client.post('/atencion/list').then(r => set_atencion_list(r?.data?.list || [])),
//endJSnombre_atencion
//callForeigns
        ]).finally(() => {
            store.setLoading(false);
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        var errors = [];
        //initJSfecha_seguimiento
if (!seguimiento_plataforma?.fecha_seguimiento) errors.push("El campo Fecha Seguimiento es obligatorio");
//endJSfecha_seguimiento
//initJStipo_seguimiento
if (!seguimiento_plataforma?.tipo_seguimiento) errors.push("El campo Tipo de Seguimiento es obligatorio");
//endJStipo_seguimiento
//initJSestado_seguimiento
if (!seguimiento_plataforma?.estado_seguimiento) errors.push("El campo Estado es obligatorio");
//endJSestado_seguimiento
//initJSobservacion_seguimiento_plataforma
if (!seguimiento_plataforma?.observacion_seguimiento_plataforma) errors.push("El campo Observacion es obligatorio");
//endJSobservacion_seguimiento_plataforma
//validaciones
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/seguimiento_plataforma/update/${id}`, { seguimiento_plataforma }).then(r => {
                    store.showSuccess({ message: "Seguimiento plataforma Actualizado", redirect: "/dashboard/seguimiento_plataforma/list", navigate });
                }).catch(e => {
                    const errorMessage = e?.response?.data?.message || "Error al Actualizar Registro";
                    set_errors([errorMessage]);
                    store.showErrors([errorMessage]);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/seguimiento_plataforma/create`, { seguimiento_plataforma }).then(r => {
                    store.showSuccess({ message: "Seguimiento plataforma Creado", redirect: "/dashboard/seguimiento_plataforma/list", navigate });
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
                .post("/seguimiento_plataforma/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(seguimiento_plataforma).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : seguimiento_plataforma[key];
                        return acc;
                    }, {});
                    //initJSfecha_seguimiento
if (update?.fecha_seguimiento) update.fecha_seguimiento = new Date(update.fecha_seguimiento).toISOString().slice(0, 16);
//endJSfecha_seguimiento
//convertRead
                    set_seguimiento_plataforma(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [id]);
    return (
        <>
            <div className="px-2 py-1 sm:py-2 xl:py-4">
                <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
                    <div className="sm:flex-auto">
                        <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">{id ? "EDITAR Seguimiento plataforma" : "REGISTRAR Seguimiento plataforma"}</h1>
                    </div>
                    <div className="ml-8 sm:ml-0 flex-none">
                        <Link
                            to="../seguimiento_plataforma/list"
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
                                {/* initJSXfecha_seguimiento */}
            <div className="">
                <label htmlFor="fecha_seguimiento" className="block font-medium text-black 2xl:text-sm text-xs">
                    Fecha Seguimiento
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon name="CalendarDaysIcon" className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="datetime-local" name="fecha_seguimiento" value={seguimiento_plataforma?.fecha_seguimiento} onChange={e => set_seguimiento_plataforma({ ...seguimiento_plataforma, fecha_seguimiento: e.target.value })} required  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass" />
                </div>
            </div>
{/* endJSXfecha_seguimiento */}
{/* initJSXtipo_seguimiento */}
                <div className="col-span-1">
                    <Select label="Seleccionar Tipo de Seguimiento" options={tipo_de_seguimiento_list} field="tipo_de_seguimiento" value={seguimiento_plataforma?.tipo_seguimiento} setValue={e => set_seguimiento_plataforma({ ...seguimiento_plataforma, tipo_seguimiento: e })} />
                </div>
{/* endJSXtipo_seguimiento */}
{/* initJSXestado_seguimiento */}
                <div className="col-span-1">
                    <Select label="Seleccionar Estado" options={["ATENDIDO", "EN SEGUIMIENTO", "GANADO", "PERDIDO"]} value={seguimiento_plataforma?.estado_seguimiento} setValue={e => set_seguimiento_plataforma({ ...seguimiento_plataforma, estado_seguimiento: e })} />
                </div>
{/* endJSXestado_seguimiento */}
{/* initJSXobservacion_seguimiento_plataforma */}
        <div className="">
            <label htmlFor="observacion_seguimiento_plataforma" className="block text-sm font-medium text-gray-800">
                Observacion
            </label>
            <textarea name="observacion_seguimiento_plataforma" value={seguimiento_plataforma?.observacion_seguimiento_plataforma} onChange={e => set_seguimiento_plataforma({ ...seguimiento_plataforma, observacion_seguimiento_plataforma: e.target.value })} required  rows="3" className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase"/>
        </div>
{/* endJSXobservacion_seguimiento_plataforma */}
{/* initJSXnombre_atencion */}
                <div className="col-span-1">
                    <Select label="Seleccionar Nombre Completo" options={atencion_list} field="nombre_completo" value={seguimiento_plataforma?.nombre_atencion} setValue={e => set_seguimiento_plataforma({ ...seguimiento_plataforma, nombre_atencion: e })} />
                </div>
{/* endJSXnombre_atencion */}
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