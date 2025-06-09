//initJSunidad_academica_importacion
import Select from "@/components/Select1";
//endJSunidad_academica_importacion
import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from '@/components/Error';
import { StoreContext } from "@/context/store";
import './Importacion_de_datos_form.css';
import client from "@/api";
export default function Importacion_de_datos_form() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [errors, set_errors] = useState([]);
    //fields
    const [importacion_de_datos, set_importacion_de_datos] = useState({
        //initJSunidad_academica_importacion
unidad_academica_importacion: "",
//endJSunidad_academica_importacion
//initJSfecha_importacion
fecha_importacion: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
//endJSfecha_importacion
//initJSnombre_importado
nombre_importado: "",
//endJSnombre_importado
//initJSapellido_paterno_importado
apellido_paterno_importado: "",
//endJSapellido_paterno_importado
//initJSapellido_materno_importado
apellido_materno_importado: "",
//endJSapellido_materno_importado
//initJScarnet_identidad_importacion
carnet_identidad_importacion: "",
//endJScarnet_identidad_importacion
//initJSnumero_celular_importacion
numero_celular_importacion: "",
//endJSnumero_celular_importacion
//initJSnombre_tutor_impotado
nombre_tutor_impotado: "",
//endJSnombre_tutor_impotado
//initJSapellido_paterno_tutor_importado
apellido_paterno_tutor_importado: "",
//endJSapellido_paterno_tutor_importado
//initJSapellido_materno_tutor_importado
apellido_materno_tutor_importado: "",
//endJSapellido_materno_tutor_importado
//initJScelular_tutor_importado
celular_tutor_importado: "",
//endJScelular_tutor_importado
//initJScarrera_interes
carrera_interes: "",
//endJScarrera_interes
//initJSgestion_bachiller_importado
gestion_bachiller_importado: "",
//endJSgestion_bachiller_importado
//initJScolegio_importado
colegio_importado: "",
//endJScolegio_importado
//initJStipo_colegio_importado
tipo_colegio_importado: "",
//endJStipo_colegio_importado
//initJSdepartamento_importado
departamento_importado: "",
//endJSdepartamento_importado
//initJSprovincia_importado
provincia_importado: "",
//endJSprovincia_importado
//initJShorario_clases_importado
horario_clases_importado: "",
//endJShorario_clases_importado
//initJStipo_visita_importada
tipo_visita_importada: "",
//endJStipo_visita_importada
//fieldsModel
    });
//extraStates
    //initJSunidad_academica_importacion
