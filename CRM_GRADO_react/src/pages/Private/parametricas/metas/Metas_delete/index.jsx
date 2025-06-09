import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "@/context/store";
import './Metas_delete.css';
import client from "@/api";
export default function Metas_delete() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [metas, set_metas] = useState({});
    const populate = [
        //initJSunidad_academica
"unidad_academica",
//endJSunidad_academica
//foreigns
        "last_user",
    ];
    function deleteMetas() {
        store.setLoading(true);
        client.delete(`/metas/delete/${id}`).then(r => {
            store.showSuccess({ message: "Registro Eliminado", redirect: "/dashboard/metas/list", navigate });
        }).catch(e => {
            store.showErrors(["Error al Eliminar el Registro"]);
        }).finally(() => store.setLoading(false));
    }
    useEffect(() => {
        store.setLoading(true);
        if (id) {
            store.setLoading(true);
            client.post('/metas/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_metas(r?.data);
            }).finally(() => store.setLoading(false));
        }
    }, [])
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-50 px-4 py-3 rounded-lg border-gray-200 border sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900 uppercase">ELIMINAR Metas</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            to="../metas/list"
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
                        <button type="button" onClick={deleteMetas} className="text-lg inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                            Eliminar Metas
                        </button>
                    </div>
                    <dl className=" grid 2xl:grid-cols-5 sm:grid-cols-4 grid-cols-1 2xl:gap-4 sm:gap-2 gap-1">
                        {/* initJSXunidad_academica */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Unidad Academica
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {metas?.unidad_academica?.nombre_unidad_academica}
            </dd>
        </div>
{/* endJSXunidad_academica */}
{/* initJSXgestion */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Gestion
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {metas?.gestion}
            </dd>
        </div>
{/* endJSXgestion */}
{/* initJSXmeta */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Meta cantidad de inscritos
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {metas?.meta}
            </dd>
        </div>
{/* endJSXmeta */}
{/* initJSXmes_gestion */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Mes
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {metas?.mes_gestion}
            </dd>
        </div>
{/* endJSXmes_gestion */}
{/* initJSXcantidad_atendidos_plataforma */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Cantidad de Atendidos en el mes
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {metas?.cantidad_atendidos_plataforma}
            </dd>
        </div>
{/* endJSXcantidad_atendidos_plataforma */}
{/* initJSXcantidad_ganados_mes */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Cantidad de ganados mes
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {metas?.cantidad_ganados_mes}
            </dd>
        </div>
{/* endJSXcantidad_ganados_mes */}
{/* initJSXcantidad_perdidos_mes */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Cantidad de perdidos mes
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {metas?.cantidad_perdidos_mes}
            </dd>
        </div>
{/* endJSXcantidad_perdidos_mes */}
{/* initJSXindicador_atencion */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Indicador de atencion
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {metas?.indicador_atencion}
            </dd>
        </div>
{/* endJSXindicador_atencion */}
{/* initJSXfecha_registro */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Fecha
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {new Date(metas?.fecha_registro).toLocaleString("es-ES")}
            </dd>
        </div>
{/* endJSXfecha_registro */}
{/* fieldsDetail */}
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Último Editor
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {metas?.last_user?.name}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Creado en
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {new Date(metas?.createdAt).toLocaleString("es-ES")}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Actualizado en
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {new Date(metas?.updatedAt).toLocaleString("es-ES")}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    );
}