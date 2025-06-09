import React, { useState, useEffect, useRef, useContext } from 'react';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
import logo from '@/assets/logo.png';
import client from '@/api';
import { StoreContext } from '@/context/store';
import MultiCheckbox from '@/components/Multicheckbox';
import Select from '@/components/Select1';
import Icon from '@/components/Icon';
import './report.css';
import SearchBar from '@/components/SearchBar';
import { Link } from 'react-router-dom';
function Importacion_de_datos_report() {
    const store = useContext(StoreContext);
    const htmlReport = useRef(null);
    const [rangoTiempo, setRangoTiempo] = useState('hoy');
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();
    const [camposSeleccionados, setCamposSeleccionados] = useState([
        //initJSunidad_academica_importacion
"unidad_academica_importacion",
//endJSunidad_academica_importacion
//initJSfecha_importacion
"fecha_importacion",
//endJSfecha_importacion
//initJSnombre_importado
"nombre_importado",
//endJSnombre_importado
//initJSapellido_paterno_importado
"apellido_paterno_importado",
//endJSapellido_paterno_importado
//initJSapellido_materno_importado
"apellido_materno_importado",
//endJSapellido_materno_importado
//initJScarnet_identidad_importacion
"carnet_identidad_importacion",
//endJScarnet_identidad_importacion
//initJSnumero_celular_importacion
"numero_celular_importacion",
//endJSnumero_celular_importacion
//camposDefault
    ]);
    const [list, setList] = useState([]);
    const [find, setFind] = useState({});
    const [total, setTotal] = useState(0);
    const populate = [
        //initJSunidad_academica_importacion
"unidad_academica_importacion",
//endJSunidad_academica_importacion
//foreigns
        "last_user",
    ];
    const optionsRango = [
        { _id: "hoy", name: "Hoy" },
        { _id: "ultimaSemana", name: "Última Semana" },
        { _id: "ultimoMes", name: "Último Mes" },
        { _id: "personalizado", name: "Rango Personalizado" },
    ];
    const campos = [
        //initJSunidad_academica_importacion
{ _id: "unidad_academica_importacion", name: "Unidad Academica" },
//endJSunidad_academica_importacion
//initJSfecha_importacion
{ _id: "fecha_importacion", name: "Fecha de Importacion" },
//endJSfecha_importacion
//initJSnombre_importado
{ _id: "nombre_importado", name: "Nombres" },
//endJSnombre_importado
//initJSapellido_paterno_importado
{ _id: "apellido_paterno_importado", name: "Apellido Paterno" },
//endJSapellido_paterno_importado
//initJSapellido_materno_importado
{ _id: "apellido_materno_importado", name: "Apellido Materno" },
//endJSapellido_materno_importado
//initJScarnet_identidad_importacion
{ _id: "carnet_identidad_importacion", name: "Carnet de Identidad" },
//endJScarnet_identidad_importacion
//initJSnumero_celular_importacion
{ _id: "numero_celular_importacion", name: "Numero de celular" },
//endJSnumero_celular_importacion
//initJSnombre_tutor_impotado
{ _id: "nombre_tutor_impotado", name: "Nombre de tutor" },
//endJSnombre_tutor_impotado
//initJSapellido_paterno_tutor_importado
{ _id: "apellido_paterno_tutor_importado", name: "Apellido Paterno Tutor" },
//endJSapellido_paterno_tutor_importado
//initJSapellido_materno_tutor_importado
{ _id: "apellido_materno_tutor_importado", name: "Apellido Materno Tutor" },
//endJSapellido_materno_tutor_importado
//initJScelular_tutor_importado
{ _id: "celular_tutor_importado", name: "Celular tutor" },
//endJScelular_tutor_importado
//initJScarrera_interes
{ _id: "carrera_interes", name: "Carrera de Interes" },
//endJScarrera_interes
//initJSgestion_bachiller_importado
{ _id: "gestion_bachiller_importado", name: "Gestion Bachiller" },
//endJSgestion_bachiller_importado
//initJScolegio_importado
{ _id: "colegio_importado", name: "Colegio" },
//endJScolegio_importado
//initJStipo_colegio_importado
{ _id: "tipo_colegio_importado", name: "Tipo Colegio" },
//endJStipo_colegio_importado
//initJSdepartamento_importado
{ _id: "departamento_importado", name: "Departamento" },
//endJSdepartamento_importado
//initJSprovincia_importado
{ _id: "provincia_importado", name: "Provincia" },
//endJSprovincia_importado
//initJShorario_clases_importado
{ _id: "horario_clases_importado", name: "Hr. de Clases" },
//endJShorario_clases_importado
//initJStipo_visita_importada
{ _id: "tipo_visita_importada", name: "tipo visita" },
//endJStipo_visita_importada
//camposTabla
        { _id: "last_user", name: "Ultimo Editor" },
        { _id: "createdAt", name: "Fecha de Creación" },
        { _id: "updatedAt", name: "Fecha de Actualización" },
    ];
    function getList(query) {
        store.setLoading(true);
        client.post('/importacion_de_datos/list', {
            query: {
                ...query,
                populate
            }
        }).then(r => {
            setList(r.data.list);
            setTotal(r.data.count);
        }).finally(() => {
            store.setLoading(false);
        });
    }
    function calcularRangoFechas() {
        let fechaI, fechaF;
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Establecer a medianoche
        switch (rangoTiempo) {
            case 'hoy':
                fechaI = new Date(hoy);
                fechaF = new Date(hoy);
                break;
            case 'ultimaSemana':
                fechaI = new Date(hoy);
                fechaI.setDate(hoy.getDate() - 7);
                fechaF = new Date(hoy);
                break;
            case 'ultimoMes':
                fechaI = new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate());
                fechaF = new Date(hoy);
                break;
            case 'personalizado':
                fechaI = new Date(fechaInicio);
                fechaF = new Date(fechaFin);
                break;
            default:
                // Manejar caso por defecto o error
                break;
        }
        fechaF.setHours(23, 59, 59, 999);
        return { fechaI, fechaF };
    }
    function generarReport(type) {
        if (type == "PDF") {
            //downloadPDF();
            window.print();
        } else if (type == "EXCEL") {
            downloadEXCEL();
        }
    }
    function downloadPDF() {
        var doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'letter'
        });
        var divContents = htmlReport.current.innerHTML;
        doc.html(divContents, {
            callback: function (doc) {
                const fechaActual = new Date();
                const nombreArchivo = `Reporte_Importacion_de_datos_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}.pdf`;
                doc.save(nombreArchivo);
            },
            x: 15,
            y: 15,
            autoPaging: 'text',
            width: doc.internal.pageSize.getWidth() - 50,
            windowWidth: 650
        });
        setTimeout(() => {
            store.setLoading(false);
            modal.current?.dismiss();
        }, 1000);
    }
    function downloadEXCEL() {
        var dates = [];
        var headersRow = ['Nro'];
        campos.forEach(c => {
            if (camposSeleccionados.includes(c._id)) headersRow.push(c.name);
        });
        dates.push(headersRow);
        list.forEach((i, index) => {
            const r = {};
            try {
                //initJSunidad_academica_importacion
if (camposSeleccionados.includes("unidad_academica_importacion")) r.unidad_academica_importacion = i?.unidad_academica_importacion?.nombre_unidad_academica;;
//endJSunidad_academica_importacion
//initJSfecha_importacion
if (camposSeleccionados.includes("fecha_importacion")) r.fecha_importacion = new Date(i?.fecha_importacion).toLocaleString("es-ES");;
//endJSfecha_importacion
//initJSnombre_importado
if (camposSeleccionados.includes("nombre_importado")) r.nombre_importado = i?.nombre_importado;
//endJSnombre_importado
//initJSapellido_paterno_importado
if (camposSeleccionados.includes("apellido_paterno_importado")) r.apellido_paterno_importado = i?.apellido_paterno_importado;
//endJSapellido_paterno_importado
//initJSapellido_materno_importado
if (camposSeleccionados.includes("apellido_materno_importado")) r.apellido_materno_importado = i?.apellido_materno_importado;
//endJSapellido_materno_importado
//initJScarnet_identidad_importacion
if (camposSeleccionados.includes("carnet_identidad_importacion")) r.carnet_identidad_importacion = i?.carnet_identidad_importacion;
//endJScarnet_identidad_importacion
//initJSnumero_celular_importacion
if (camposSeleccionados.includes("numero_celular_importacion")) r.numero_celular_importacion = i?.numero_celular_importacion;
//endJSnumero_celular_importacion
//initJSnombre_tutor_impotado
if (camposSeleccionados.includes("nombre_tutor_impotado")) r.nombre_tutor_impotado = i?.nombre_tutor_impotado;
//endJSnombre_tutor_impotado
//initJSapellido_paterno_tutor_importado
if (camposSeleccionados.includes("apellido_paterno_tutor_importado")) r.apellido_paterno_tutor_importado = i?.apellido_paterno_tutor_importado;
//endJSapellido_paterno_tutor_importado
//initJSapellido_materno_tutor_importado
if (camposSeleccionados.includes("apellido_materno_tutor_importado")) r.apellido_materno_tutor_importado = i?.apellido_materno_tutor_importado;
//endJSapellido_materno_tutor_importado
//initJScelular_tutor_importado
if (camposSeleccionados.includes("celular_tutor_importado")) r.celular_tutor_importado = i?.celular_tutor_importado;
//endJScelular_tutor_importado
//initJScarrera_interes
if (camposSeleccionados.includes("carrera_interes")) r.carrera_interes = i?.carrera_interes;
//endJScarrera_interes
//initJSgestion_bachiller_importado
if (camposSeleccionados.includes("gestion_bachiller_importado")) r.gestion_bachiller_importado = i?.gestion_bachiller_importado;
//endJSgestion_bachiller_importado
//initJScolegio_importado
if (camposSeleccionados.includes("colegio_importado")) r.colegio_importado = i?.colegio_importado;
//endJScolegio_importado
//initJStipo_colegio_importado
if (camposSeleccionados.includes("tipo_colegio_importado")) r.tipo_colegio_importado = i?.tipo_colegio_importado;
//endJStipo_colegio_importado
//initJSdepartamento_importado
if (camposSeleccionados.includes("departamento_importado")) r.departamento_importado = i?.departamento_importado;
//endJSdepartamento_importado
//initJSprovincia_importado
if (camposSeleccionados.includes("provincia_importado")) r.provincia_importado = i?.provincia_importado;
//endJSprovincia_importado
//initJShorario_clases_importado
if (camposSeleccionados.includes("horario_clases_importado")) r.horario_clases_importado = i?.horario_clases_importado;
//endJShorario_clases_importado
//initJStipo_visita_importada
if (camposSeleccionados.includes("tipo_visita_importada")) r.tipo_visita_importada = i?.tipo_visita_importada;
//endJStipo_visita_importada
//camposExcel
                if (camposSeleccionados.includes("last_user")) r.last_user = i?.last_user?.name;
                if (camposSeleccionados.includes("createdAt")) r.createdAt = new Date(i?.createdAt).toLocaleString("es-ES");
                if (camposSeleccionados.includes("updatedAt")) r.updatedAt = new Date(i?.updatedAt).toLocaleString("es-ES");
                const row = [index + 1];
                campos.forEach(c => {
                    if (camposSeleccionados.includes(c._id)) row.push(r[c._id]);
                });
                dates.push(row);
            } catch (e) {
                console.log(e);
            }
        });
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(dates);
        XLSX.utils.book_append_sheet(workbook, worksheet, " Datos");
        const fechaActual = new Date();
        const nombreArchivo = `Reporte_Importacion_de_datos_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}`;
        XLSX.writeFile(workbook, `${nombreArchivo}.xlsx`);
        setTimeout(() => {
            store.setLoading(false);
        }, 1000);
    }
    function search(obj) {
        var rangoF = calcularRangoFechas();
        setFind(obj);
        getList({
            search: obj,
            find: {
                createdAt: {
                    $gte: rangoF.fechaI,
                    $lte: rangoF.fechaF
                }
            },
            count: true
        });
    }
    useEffect(() => {
        var rangoF = calcularRangoFechas();
        getList({
            search: find,
            find: {
                createdAt: {
                    $gte: rangoF.fechaI,
                    $lte: rangoF.fechaF
                }
            },
            count: true
        });
    }, [rangoTiempo, fechaInicio, fechaFin]);
    return (
        <div>
            <div className="px-2 py-1 sm:py-2 xl:py-4">
                <div className="bg-gray-50 px-1 py-0.5 sm:py-0.5 2xl:py-1 sm:flex flex flex-wrap-reverse sm:items-center w-full">
                    <div className="sm:flex-auto">
                        <h1 className="text-balance 2xl:text-xl sm:text-lg text-sm mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">Reporte de Importacion de datos</h1>
                    </div>
                    <div className="mt-0 sm:ml-16 ml-4 sm:flex-none">
                        <Link
                            to="../importacion_de_datos/list"
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
                        >
                            <Icon name="ArrowLeftCircleIcon" className="2xl:h-6 2xl:w-6 sm:mr-4 mr-1 sm:h-5 sm:w-5 h-4 w-4" />
                            Atras
                        </Link>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between sm:gap-x-6 gap-x-2 sm:gap-y-4 sm:py-2 sm:flex-nowra">
                    <div className="flex items-center">
                        <Select label="Rango de Tiempo" className="ml-2" options={optionsRango} value={rangoTiempo} setValue={setRangoTiempo} />
                    </div>
                    <div className="shadow-sm sm:px-4 sm:text-sm text-xs mt-4 sm:mt-0">
                        {rangoTiempo === 'personalizado' && (
                            <div className="flex gap-x-2">
                                <div className="w-1/2">
                                    <label htmlFor="name" className="block sm:text-sm text-xs font-medium text-gray-800">
                                        Desde:
                                    </label>
                                    <input required type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} className="sm:text-sm text-xs focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm border-gray-300 rounded-md" />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="name" className="block sm:text-sm text-xs font-medium text-gray-800">
                                        Hasta:
                                    </label>
                                    <input required type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} className="sm:text-sm text-xs focus:ring-blue-300 focus:border-blue-300 block w-full shadow-sm border-gray-300 rounded-md" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <hr className="my-2"></hr>
                <MultiCheckbox label="Columnas Visibles" values={camposSeleccionados} setValues={setCamposSeleccionados} options={campos} />
                <div className="mt-2 sm:mt-0 flex flex-wrap items-center justify-between sm:gap-x-6 sm:gap-y-4 sm:py-2 sm:flex-nowra">
                    <div className="flex items-center">
                        <SearchBar
                            fields={[
                                //initJSunidad_academica_importacion
{ id: "unidad_academica_importacion", name: "Unidad Academica", type: "string" },
//endJSunidad_academica_importacion//search
//initJSfecha_importacion
{ id: "fecha_importacion", name: "Fecha de Importacion", type: "datetime-local" },
//endJSfecha_importacion//search
//initJSnombre_importado
{ id: "nombre_importado", name: "Nombres", type: "string" },
//endJSnombre_importado//search
//initJSapellido_paterno_importado
{ id: "apellido_paterno_importado", name: "Apellido Paterno", type: "string" },
//endJSapellido_paterno_importado//search
//initJSapellido_materno_importado
{ id: "apellido_materno_importado", name: "Apellido Materno", type: "string" },
//endJSapellido_materno_importado//search
//initJScarnet_identidad_importacion
{ id: "carnet_identidad_importacion", name: "Carnet de Identidad", type: "string" },
//endJScarnet_identidad_importacion//search
//initJSnumero_celular_importacion
{ id: "numero_celular_importacion", name: "Numero de celular", type: "number" },
//endJSnumero_celular_importacion//search
//initJSnombre_tutor_impotado
{ id: "nombre_tutor_impotado", name: "Nombre de tutor", type: "string" },
//endJSnombre_tutor_impotado//search
//initJSapellido_paterno_tutor_importado
{ id: "apellido_paterno_tutor_importado", name: "Apellido Paterno Tutor", type: "string" },
//endJSapellido_paterno_tutor_importado//search
//initJSapellido_materno_tutor_importado
{ id: "apellido_materno_tutor_importado", name: "Apellido Materno Tutor", type: "string" },
//endJSapellido_materno_tutor_importado//search
//initJScelular_tutor_importado
{ id: "celular_tutor_importado", name: "Celular tutor", type: "string" },
//endJScelular_tutor_importado//search
//initJScarrera_interes
{ id: "carrera_interes", name: "Carrera de Interes", type: "string" },
//endJScarrera_interes//search
//initJSgestion_bachiller_importado
{ id: "gestion_bachiller_importado", name: "Gestion Bachiller", type: "string" },
//endJSgestion_bachiller_importado//search
//initJScolegio_importado
{ id: "colegio_importado", name: "Colegio", type: "string" },
//endJScolegio_importado//search
//initJStipo_colegio_importado
{ id: "tipo_colegio_importado", name: "Tipo Colegio", type: "string" },
//endJStipo_colegio_importado//search
//initJSdepartamento_importado
{ id: "departamento_importado", name: "Departamento", type: "string" },
//endJSdepartamento_importado//search
//initJSprovincia_importado
{ id: "provincia_importado", name: "Provincia", type: "string" },
//endJSprovincia_importado//search
//initJShorario_clases_importado
{ id: "horario_clases_importado", name: "Hr. de Clases", type: "string" },
//endJShorario_clases_importado//search
//initJStipo_visita_importada
{ id: "tipo_visita_importada", name: "tipo visita", type: "string" },
//endJStipo_visita_importada//search
//fieldsSearch
                                { id: "last_user", name: "Ultimo Editor", type: "string" },
                                { id: "createdAt", name: "Creado en", type: "datetime-local" },
                                { id: "updatedAt", name: "Actualizado en", type: "datetime-local" },
                            ]}
                            search={(e) => search(e)}
                        />
                    </div>
                    <div className="shadow-sm sm:px-2 px-4">
                        <div className="justify-end">
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="inline-flex mx-2 mt-2 sm:mt-0 items-center sm:gap-x-1.5 gap-x-1 rounded-md bg-blue-600 px-3 py-2 sm:text-sm text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <Icon name="PrinterIcon" className="-ml-0.5 sm:h-5 sm:w-5 h-4 w-4" aria-hidden="true" />
                                Imprimir
                            </button>
                            <button
                                type="button"
                                onClick={() => generarReport("PDF")}
                                className="inline-flex mx-2 mt-2 sm:mt-0 items-center sm:gap-x-1.5 gap-x-1 rounded-md bg-orange-600 px-3 py-2 sm:text-sm text-xs font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                <Icon name="DocumentIcon" className="-ml-0.5 sm:h-5 sm:w-5 h-4 w-4" aria-hidden="true" />
                                Guardar PDF
                            </button>
                            <button
                                type="button"
                                onClick={() => generarReport("EXCEL")}
                                className="inline-flex mx-2 mt-2 sm:mt-0 items-center sm:gap-x-1.5 gap-x-1 rounded-md bg-green-600 px-3 py-2 sm:text-sm text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                <Icon name="DocumentChartBarIcon" className="-ml-0.5 sm:h-5 sm:w-5 h-4 w-4" aria-hidden="true" />
                                Descargar EXCEL
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div ref={htmlReport} className="printable-page">
                        <div className="report-header">
                            <div scope="colgroup" className="flex relative isolate font-semibold border-b border-gray-200 bg-gray-50">
                                <img className="flex-none" src={logo} alt="Logo" />
                                <label className="grow text-xs sm:text-sm 2xl:text-lg py-4 uppercase">Reportes Importacion de datos</label>
                                <label className="text-xs 2xl:text-md mt-8">Fecha: {new Date(Date.now()).toLocaleDateString()}</label>
                            </div>
                        </div>
                        <img src={logo} alt="Marca de Agua" className="watermark" />
                        <div className="before-table">
                            {rangoTiempo === "personalizado" ? (
                                <div className="rango-tiempo">
                                    <p>
                                        <strong>Desde:</strong> {new Date(fechaInicio).toLocaleDateString()}
                                    </p>
                                    <p style={{ marginLeft: "10px" }}>
                                        <strong>Hasta:</strong> {new Date(fechaFin).toLocaleDateString()}
                                    </p>
                                </div>
                            ) : (
                                <div className="rango-tiempo sm:text-sm text-xs">
                                    <p>
                                        Registros de: <strong>{optionsRango.find((x) => x._id === rangoTiempo).name}</strong>
                                    </p>
                                </div>
                            )}
                            <p className="total-registros sm:text-sm text-xs">
                                <strong>{total}</strong>: Cantidad de Registros
                            </p>
                        </div>
                        <div className="invisible sm:visible sm:-mt-10 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg w-full max-w-screen">
                            <table className="table-fixed divide-y-2 divide-gray-300 min-w-full align-middle">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="w-1/12 py-3.5 pl-4 pr-1 sm:pr-2 2xl:pr-3 text-left 2xl:text-sm text-xs font-semibold text-gray-900 sm:pl-6">
                                            Nro
                                        </th>
                                        {campos.map((c, index) =>
                                            camposSeleccionados.includes(c._id) && (
                                                <th
                                                    className="py-1 pr-1 sm:pr-2 2xl:pr-3 text-left 2xl:text-sm text-xs font-semibold text-gray-900"
                                                    key={index}
                                                >
                                                    {c.name}
                                                </th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white 2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 text-left">
                                    {list.map((importacion_de_datos, index) => (
                                        <tr className="even:bg-gray-50" key={index}>
                                            <td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-lg text-xs text-gray-500">{index + 1}</td>
                                            {/* initJSXunidad_academica_importacion */}
{camposSeleccionados.includes("unidad_academica_importacion") && <td>{importacion_de_datos?.unidad_academica_importacion?.nombre_unidad_academica}</td>}
{/* endJSXunidad_academica_importacion */}
{/* initJSXfecha_importacion */}
{camposSeleccionados.includes("fecha_importacion") && <td>{new Date(importacion_de_datos?.fecha_importacion).toLocaleString("es-ES")}</td>}
{/* endJSXfecha_importacion */}
{/* initJSXnombre_importado */}
{camposSeleccionados.includes("nombre_importado") && <td>{importacion_de_datos?.nombre_importado}</td>}
{/* endJSXnombre_importado */}
{/* initJSXapellido_paterno_importado */}
{camposSeleccionados.includes("apellido_paterno_importado") && <td>{importacion_de_datos?.apellido_paterno_importado}</td>}
{/* endJSXapellido_paterno_importado */}
{/* initJSXapellido_materno_importado */}
{camposSeleccionados.includes("apellido_materno_importado") && <td>{importacion_de_datos?.apellido_materno_importado}</td>}
{/* endJSXapellido_materno_importado */}
{/* initJSXcarnet_identidad_importacion */}
{camposSeleccionados.includes("carnet_identidad_importacion") && <td>{importacion_de_datos?.carnet_identidad_importacion}</td>}
{/* endJSXcarnet_identidad_importacion */}
{/* initJSXnumero_celular_importacion */}
{camposSeleccionados.includes("numero_celular_importacion") && <td>{importacion_de_datos?.numero_celular_importacion}</td>}
{/* endJSXnumero_celular_importacion */}
{/* initJSXnombre_tutor_impotado */}
{camposSeleccionados.includes("nombre_tutor_impotado") && <td>{importacion_de_datos?.nombre_tutor_impotado}</td>}
{/* endJSXnombre_tutor_impotado */}
{/* initJSXapellido_paterno_tutor_importado */}
{camposSeleccionados.includes("apellido_paterno_tutor_importado") && <td>{importacion_de_datos?.apellido_paterno_tutor_importado}</td>}
{/* endJSXapellido_paterno_tutor_importado */}
{/* initJSXapellido_materno_tutor_importado */}
{camposSeleccionados.includes("apellido_materno_tutor_importado") && <td>{importacion_de_datos?.apellido_materno_tutor_importado}</td>}
{/* endJSXapellido_materno_tutor_importado */}
{/* initJSXcelular_tutor_importado */}
{camposSeleccionados.includes("celular_tutor_importado") && <td>{importacion_de_datos?.celular_tutor_importado}</td>}
{/* endJSXcelular_tutor_importado */}
{/* initJSXcarrera_interes */}
{camposSeleccionados.includes("carrera_interes") && <td>{importacion_de_datos?.carrera_interes}</td>}
{/* endJSXcarrera_interes */}
{/* initJSXgestion_bachiller_importado */}
{camposSeleccionados.includes("gestion_bachiller_importado") && <td>{importacion_de_datos?.gestion_bachiller_importado}</td>}
{/* endJSXgestion_bachiller_importado */}
{/* initJSXcolegio_importado */}
{camposSeleccionados.includes("colegio_importado") && <td>{importacion_de_datos?.colegio_importado}</td>}
{/* endJSXcolegio_importado */}
{/* initJSXtipo_colegio_importado */}
{camposSeleccionados.includes("tipo_colegio_importado") && <td>{importacion_de_datos?.tipo_colegio_importado}</td>}
{/* endJSXtipo_colegio_importado */}
{/* initJSXdepartamento_importado */}
{camposSeleccionados.includes("departamento_importado") && <td>{importacion_de_datos?.departamento_importado}</td>}
{/* endJSXdepartamento_importado */}
{/* initJSXprovincia_importado */}
{camposSeleccionados.includes("provincia_importado") && <td>{importacion_de_datos?.provincia_importado}</td>}
{/* endJSXprovincia_importado */}
{/* initJSXhorario_clases_importado */}
{camposSeleccionados.includes("horario_clases_importado") && <td>{importacion_de_datos?.horario_clases_importado}</td>}
{/* endJSXhorario_clases_importado */}
{/* initJSXtipo_visita_importada */}
{camposSeleccionados.includes("tipo_visita_importada") && <td>{importacion_de_datos?.tipo_visita_importada}</td>}
{/* endJSXtipo_visita_importada */}
{/* camposTabla */}
                                            {camposSeleccionados.includes("last_user") && <td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{importacion_de_datos?.last_user?.name}</td>}
                                            {camposSeleccionados.includes("createdAt") && <td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{new Date(importacion_de_datos?.createdAt).toLocaleString("es-ES")}</td>}
                                            {camposSeleccionados.includes("updatedAt") && <td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{new Date(importacion_de_datos?.updatedAt).toLocaleString("es-ES")}</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Importacion_de_datos_report;