const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
//endJSunidad_academica_importacion
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            //initJSunidad_academica_importacion
client.post('/unidades_academicas/list').then(r => set_unidades_academicas_list(r?.data?.list || [])),
//endJSunidad_academica_importacion
//callForeigns
        ]).finally(() => {
            store.setLoading(false);
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        var errors = [];
        //initJSunidad_academica_importacion
if (!importacion_de_datos?.unidad_academica_importacion) errors.push("El campo Unidad Academica es obligatorio");
//endJSunidad_academica_importacion
//initJSfecha_importacion
if (!importacion_de_datos?.fecha_importacion) errors.push("El campo Fecha de Importacion es obligatorio");
//endJSfecha_importacion
//initJSnombre_importado
if (!importacion_de_datos?.nombre_importado) errors.push("El campo Nombres es obligatorio");
//endJSnombre_importado
//initJStipo_visita_importada
if (!importacion_de_datos?.tipo_visita_importada) errors.push("El campo tipo visita es obligatorio");
//endJStipo_visita_importada
//validaciones
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/importacion_de_datos/update/${id}`, { importacion_de_datos }).then(r => {
                    store.showSuccess({ message: "Importacion de datos Actualizado", redirect: "/dashboard/importacion_de_datos/list", navigate });
                }).catch(e => {
                    const errorMessage = e?.response?.data?.message || "Error al Actualizar Registro";
                    set_errors([errorMessage]);
                    store.showErrors([errorMessage]);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/importacion_de_datos/create`, { importacion_de_datos }).then(r => {
                    store.showSuccess({ message: "Importacion de datos Creado", redirect: "/dashboard/importacion_de_datos/list", navigate });
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
                .post("/importacion_de_datos/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(importacion_de_datos).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : importacion_de_datos[key];
                        return acc;
                    }, {});
//initJSfecha_importacion
if (update?.fecha_importacion) update.fecha_importacion = new Date(update.fecha_importacion).toISOString().slice(0, 16);
//endJSfecha_importacion
//convertRead
                    set_importacion_de_datos(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [id]);
    return (
        <>
            <div className="px-2 py-1 sm:py-2 xl:py-4">
                <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
                    <div className="sm:flex-auto">
                        <h1 className="ttext-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">{id ? "EDITAR Importacion de datos" : "REGISTRAR Importacion de datos"}</h1>
                    </div>
                    <div className="ml-8 sm:ml-0 flex-none">
                        <Link
                            to="../importacion_de_datos/list"
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
                                {/* initJSXunidad_academica_importacion */}
                <div className="col-span-1">
                    <Select label="Seleccionar Unidad Academica" options={unidades_academicas_list} field="nombre_unidad_academica" value={importacion_de_datos?.unidad_academica_importacion} setValue={e => set_importacion_de_datos({ ...importacion_de_datos, unidad_academica_importacion: e })} />
                </div>
{/* endJSXunidad_academica_importacion */}
{/* initJSXfecha_importacion */}
            <div className="">
                <label htmlFor="fecha_importacion" className="block font-medium text-black 2xl:text-sm text-xs">
                    Fecha de Importacion
                </label>
                <input type="datetime-local" name="fecha_importacion" value={importacion_de_datos?.fecha_importacion} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, fecha_importacion: e.target.value })} required  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass" />
            </div>
{/* endJSXfecha_importacion */}
{/* initJSXnombre_importado */}
        <div className="">
            <label htmlFor="nombre_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Nombres
            </label>
            <input type="text" name="nombre_importado" value={importacion_de_datos?.nombre_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, nombre_importado: e.target.value })} required  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXnombre_importado */}
{/* initJSXapellido_paterno_importado */}
        <div className="">
            <label htmlFor="apellido_paterno_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Paterno
            </label>
            <input type="text" name="apellido_paterno_importado" value={importacion_de_datos?.apellido_paterno_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, apellido_paterno_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXapellido_paterno_importado */}
{/* initJSXapellido_materno_importado */}
        <div className="">
            <label htmlFor="apellido_materno_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Materno
            </label>
            <input type="text" name="apellido_materno_importado" value={importacion_de_datos?.apellido_materno_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, apellido_materno_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXapellido_materno_importado */}
{/* initJSXcarnet_identidad_importacion */}
        <div className="">
            <label htmlFor="carnet_identidad_importacion" className="block font-medium text-black 2xl:text-sm text-xs">
                Carnet de Identidad
            </label>
            <input type="text" name="carnet_identidad_importacion" value={importacion_de_datos?.carnet_identidad_importacion} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, carnet_identidad_importacion: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXcarnet_identidad_importacion */}
{/* initJSXnumero_celular_importacion */}
            <div className="">
                <label htmlFor="numero_celular_importacion" className="block font-medium text-black 2xl:text-sm text-xs">
                    Numero de celular
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon name="PhoneArrowUpRightIcon" className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input type="number" name="numero_celular_importacion" value={importacion_de_datos?.numero_celular_importacion} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, numero_celular_importacion: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md extraclass" />
                </div>
            </div>
{/* endJSXnumero_celular_importacion */}
{/* initJSXnombre_tutor_impotado */}
        <div className="">
            <label htmlFor="nombre_tutor_impotado" className="block font-medium text-black 2xl:text-sm text-xs">
                Nombre de tutor
            </label>
            <input type="text" name="nombre_tutor_impotado" value={importacion_de_datos?.nombre_tutor_impotado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, nombre_tutor_impotado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXnombre_tutor_impotado */}
{/* initJSXapellido_paterno_tutor_importado */}
        <div className="">
            <label htmlFor="apellido_paterno_tutor_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Paterno Tutor
            </label>
            <input type="text" name="apellido_paterno_tutor_importado" value={importacion_de_datos?.apellido_paterno_tutor_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, apellido_paterno_tutor_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXapellido_paterno_tutor_importado */}
{/* initJSXapellido_materno_tutor_importado */}
        <div className="">
            <label htmlFor="apellido_materno_tutor_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Materno Tutor
            </label>
            <input type="text" name="apellido_materno_tutor_importado" value={importacion_de_datos?.apellido_materno_tutor_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, apellido_materno_tutor_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXapellido_materno_tutor_importado */}
{/* initJSXcelular_tutor_importado */}
        <div className="">
            <label htmlFor="celular_tutor_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Celular tutor
            </label>
            <input type="text" name="celular_tutor_importado" value={importacion_de_datos?.celular_tutor_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, celular_tutor_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXcelular_tutor_importado */}
{/* initJSXcarrera_interes */}
        <div className="">
            <label htmlFor="carrera_interes" className="block font-medium text-black 2xl:text-sm text-xs">
                Carrera de Interes
            </label>
            <input type="text" name="carrera_interes" value={importacion_de_datos?.carrera_interes} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, carrera_interes: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXcarrera_interes */}
{/* initJSXgestion_bachiller_importado */}
        <div className="">
            <label htmlFor="gestion_bachiller_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Gestion Bachiller
            </label>
            <input type="text" name="gestion_bachiller_importado" value={importacion_de_datos?.gestion_bachiller_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, gestion_bachiller_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXgestion_bachiller_importado */}
{/* initJSXcolegio_importado */}
        <div className="">
            <label htmlFor="colegio_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Colegio
            </label>
            <input type="text" name="colegio_importado" value={importacion_de_datos?.colegio_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, colegio_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXcolegio_importado */}
{/* initJSXtipo_colegio_importado */}
        <div className="">
            <label htmlFor="tipo_colegio_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Tipo Colegio
            </label>
            <input type="text" name="tipo_colegio_importado" value={importacion_de_datos?.tipo_colegio_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, tipo_colegio_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXtipo_colegio_importado */}
{/* initJSXdepartamento_importado */}
        <div className="">
            <label htmlFor="departamento_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Departamento
            </label>
            <input type="text" name="departamento_importado" value={importacion_de_datos?.departamento_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, departamento_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXdepartamento_importado */}
{/* initJSXprovincia_importado */}
        <div className="">
            <label htmlFor="provincia_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Provincia
            </label>
            <input type="text" name="provincia_importado" value={importacion_de_datos?.provincia_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, provincia_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXprovincia_importado */}
{/* initJSXhorario_clases_importado */}
        <div className="">
            <label htmlFor="horario_clases_importado" className="block font-medium text-black 2xl:text-sm text-xs">
                Hr. de Clases
            </label>
            <input type="text" name="horario_clases_importado" value={importacion_de_datos?.horario_clases_importado} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, horario_clases_importado: e.target.value })}  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXhorario_clases_importado */}
{/* initJSXtipo_visita_importada */}
        <div className="">
            <label htmlFor="tipo_visita_importada" className="block font-medium text-black 2xl:text-sm text-xs">
                tipo visita
            </label>
            <input type="text" name="tipo_visita_importada" value={importacion_de_datos?.tipo_visita_importada} onChange={e => set_importacion_de_datos({ ...importacion_de_datos, tipo_visita_importada: e.target.value })} required  className="focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm 2xl:text-sm text-xs border-gray-300 rounded-md uppercase" />
        </div>
{/* endJSXtipo_visita_importada */}
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