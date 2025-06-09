import { useContext, useEffect, useState } from "react";
import Icon from '@/components/Icon'
import { Link } from "react-router-dom";
import OptionsRUD from "@/components/OptionsRUD";
import SearchBar from "@/components/SearchBar";
import './Atencion_list.css';
import { StoreContext } from "@/context/store";
import EntriesSelect from "@/components/EntriesSelect";
import client from "@/api";
const headers = [
    //initJSfecha_atencion
{ name: "Fecha de Atencion", field: "fecha_atencion" },
//endJSfecha_atencion
//initJSnombres
{ name: "Nombres", field: "nombres" },
//endJSnombres
//initJSapellido_paterno
{ name: "Apellido Paterno", field: "apellido_paterno" },
//endJSapellido_paterno
//initJSapellido_materno
{ name: "Apellido Materno", field: "apellido_materno" },
//endJSapellido_materno
//initJScarnet_identidad
{ name: "Carnet de Identidad", field: "carnet_identidad" },
//endJScarnet_identidad
//initJSnumero_celular
{ name: "Numero de celular", field: "numero_celular" },
//endJSnumero_celular
//initJSnombre_tutor
{ name: "Nombres Tutor", field: "nombre_tutor" },
//endJSnombre_tutor
//initJSunidad_academica
{ name: "Unidad Academica", field: "unidad_academica" },
//endJSunidad_academica
//initJSotras_carreras
{ name: "Otras Carreras", field: "otras_carreras" },
//endJSotras_carreras
//initJSgestion_bachiller
{ name: "Gestion Bachiller", field: "gestion_bachiller" },
//endJSgestion_bachiller
//initJScolegio
{ name: "Colegio", field: "colegio" },
//endJScolegio
//initJStipo_colegio
{ name: "Tipo Colegio", field: "tipo_colegio" },
//endJStipo_colegio
//initJSprovincia
{ name: "Provincia", field: "provincia" },
//endJSprovincia
//initJScomo_te_enteraste_emi
{ name: "¿Como te Enteraste de Nosotros?", field: "como_te_enteraste_emi" },
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
{ name: "¿Otro medio de captacion?", field: "otro_metodo_capatacion" },
//endJSotro_metodo_capatacion
//initJShora_clase
{ name: "Hr. de Clases", field: "hora_clase" },
//endJShora_clase
//initJSestado
{ name: "Estado", field: "estado" },
//endJSestado
//initJSasesor
{ name: "Asesor", field: "asesor" },
//endJSasesor
//initJSdepartamento
{ name: "Departamento", field: "departamento" },
//endJSdepartamento
//initJScarreras
{ name: "Carrera", field: "carreras" },
//endJScarreras
//initJSnombre_completo
{ name: "Nombre Completo", field: "nombre_completo" },
//endJSnombre_completo
//headers
];
function Atencion_list() {
    const store = useContext(StoreContext);
    const [docForPage, setDocForPage] = useState(10);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [sort, setSort] = useState(null);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [find, setFind] = useState({});
    const [permissions, set_permissions] = useState({});
    const select = [];
    const populate = [
        "last_user",
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
    ];
    function getList(query) {
        store.setLoading(true);
        client.post('/atencion/list', {
            query: {
                ...query,
                populate,
                //select
            }
        }).then(r => {
            setList(r.data.list);
            if (r?.data?.count) {
                setTotal(r.data.count);
                setMaxPage(Math.ceil(r.data.count / docForPage));
            }
        }).finally(() => {
            store.setLoading(false);
        });
    }
    function handleDocPerPageChange(e) {
        setDocForPage(Number(e));
        setPage(1);
        getList({
            page: 1,
            limit: Number(e),
            search: find,
            sort: sort,
            count: true
        });
    };
    function sortColumn(field) {
        var value = sort?.[field];
        if (!value) value = 1;
        else {
            value = value == 1 ? -1 : 1;
        }
        var newSort = {};
        newSort[field] = value;
        setSort({ ...newSort });
        setPage(1);
        getList({
            page: 1,
            limit: docForPage,
            search: find,
            sort: newSort,
            count: true
        });
    }
    function navPage(next) {
        if (next) {
            if (page < maxPage) {
                getList({
                    search: find,
                    page: page + 1,
                    limit: docForPage,
                    sort: sort,
                    count: false
                });
                setPage(page + 1);
            }
        } else {
            if (page > 1) {
                getList({
                    search: find,
                    page: page - 1,
                    limit: docForPage,
                    sort: sort,
                    count: false
                });
                setPage(page - 1);
            }
        }
    }
    function search(obj) {
        setFind(obj);
        setPage(1);
        getList({
            page: 1,
            limit: docForPage,
            search: obj,
            count: true
        });
    }
    useEffect(() => {
        var temp = {};
        temp.read = store.checkPermissions(["read_atencion"]);
        temp.report = store.checkPermissions(["report_atencion"]);
        temp.update = store.checkPermissions(["update_atencion"]);
        temp.delete = store.checkPermissions(["delete_atencion"]);
        set_permissions(temp);
        getList({
            page: page,
            limit: docForPage,
            count: true
        });
    }, [])
    return (
        <>
            <div className="px-2  py-1 sm:py-2 xl:py-4 ">
                <div className="bg-gray-50 px-1  py-0.5 sm:py-0.5 2xl:py-1  sm:flex flex flex-wrap-reverse sm:items-center w-full">
                    <div className="sm:flex-auto">
                        <h1 className="text-balance 2xl:text-xl sm:text-lg text-sm  mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">Lista de Atencion</h1>
                    </div>
                    <div className="ml-6 sm:ml-0 flex-none">
                        {store.checkPermissions(['create_atencion']) &&
                            <Link
                                to="../atencion/create"
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 2xl:px-4 lg:px-2  py-2 2xl:text-sm sm:text-xs text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                            >
                                <Icon name="PlusCircleIcon" className="2xl:h-6 2xl:w-6 sm:mr-4 mr-1 sm:h-5 sm:w-5 h-4 w-4" />
                                Añadir Atencion
                            </Link>
                        }
                    </div>
                </div>
                <div className="rounded-lg flow-root">
                    <div className="inline-block max-w-full min-w-full align-middle">
                        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowra">
                            <div className="flex items-center">
                                {store.checkPermissions(['report_atencion']) &&
                                    <Link
                                        to="../atencion/report"
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 2xl:px-4 lg:px-2  py-2 2xl:text-sm sm:text-xs text-xs font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                                    >
                                        <Icon name="PrinterIcon" className="-ml-0.5 2xl:h-6 2xl:w-6 s h-4 w-4" aria-hidden="true" />
                                        Reporte
                                    </Link>
                                }
                                <div className="ml-1">
                                    <EntriesSelect options={[
                                        { _id: 10, name: "10 / Pág." },
                                        { _id: 50, name: "50 / Pág." },
                                        { _id: 100, name: "100 / Pág." },
                                        { _id: 200, name: "200 / Pág." },
                                        { _id: 500, name: "500 / Pág." },
                                    ]} value={docForPage} setValue={handleDocPerPageChange} className="-mt-0" />
                                </div>
                            </div>
                            <div>
                                <SearchBar
                                    fields={[
                                        //initJSfecha_atencion
{ id: "fecha_atencion", name: "Fecha de Atencion", type: "datetime-local" },
//endJSfecha_atencion
//initJSnombres
{ id: "nombres", name: "Nombres", type: "string" },
//endJSnombres
//initJSapellido_paterno
{ id: "apellido_paterno", name: "Apellido Paterno", type: "string" },
//endJSapellido_paterno
//initJSapellido_materno
{ id: "apellido_materno", name: "Apellido Materno", type: "string" },
//endJSapellido_materno
//initJScarnet_identidad
{ id: "carnet_identidad", name: "Carnet de Identidad", type: "string" },
//endJScarnet_identidad
//initJSnumero_celular
{ id: "numero_celular", name: "Numero de celular", type: "number" },
//endJSnumero_celular
//initJSnombre_tutor
{ id: "nombre_tutor", name: "Nombres Tutor", type: "string" },
//endJSnombre_tutor
//initJSapellido_materno_tutor
{ id: "apellido_materno_tutor", name: "Apellido Materno Tutor", type: "string" },
//endJSapellido_materno_tutor
//initJSapellido_paterno_tutor
{ id: "apellido_paterno_tutor", name: "Apellido Paterno Tutor", type: "string" },
//endJSapellido_paterno_tutor
//initJSnumero_celular_tutor
{ id: "numero_celular_tutor", name: "Numero de celular Tutor", type: "number" },
//endJSnumero_celular_tutor
//initJSunidad_academica
{ id: "unidad_academica", name: "Unidad Academica", type: "string" },
//endJSunidad_academica
//initJSotras_carreras
{ id: "otras_carreras", name: "Otras Carreras", type: "string" },
//endJSotras_carreras
//initJSgestion_bachiller
{ id: "gestion_bachiller", name: "Gestion Bachiller", type: "number" },
//endJSgestion_bachiller
//initJScolegio
{ id: "colegio", name: "Colegio", type: "string" },
//endJScolegio
//initJStipo_colegio
{ id: "tipo_colegio", name: "Tipo Colegio", type: "string" },
//endJStipo_colegio
//initJSprovincia
{ id: "provincia", name: "Provincia", type: "string" },
//endJSprovincia
//initJScomo_te_enteraste_emi
{ id: "como_te_enteraste_emi", name: "¿Como te Enteraste de Nosotros?", type: "string" },
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
{ id: "otro_metodo_capatacion", name: "¿Otro medio de captacion?", type: "string" },
//endJSotro_metodo_capatacion
//initJShora_clase
{ id: "hora_clase", name: "Hr. de Clases", type: "string" },
//endJShora_clase
//initJSobservacion
{ id: "observacion", name: "Observacion", type: "string" },
//endJSobservacion
//initJSestado
{ id: "estado", name: "Estado", type: "string" },
//endJSestado
//initJSasesor
{ id: "asesor", name: "Asesor", type: "string" },
//endJSasesor
//initJSdepartamento
{ id: "departamento", name: "Departamento", type: "string" },
//endJSdepartamento
//initJScarreras
{ id: "carreras", name: "Carrera", type: "string" },
//endJScarreras
//initJSnombre_completo
{ id: "nombre_completo", name: "Nombre Completo", type: "string" },
//endJSnombre_completo
//fieldsSearch
                                        { id: "last_user", name: "Ultimo Editor", type: "string" },
                                        { id: "createdAt", name: "Creado en", type: "datetime-local" },
                                        { id: "updatedAt", name: "Actualizado en", type: "datetime-local" },
                                    ]}
                                    search={(e) => search(e)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg w-full">
                            <table className="table-fixed divide-y-2 divide-gray-300 min-w-full align-middle">
                                <thead className="bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-1 sm:pr-2 2xl:pr-3 text-left 2xl:text-sm text-xs font-semibold text-gray-900 sm:pl-6">
                                            Nro1
                                        </th>
                                        {headers.map(h =>
                                            <th key={h.name} className="whitespace-nowrap pr-1 sm:pr-2 2xl:pr-3 2xl:text-sm text-xs font-semibold text-gray-900 text-balance">
                                                <button className="flex" onClick={() => sortColumn(h.field)}>
                                                    {h.name}
                                                    {!sort?.[h.field] && <Icon name="ArrowsUpDownIcon" className="h-4" />}
                                                    {sort?.[h.field] == 1 && <Icon name="ArrowUpIcon" className="h-4" />}
                                                    {sort?.[h.field] == -1 && <Icon name="ArrowDownIcon" className="h-4" />}
                                                </button>
                                            </th>
                                        )}
                                        <th scope="col" className="w-10 relative py-3.5">
                                            <span className="sr-only">Opciones</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white 2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1">
                                    {(list && list.length) ?
                                        list.map((atencion, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3  2xl:text-sm text-xs font-medium text-gray-900 sm:pl-6 text-balance">
                                                    {(index + 1) + ((page - 1) * docForPage)}
                                                </td>
                                                {/* initJSXfecha_atencion */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{new Date(atencion?.fecha_atencion).toLocaleString("es-ES")}</td>
{/* endJSXfecha_atencion */}
{/* initJSXnombres */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.nombres}</td>
{/* endJSXnombres */}
{/* initJSXapellido_paterno */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.apellido_paterno}</td>
{/* endJSXapellido_paterno */}
{/* initJSXapellido_materno */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.apellido_materno}</td>
{/* endJSXapellido_materno */}
{/* initJSXcarnet_identidad */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.carnet_identidad}</td>
{/* endJSXcarnet_identidad */}
{/* initJSXnumero_celular */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.numero_celular}</td>
{/* endJSXnumero_celular */}
{/* initJSXnombre_tutor */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.nombre_tutor}</td>
{/* endJSXnombre_tutor */}
{/* initJSXunidad_academica */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.unidad_academica?.nombre_unidad_academica}</td>
{/* endJSXunidad_academica */}
{/* initJSXotras_carreras */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.otras_carreras}</td>
{/* endJSXotras_carreras */}
{/* initJSXgestion_bachiller */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.gestion_bachiller}</td>
{/* endJSXgestion_bachiller */}
{/* initJSXcolegio */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.colegio}</td>
{/* endJSXcolegio */}
{/* initJSXtipo_colegio */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.tipo_colegio}</td>
{/* endJSXtipo_colegio */}
{/* initJSXprovincia */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.provincia}</td>
{/* endJSXprovincia */}
{/* initJSXcomo_te_enteraste_emi */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.como_te_enteraste_emi}</td>
{/* endJSXcomo_te_enteraste_emi */}
{/* initJSXotro_metodo_capatacion */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.otro_metodo_capatacion}</td>
{/* endJSXotro_metodo_capatacion */}
{/* initJSXhora_clase */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.hora_clase}</td>
{/* endJSXhora_clase */}
{/* initJSXestado */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.estado}</td>
{/* endJSXestado */}
{/* initJSXasesor */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.asesor?.name}</td>
{/* endJSXasesor */}
{/* initJSXdepartamento */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.departamento}</td>
{/* endJSXdepartamento */}
{/* initJSXcarreras */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.carreras?.nombre_carrera}</td>
{/* endJSXcarreras */}
{/* initJSXnombre_completo */}
<td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.nombre_completo}</td>
{/* endJSXnombre_completo */}
{/*fields*/}
                                                <td className="absolute py-4 pl-3 pr-4 text-sm font-medium">
                                                    <OptionsRUD id={atencion._id} model="atencion" permissions={permissions} />
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="py-4 text-center" colSpan={headers.length + 2}><h1>No existen Registros</h1></td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <nav
                                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                                aria-label="Pagination"
                            >
                                <div className="hidden sm:block">
                                    <p className="text-sm text-gray-700">
                                        Mostrando <span className="font-medium">{(page - 1) * docForPage + 1}</span> a <span className="font-medium">{page == maxPage ? total : page * docForPage}</span> de{' '}
                                        <span className="font-medium">{total}</span> resultados
                                    </p>
                                </div>
                                <div className="flex flex-1 justify-between sm:justify-end">
                                    <button
                                        onClick={() => navPage(false)}
                                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 2xl:text-sm text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Anterior
                                    </button>
                                    <button
                                        onClick={() => navPage(true)}
                                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2  2xl:text-sm text-xs font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Atencion_list;