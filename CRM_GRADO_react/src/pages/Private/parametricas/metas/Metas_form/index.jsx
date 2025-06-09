//initJSunidad_academica
import Select from "@/components/Select1";
//endJSunidad_academica
import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from '@/components/Error';
import { StoreContext } from "@/context/store";
import './Metas_form.css';
import client from "@/api";
export default function Metas_form() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [errors, set_errors] = useState([]);
    //fields
    const [metas, set_metas] = useState({
        //initJSunidad_academica
unidad_academica: "",
//endJSunidad_academica
//initJSgestion
gestion: "",
//endJSgestion
//initJSmeta
meta: "",
//endJSmeta
//initJSmes_gestion
mes_gestion: "",
//endJSmes_gestion
//initJScantidad_atendidos_plataforma
cantidad_atendidos_plataforma: "",
//endJScantidad_atendidos_plataforma
//initJScantidad_ganados_mes
cantidad_ganados_mes: "",
//endJScantidad_ganados_mes
//initJScantidad_perdidos_mes
cantidad_perdidos_mes: "",
//endJScantidad_perdidos_mes
//initJSindicador_atencion
indicador_atencion: "",
//endJSindicador_atencion
//initJSfecha_registro
fecha_registro: "",
//endJSfecha_registro
//fieldsModel
    });
//extraStates
    //initJSunidad_academica
const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
//endJSunidad_academica
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            //initJSunidad_academica
client.post('/unidades_academicas/list').then(r => set_unidades_academicas_list(r?.data?.list || [])),
//endJSunidad_academica
//callForeigns
        ]).finally(() => {
            store.setLoading(false);
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        var errors = [];
        //initJSunidad_academica
if (!metas?.unidad_academica) errors.push("El campo Unidad Academica es obligatorio");
//endJSunidad_academica
//initJSgestion
if (!metas?.gestion) errors.push("El campo Gestion es obligatorio");
//endJSgestion
//initJSmeta
if (!metas?.meta) errors.push("El campo Meta cantidad de inscritos es obligatorio");
//endJSmeta
//validaciones
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/metas/update/${id}`, { metas }).then(r => {
                    store.showSuccess({ message: "Metas Actualizado", redirect: "/dashboard/metas/list", navigate });
                }).catch(e => {
                    const errorMessage = e?.response?.data?.message || "Error al Actualizar Registro";
                    set_errors([errorMessage]);
                    store.showErrors([errorMessage]);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/metas/create`, { metas }).then(r => {
                    store.showSuccess({ message: "Metas Creado", redirect: "/dashboard/metas/list", navigate });
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
                .post("/metas/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(metas).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : metas[key];
                        return acc;
                    }, {});
//initJSfecha_registro
if (update?.fecha_registro) update.fecha_registro = new Date(update.fecha_registro).toISOString().slice(0, 16);
//endJSfecha_registro
//convertRead
                    set_metas(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [id]);
    return (
        <>
            <div className="px-2 py-1 sm:py-2 xl:py-4">
                <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
                    <div className="sm:flex-auto">
                        <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">{id ? "EDITAR Metas" : "REGISTRAR Metas"}</h1>
                    </div>
                    <div className="ml-8 sm:ml-0 flex-none">
                        <Link
                            to="../metas/list"
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
                                {/* initJSXunidad_academica */}
                <div className="col-span-1">
                    <Select label="Seleccionar Unidad Academica" options={unidades_academicas_list} field="nombre_unidad_academica" value={metas?.unidad_academica} setValue={e => set_metas({ ...metas, unidad_academica: e })} />
                </div>
{/* endJSXunidad_academica */}
{/* initJSXgestion */}
        <div className="">
            <label htmlFor="gestion" className="block font-medium text-black 2xl:text-sm text-xs">
                Gestion
            </label>
            <input type="text" name="gestion" value={metas?.gestion} onChange={e => set_metas({ ...metas, gestion: e.target.value })} required pattern="[0-9]+"  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md " />
        </div>
{/* endJSXgestion */}
{/* initJSXmeta */}
        <div className="">
            <label htmlFor="meta" className="block font-medium text-black 2xl:text-sm text-xs">
                Meta cantidad de inscritos
            </label>
            <input type="text" name="meta" value={metas?.meta} onChange={e => set_metas({ ...metas, meta: e.target.value })} required pattern="[0-9]+"  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md " />
        </div>
{/* endJSXmeta */}
{/* initJSXmes_gestion */}
                <div className="col-span-1">
                    <Select label="Seleccionar Mes" options={["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]} value={metas?.mes_gestion} setValue={e => set_metas({ ...metas, mes_gestion: e })} />
                </div>
{/* endJSXmes_gestion */}
{/* initJSXcantidad_atendidos_plataforma */}
            <div className="">
                <label htmlFor="cantidad_atendidos_plataforma" className="block font-medium text-black 2xl:text-sm text-xs">
                    Cantidad de Atendidos en el mes
                </label>
                <input type="number" name="cantidad_atendidos_plataforma" value={metas?.cantidad_atendidos_plataforma} onChange={e => set_metas({ ...metas, cantidad_atendidos_plataforma: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass" />
            </div>
{/* endJSXcantidad_atendidos_plataforma */}
{/* initJSXcantidad_ganados_mes */}
            <div className="">
                <label htmlFor="cantidad_ganados_mes" className="block font-medium text-black 2xl:text-sm text-xs">
                    Cantidad de ganados mes
                </label>
                <input type="number" name="cantidad_ganados_mes" value={metas?.cantidad_ganados_mes} onChange={e => set_metas({ ...metas, cantidad_ganados_mes: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass" />
            </div>
{/* endJSXcantidad_ganados_mes */}
{/* initJSXcantidad_perdidos_mes */}
            <div className="">
                <label htmlFor="cantidad_perdidos_mes" className="block font-medium text-black 2xl:text-sm text-xs">
                    Cantidad de perdidos mes
                </label>
                <input type="number" name="cantidad_perdidos_mes" value={metas?.cantidad_perdidos_mes} onChange={e => set_metas({ ...metas, cantidad_perdidos_mes: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass" />
            </div>
{/* endJSXcantidad_perdidos_mes */}
{/* initJSXindicador_atencion */}
            <div className="">
                <label htmlFor="indicador_atencion" className="block font-medium text-black 2xl:text-sm text-xs">
                    Indicador de atencion
                </label>
                <input type="number" name="indicador_atencion" value={metas?.indicador_atencion} onChange={e => set_metas({ ...metas, indicador_atencion: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass" />
            </div>
{/* endJSXindicador_atencion */}
{/* initJSXfecha_registro */}
            <div className="">
                <label htmlFor="fecha_registro" className="block font-medium text-black 2xl:text-sm text-xs">
                    Fecha
                </label>
                <input type="datetime-local" name="fecha_registro" value={metas?.fecha_registro} onChange={e => set_metas({ ...metas, fecha_registro: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass" />
            </div>
{/* endJSXfecha_registro */}
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