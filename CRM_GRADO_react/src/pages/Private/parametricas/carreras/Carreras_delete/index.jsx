import Icon from "@/components/Icon";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "@/context/store";
import './Carreras_delete.css';
import client from "@/api";
export default function Carreras_delete() {
    //essentials
    const { id } = useParams();
    const store = useContext(StoreContext);
    const navigate = useNavigate();
    const [carreras, set_carreras] = useState({});
    const populate = [
        //initJSunidad_academica
"unidad_academica",
//endJSunidad_academica
//foreigns
        "last_user",
    ];
    function deleteCarreras() {
        store.setLoading(true);
        client.delete(`/carreras/delete/${id}`).then(r => {
            store.showSuccess({ message: "Registro Eliminado", redirect: "/dashboard/carreras/list", navigate });
        }).catch(e => {
            store.showErrors(["Error al Eliminar el Registro"]);
        }).finally(() => store.setLoading(false));
    }
    useEffect(() => {
        store.setLoading(true);
        if (id) {
            store.setLoading(true);
            client.post('/carreras/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_carreras(r?.data);
            }).finally(() => store.setLoading(false));
        }
    }, [])
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-50 px-4 py-3 rounded-lg border-gray-200 border sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900 uppercase">ELIMINAR Carreras</h1>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            to="../carreras/list"
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
                        <button type="button" onClick={deleteCarreras} className="text-lg inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                            Eliminar Carreras
                        </button>
                    </div>
                    <dl className=" grid 2xl:grid-cols-5 sm:grid-cols-4 grid-cols-1 2xl:gap-4 sm:gap-2 gap-1">
                        {/* initJSXunidad_academica */}
        <div className=" ">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Unidad Academica
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {carreras?.unidad_academica?.nombre_unidad_academica}
            </dd>
        </div>
{/* endJSXunidad_academica */}
{/* initJSXnombre_carrera */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Carrera
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {carreras?.nombre_carrera}
            </dd>
        </div>
{/* endJSXnombre_carrera */}
{/* initJSXid_saga_carrera */}
        <div className="">
            <dt className="block font-medium text-black 2xl:text-sm text-xs">
                Id Saga
            </dt>
            <dd className="block font-medium text-black 2xl:text-sm text-xs">
                {carreras?.id_saga_carrera}
            </dd>
        </div>
{/* endJSXid_saga_carrera */}
{/* fieldsDetail */}
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Último Editor
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {carreras?.last_user?.name}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Creado en
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {new Date(carreras?.createdAt).toLocaleString("es-ES")}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="block text-sm font-medium text-gray-700">
                                Actualizado en
                            </dt>
                            <dd className="mt-1 block w-full shadow-sm sm:text-sm border-y-400 text-blue-800 rounded-md">
                                {new Date(carreras?.updatedAt).toLocaleString("es-ES")}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    );
}