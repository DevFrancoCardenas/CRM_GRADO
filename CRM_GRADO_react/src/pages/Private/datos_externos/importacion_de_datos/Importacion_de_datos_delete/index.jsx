import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "@/context/store";
import './Importacion_de_datos_delete.css';
import client from "@/api";
export default function Importacion_de_datos_delete() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [importacion_de_datos, set_importacion_de_datos] = useState({});
    const populate = [
        //initJSunidad_academica_importacion
"unidad_academica_importacion",
//endJSunidad_academica_importacion
//foreigns
        "last_user",
    ];
    function deleteImportacion_de_datos() {
        store.setLoading(true);
        client.delete(`/importacion_de_datos/delete/${id}`).then(r => {
            store.showSuccess({ message: "Registro Eliminado", redirect: "/dashboard/importacion_de_datos/list", navigate });
        }).catch(e => {
            store.showErrors(["Error al Eliminar el Registro"]);
        }).finally(() => store.setLoading(false));
    }
    useEffect(() => {
        store.setLoading(true);
        if (id) {
            store.setLoading(true);
            client.post('/importacion_de_datos/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_importacion_de_datos(r?.data);
            }).finally(() => store.setLoading(false));
        }
    }, [])
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-50 px-4 py-3 rounded-lg border-gray-200 border sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900 uppercase">ELIMINAR Importacion de datos</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            to="../importacion_de_datos/list"
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <Icon name="ArrowLeftCircleIcon" className="h-6 w-6" />
                            Atras
                        </Link>
                    </div>
                </div>
                <div className="sm:mt-3 2xl:mt-4 mt-1  px-4 py-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-lg mt-2 max-w-xl text-2xl text-gray-500">
                        <p>
                            ¿Está seguro de eliminar el registro?
                        </p>
                    </div>
                    <div className="mt-5">
                        <button type="button" onClick={deleteImportacion_de_datos} className="text-lg inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                            Eliminar Importacion de datos
                        </button>
                    </div>
                    <dl className=" grid 2xl:grid-cols-5 sm:grid-cols-4 grid-cols-1 2xl:gap-4 sm:gap-2 gap-1">
                        {/* initJSXunidad_academica_importacion */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Unidad Academica
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.unidad_academica_importacion?.nombre_unidad_academica}
            </dd>
        </div>
{/* endJSXunidad_academica_importacion */}
{/* initJSXfecha_importacion */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Fecha de Importacion
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {new Date(importacion_de_datos?.fecha_importacion).toLocaleString("es-ES")}
            </dd>
        </div>
{/* endJSXfecha_importacion */}
{/* initJSXnombre_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Nombres
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.nombre_importado}
            </dd>
        </div>
{/* endJSXnombre_importado */}
{/* initJSXapellido_paterno_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Paterno
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.apellido_paterno_importado}
            </dd>
        </div>
{/* endJSXapellido_paterno_importado */}
{/* initJSXapellido_materno_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Materno
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.apellido_materno_importado}
            </dd>
        </div>
{/* endJSXapellido_materno_importado */}
{/* initJSXcarnet_identidad_importacion */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Carnet de Identidad
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.carnet_identidad_importacion}
            </dd>
        </div>
{/* endJSXcarnet_identidad_importacion */}
{/* initJSXnumero_celular_importacion */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Numero de celular
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.numero_celular_importacion}
            </dd>
        </div>
{/* endJSXnumero_celular_importacion */}
{/* initJSXnombre_tutor_impotado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Nombre de tutor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.nombre_tutor_impotado}
            </dd>
        </div>
{/* endJSXnombre_tutor_impotado */}
{/* initJSXapellido_paterno_tutor_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Paterno Tutor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.apellido_paterno_tutor_importado}
            </dd>
        </div>
{/* endJSXapellido_paterno_tutor_importado */}
{/* initJSXapellido_materno_tutor_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Materno Tutor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.apellido_materno_tutor_importado}
            </dd>
        </div>
{/* endJSXapellido_materno_tutor_importado */}
{/* initJSXcelular_tutor_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Celular tutor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.celular_tutor_importado}
            </dd>
        </div>
{/* endJSXcelular_tutor_importado */}
{/* initJSXcarrera_interes */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Carrera de Interes
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.carrera_interes}
            </dd>
        </div>
{/* endJSXcarrera_interes */}
{/* initJSXgestion_bachiller_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Gestion Bachiller
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.gestion_bachiller_importado}
            </dd>
        </div>
{/* endJSXgestion_bachiller_importado */}
{/* initJSXcolegio_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Colegio
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.colegio_importado}
            </dd>
        </div>
{/* endJSXcolegio_importado */}
{/* initJSXtipo_colegio_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Tipo Colegio
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.tipo_colegio_importado}
            </dd>
        </div>
{/* endJSXtipo_colegio_importado */}
{/* initJSXdepartamento_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Departamento
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.departamento_importado}
            </dd>
        </div>
{/* endJSXdepartamento_importado */}
{/* initJSXprovincia_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Provincia
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.provincia_importado}
            </dd>
        </div>
{/* endJSXprovincia_importado */}
{/* initJSXhorario_clases_importado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Hr. de Clases
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.horario_clases_importado}
            </dd>
        </div>
{/* endJSXhorario_clases_importado */}
{/* initJSXtipo_visita_importada */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                tipo visita
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {importacion_de_datos?.tipo_visita_importada}
            </dd>
        </div>
{/* endJSXtipo_visita_importada */}
{/* fieldsDetail */}
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Último Editor
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {importacion_de_datos?.last_user?.name}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Creado en
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {new Date(importacion_de_datos?.createdAt).toLocaleString("es-ES")}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Actualizado en
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {new Date(importacion_de_datos?.updatedAt).toLocaleString("es-ES")}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    );
}