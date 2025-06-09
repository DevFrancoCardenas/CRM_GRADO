import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "@/context/store";
import './Atencion_delete.css';
import client from "@/api";
export default function Atencion_delete() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [atencion, set_atencion] = useState({});
    const populate = [
        //initJSunidad_academica
"unidad_academica",
//endJSunidad_academica
//initJSasesor
"asesor",
//endJSasesor
//initJScarreras
"carreras",
//endJScarreras
//foreigns
        "last_user",
    ];
    function deleteAtencion() {
        store.setLoading(true);
        client.delete(`/atencion/delete/${id}`).then(r => {
            store.showSuccess({ message: "Registro Eliminado", redirect: "/dashboard/atencion/list", navigate });
        }).catch(e => {
            store.showErrors(["Error al Eliminar el Registro"]);
        }).finally(() => store.setLoading(false));
    }
    useEffect(() => {
        store.setLoading(true);
        if (id) {
            store.setLoading(true);
            client.post('/atencion/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_atencion(r?.data);
            }).finally(() => store.setLoading(false));
        }
    }, [])
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-50 px-4 py-3 rounded-lg border-gray-200 border sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900 uppercase">ELIMINAR Atencion</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            to="../atencion/list"
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
                        <button type="button" onClick={deleteAtencion} className="text-lg inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                            Eliminar Atencion
                        </button>
                    </div>
                    <dl className=" grid 2xl:grid-cols-5 sm:grid-cols-4 grid-cols-1 2xl:gap-4 sm:gap-2 gap-1">
                        {/* initJSXunidad_academica */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Unidad Academica
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.unidad_academica?.nombre_unidad_academica}
            </dd>
        </div>
{/* endJSXunidad_academica */}
{/* initJSXnombres */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Nombres
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.nombres}
            </dd>
        </div>
{/* endJSXnombres */}
{/* initJSXapellido_paterno */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Paterno
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.apellido_paterno}
            </dd>
        </div>
{/* endJSXapellido_paterno */}
{/* initJSXapellido_materno */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Materno
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.apellido_materno}
            </dd>
        </div>
{/* endJSXapellido_materno */}
{/* initJSXcarnet_identidad */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Carnet de Identidad
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.carnet_identidad}
            </dd>
        </div>
{/* endJSXcarnet_identidad */}
{/* initJSXnumero_celular */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Numero de celular
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.numero_celular}
            </dd>
        </div>
{/* endJSXnumero_celular */}
{/* initJSXnombre_tutor */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Nombres Tutor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.nombre_tutor}
            </dd>
        </div>
{/* endJSXnombre_tutor */}
{/* initJSXapellido_materno_tutor */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Materno Tutor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.apellido_materno_tutor}
            </dd>
        </div>
{/* endJSXapellido_materno_tutor */}
{/* initJSXapellido_paterno_tutor */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Apellido Paterno Tutor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.apellido_paterno_tutor}
            </dd>
        </div>
{/* endJSXapellido_paterno_tutor */}
{/* initJSXnumero_celular_tutor */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Numero de celular Tutor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.numero_celular_tutor}
            </dd>
        </div>
{/* endJSXnumero_celular_tutor */}
{/* initJSXfecha_atencion */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Fecha de Atencion
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {new Date(atencion?.fecha_atencion).toLocaleString("es-ES")}
            </dd>
        </div>
{/* endJSXfecha_atencion */}
{/* initJSXotras_carreras */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Otras Carreras
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.otras_carreras}
            </dd>
        </div>
{/* endJSXotras_carreras */}
{/* initJSXgestion_bachiller */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Gestion Bachiller
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.gestion_bachiller}
            </dd>
        </div>
{/* endJSXgestion_bachiller */}
{/* initJSXcolegio */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Colegio
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.colegio}
            </dd>
        </div>
{/* endJSXcolegio */}
{/* initJSXtipo_colegio */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Tipo Colegio
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.tipo_colegio}
            </dd>
        </div>
{/* endJSXtipo_colegio */}
{/* initJSXprovincia */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Provincia
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.provincia}
            </dd>
        </div>
{/* endJSXprovincia */}
{/* initJSXcomo_te_enteraste_emi */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                ¿Como te Enteraste de Nosotros?
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.como_te_enteraste_emi}
            </dd>
        </div>
{/* endJSXcomo_te_enteraste_emi */}
{/* initJSXotro_metodo_capatacion */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                ¿Otro medio de captacion?
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.otro_metodo_capatacion}
            </dd>
        </div>
{/* endJSXotro_metodo_capatacion */}
{/* initJSXhora_clase */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Hr. de Clases
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.hora_clase}
            </dd>
        </div>
{/* endJSXhora_clase */}
{/* initJSXobservacion */}
            <div className="">
                <dt className="block font-medium text-black 2xl:text-sm text-xs">
                    Observacion
                </dt>
                <dd className="block font-medium text-black 2xl:text-sm text-xs" style={{ whiteSpace: 'pre-wrap' }}>
                    {atencion?.observacion}
                </dd>
            </div>
{/* endJSXobservacion */}
{/* initJSXestado */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Estado
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.estado}
            </dd>
        </div>
{/* endJSXestado */}
{/* initJSXasesor */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Asesor
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.asesor?.name}
            </dd>
        </div>
{/* endJSXasesor */}
{/* initJSXdepartamento */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Departamento
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.departamento}
            </dd>
        </div>
{/* endJSXdepartamento */}
{/* initJSXcarreras */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Carrera
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.carreras?.nombre_carrera}
            </dd>
        </div>
{/* endJSXcarreras */}
{/* initJSXnombre_completo */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Nombre Completo
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {atencion?.nombre_completo}
            </dd>
        </div>
{/* endJSXnombre_completo */}
{/* fieldsDetail */}
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Último Editor
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {atencion?.last_user?.name}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Creado en
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {new Date(atencion?.createdAt).toLocaleString("es-ES")}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Actualizado en
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {new Date(atencion?.updatedAt).toLocaleString("es-ES")}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    );
}