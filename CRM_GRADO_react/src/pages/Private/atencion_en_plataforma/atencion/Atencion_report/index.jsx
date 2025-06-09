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
function Atencion_report() {
    const store = useContext(StoreContext);
    const htmlReport = useRef(null);
    const [rangoTiempo, setRangoTiempo] = useState('hoy');
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();
    const [camposSeleccionados, setCamposSeleccionados] = useState([
        //initJSfecha_atencion
"fecha_atencion",
//endJSfecha_atencion
//initJSnombres
"nombres",
//endJSnombres
//initJSapellido_paterno
"apellido_paterno",
//endJSapellido_paterno
//initJSapellido_materno
"apellido_materno",
//endJSapellido_materno
//initJScarnet_identidad
"carnet_identidad",
//endJScarnet_identidad
//initJSnumero_celular
"numero_celular",
//endJSnumero_celular
//initJSnombre_tutor
"nombre_tutor",
//endJSnombre_tutor
//initJSunidad_academica
"unidad_academica",
//endJSunidad_academica
//initJSotras_carreras
"otras_carreras",
//endJSotras_carreras
//initJSgestion_bachiller
"gestion_bachiller",
//endJSgestion_bachiller
//initJScolegio
"colegio",
//endJScolegio
//initJStipo_colegio
"tipo_colegio",
//endJStipo_colegio
//initJSprovincia
"provincia",
//endJSprovincia
//initJScomo_te_enteraste_emi
"como_te_enteraste_emi",
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
"otro_metodo_capatacion",
//endJSotro_metodo_capatacion
//initJShora_clase
"hora_clase",
//endJShora_clase
//initJSestado
"estado",
//endJSestado
//initJSasesor
"asesor",
//endJSasesor
//initJSdepartamento
"departamento",
//endJSdepartamento
//initJScarreras
"carreras",
//endJScarreras
//initJSnombre_completo
"nombre_completo",
//endJSnombre_completo
//camposDefault
    ]);
    const [list, setList] = useState([]);
    const [find, setFind] = useState({});
    const [total, setTotal] = useState(0);
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
    const optionsRango = [
        { _id: "hoy", name: "Hoy" },
        { _id: "ultimaSemana", name: "Última Semana" },
        { _id: "ultimoMes", name: "Último Mes" },
        { _id: "personalizado", name: "Rango Personalizado" },
    ];
    const campos = [
        //initJSfecha_atencion
{ _id: "fecha_atencion", name: "Fecha de Atencion" },
//endJSfecha_atencion
//initJSnombres
{ _id: "nombres", name: "Nombres" },
//endJSnombres
//initJSapellido_paterno
{ _id: "apellido_paterno", name: "Apellido Paterno" },
//endJSapellido_paterno
//initJSapellido_materno
{ _id: "apellido_materno", name: "Apellido Materno" },
//endJSapellido_materno
//initJScarnet_identidad
{ _id: "carnet_identidad", name: "Carnet de Identidad" },
//endJScarnet_identidad
//initJSnumero_celular
{ _id: "numero_celular", name: "Numero de celular" },
//endJSnumero_celular
//initJSnombre_tutor
{ _id: "nombre_tutor", name: "Nombres Tutor" },
//endJSnombre_tutor
//initJSapellido_materno_tutor
{ _id: "apellido_materno_tutor", name: "Apellido Materno Tutor" },
//endJSapellido_materno_tutor
//initJSapellido_paterno_tutor
{ _id: "apellido_paterno_tutor", name: "Apellido Paterno Tutor" },
//endJSapellido_paterno_tutor
//initJSnumero_celular_tutor
{ _id: "numero_celular_tutor", name: "Numero de celular Tutor" },
//endJSnumero_celular_tutor
//initJSunidad_academica
{ _id: "unidad_academica", name: "Unidad Academica" },
//endJSunidad_academica
//initJSotras_carreras
{ _id: "otras_carreras", name: "Otras Carreras" },
//endJSotras_carreras
//initJSgestion_bachiller
{ _id: "gestion_bachiller", name: "Gestion Bachiller" },
//endJSgestion_bachiller
//initJScolegio
{ _id: "colegio", name: "Colegio" },
//endJScolegio
//initJStipo_colegio
{ _id: "tipo_colegio", name: "Tipo Colegio" },
//endJStipo_colegio
//initJSprovincia
{ _id: "provincia", name: "Provincia" },
//endJSprovincia
//initJScomo_te_enteraste_emi
{ _id: "como_te_enteraste_emi", name: "¿Como te Enteraste de Nosotros?" },
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
{ _id: "otro_metodo_capatacion", name: "¿Otro medio de captacion?" },
//endJSotro_metodo_capatacion
//initJShora_clase
{ _id: "hora_clase", name: "Hr. de Clases" },
//endJShora_clase
//initJSobservacion
{ _id: "observacion", name: "Observacion" },
//endJSobservacion
//initJSestado
{ _id: "estado", name: "Estado" },
//endJSestado
//initJSasesor
{ _id: "asesor", name: "Asesor" },
//endJSasesor
//initJSdepartamento
{ _id: "departamento", name: "Departamento" },
//endJSdepartamento
//initJScarreras
{ _id: "carreras", name: "Carrera" },
//endJScarreras
//initJSnombre_completo
{ _id: "nombre_completo", name: "Nombre Completo" },
//endJSnombre_completo
//camposTabla
        { _id: "last_user", name: "Ultimo Editor" },
        { _id: "createdAt", name: "Fecha de Creación" },
        { _id: "updatedAt", name: "Fecha de Actualización" },
    ];
    function getList(query) {
        store.setLoading(true);
        client.post('/atencion/list', {
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
                const nombreArchivo = `Reporte_Atencion_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}.pdf`;
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
                //initJSfecha_atencion
if (camposSeleccionados.includes("fecha_atencion")) r.fecha_atencion = new Date(i?.fecha_atencion).toLocaleString("es-ES");;
//endJSfecha_atencion
//initJSnombres
if (camposSeleccionados.includes("nombres")) r.nombres = i?.nombres;
//endJSnombres
//initJSapellido_paterno
if (camposSeleccionados.includes("apellido_paterno")) r.apellido_paterno = i?.apellido_paterno;
//endJSapellido_paterno
//initJSapellido_materno
if (camposSeleccionados.includes("apellido_materno")) r.apellido_materno = i?.apellido_materno;
//endJSapellido_materno
//initJScarnet_identidad
if (camposSeleccionados.includes("carnet_identidad")) r.carnet_identidad = i?.carnet_identidad;
//endJScarnet_identidad
//initJSnumero_celular
if (camposSeleccionados.includes("numero_celular")) r.numero_celular = i?.numero_celular;
//endJSnumero_celular
//initJSnombre_tutor
if (camposSeleccionados.includes("nombre_tutor")) r.nombre_tutor = i?.nombre_tutor;
//endJSnombre_tutor
//initJSapellido_materno_tutor
if (camposSeleccionados.includes("apellido_materno_tutor")) r.apellido_materno_tutor = i?.apellido_materno_tutor;
//endJSapellido_materno_tutor
//initJSapellido_paterno_tutor
if (camposSeleccionados.includes("apellido_paterno_tutor")) r.apellido_paterno_tutor = i?.apellido_paterno_tutor;
//endJSapellido_paterno_tutor
//initJSnumero_celular_tutor
if (camposSeleccionados.includes("numero_celular_tutor")) r.numero_celular_tutor = i?.numero_celular_tutor;
//endJSnumero_celular_tutor
//initJSunidad_academica
if (camposSeleccionados.includes("unidad_academica")) r.unidad_academica = i?.unidad_academica?.nombre_unidad_academica;;
//endJSunidad_academica
//initJSotras_carreras
if (camposSeleccionados.includes("otras_carreras")) r.otras_carreras = i?.otras_carreras;
//endJSotras_carreras
//initJSgestion_bachiller
if (camposSeleccionados.includes("gestion_bachiller")) r.gestion_bachiller = i?.gestion_bachiller;
//endJSgestion_bachiller
//initJScolegio
if (camposSeleccionados.includes("colegio")) r.colegio = i?.colegio;
//endJScolegio
//initJStipo_colegio
if (camposSeleccionados.includes("tipo_colegio")) r.tipo_colegio = i?.tipo_colegio;
//endJStipo_colegio
//initJSprovincia
if (camposSeleccionados.includes("provincia")) r.provincia = i?.provincia;
//endJSprovincia
//initJScomo_te_enteraste_emi
if (camposSeleccionados.includes("como_te_enteraste_emi")) r.como_te_enteraste_emi = i?.como_te_enteraste_emi;
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
if (camposSeleccionados.includes("otro_metodo_capatacion")) r.otro_metodo_capatacion = i?.otro_metodo_capatacion;
//endJSotro_metodo_capatacion
//initJShora_clase
if (camposSeleccionados.includes("hora_clase")) r.hora_clase = i?.hora_clase;
//endJShora_clase
//initJSobservacion
if (camposSeleccionados.includes("observacion")) r.observacion = i?.observacion;
//endJSobservacion
//initJSestado
if (camposSeleccionados.includes("estado")) r.estado = i?.estado;
//endJSestado
//initJSasesor
if (camposSeleccionados.includes("asesor")) r.asesor = i?.asesor?.name;;
//endJSasesor
//initJSdepartamento
if (camposSeleccionados.includes("departamento")) r.departamento = i?.departamento;
//endJSdepartamento
//initJScarreras
if (camposSeleccionados.includes("carreras")) r.carreras = i?.carreras?.nombre_carrera;;
//endJScarreras
//initJSnombre_completo
if (camposSeleccionados.includes("nombre_completo")) r.nombre_completo = i?.nombre_completo;
//endJSnombre_completo
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
        const nombreArchivo = `Reporte_Atencion_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}`;
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
                        <h1 className="text-balance 2xl:text-xl sm:text-lg text-sm mt-2 sm:mt-0 font-semibold text-gray-900 uppercase">Reporte de Atencion</h1>
                    </div>
                    <div className="mt-0 sm:ml-16 ml-4 sm:flex-none">
                        <Link
                            to="../atencion/list"
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
                                //initJSfecha_atencion
{ id: "fecha_atencion", name: "Fecha de Atencion", type: "datetime-local" },
//endJSfecha_atencion//search
//initJSnombres
{ id: "nombres", name: "Nombres", type: "string" },
//endJSnombres//search
//initJSapellido_paterno
{ id: "apellido_paterno", name: "Apellido Paterno", type: "string" },
//endJSapellido_paterno//search
//initJSapellido_materno
{ id: "apellido_materno", name: "Apellido Materno", type: "string" },
//endJSapellido_materno//search
//initJScarnet_identidad
{ id: "carnet_identidad", name: "Carnet de Identidad", type: "string" },
//endJScarnet_identidad//search
//initJSnumero_celular
{ id: "numero_celular", name: "Numero de celular", type: "number" },
//endJSnumero_celular//search
//search
//initJSnombre_tutor
{ id: "nombre_tutor", name: "Nombres Tutor", type: "string" },
//endJSnombre_tutor//search
//search
//search
//initJSapellido_materno_tutor
{ id: "apellido_materno_tutor", name: "Apellido Materno Tutor", type: "string" },
//endJSapellido_materno_tutor//search
//initJSapellido_paterno_tutor
{ id: "apellido_paterno_tutor", name: "Apellido Paterno Tutor", type: "string" },
//endJSapellido_paterno_tutor//search
//initJSnumero_celular_tutor
{ id: "numero_celular_tutor", name: "Numero de celular Tutor", type: "number" },
//endJSnumero_celular_tutor//search
//initJSunidad_academica
{ id: "unidad_academica", name: "Unidad Academica", type: "string" },
//endJSunidad_academica//search
//search
//initJSotras_carreras
{ id: "otras_carreras", name: "Otras Carreras", type: "string" },
//endJSotras_carreras//search
//initJSgestion_bachiller
{ id: "gestion_bachiller", name: "Gestion Bachiller", type: "number" },
//endJSgestion_bachiller//search
//initJScolegio
{ id: "colegio", name: "Colegio", type: "string" },
//endJScolegio//search
//initJStipo_colegio
{ id: "tipo_colegio", name: "Tipo Colegio", type: "string" },
//endJStipo_colegio//search
//search
//initJSprovincia
{ id: "provincia", name: "Provincia", type: "string" },
//endJSprovincia//search
//initJScomo_te_enteraste_emi
{ id: "como_te_enteraste_emi", name: "¿Como te Enteraste de Nosotros?", type: "string" },
//endJScomo_te_enteraste_emi//search
//initJSotro_metodo_capatacion
{ id: "otro_metodo_capatacion", name: "¿Otro medio de captacion?", type: "string" },
//endJSotro_metodo_capatacion//search
//initJShora_clase
{ id: "hora_clase", name: "Hr. de Clases", type: "string" },
//endJShora_clase//search
//initJSobservacion
{ id: "observacion", name: "Observacion", type: "string" },
//endJSobservacion//search
//initJSestado
{ id: "estado", name: "Estado", type: "string" },
//endJSestado//search
//initJSasesor
{ id: "asesor", name: "Asesor", type: "string" },
//endJSasesor//search
//initJSdepartamento
{ id: "departamento", name: "Departamento", type: "string" },
//endJSdepartamento//search
//initJScarreras
{ id: "carreras", name: "Carrera", type: "string" },
//endJScarreras//search
//initJSnombre_completo
{ id: "nombre_completo", name: "Nombre Completo", type: "string" },
//endJSnombre_completo//search
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
                                <label className="grow text-xs sm:text-sm 2xl:text-lg py-4 uppercase">Reportes Atencion</label>
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
                                    {list.map((atencion, index) => (
                                        <tr className="even:bg-gray-50" key={index}>
                                            <td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-lg text-xs text-gray-500">{index + 1}</td>
                                            {/* initJSXfecha_atencion */}
{camposSeleccionados.includes("fecha_atencion") && <td>{new Date(atencion?.fecha_atencion).toLocaleString("es-ES")}</td>}
{/* endJSXfecha_atencion */}
{/* initJSXnombres */}
{camposSeleccionados.includes("nombres") && <td>{atencion?.nombres}</td>}
{/* endJSXnombres */}
{/* initJSXapellido_paterno */}
{camposSeleccionados.includes("apellido_paterno") && <td>{atencion?.apellido_paterno}</td>}
{/* endJSXapellido_paterno */}
{/* initJSXapellido_materno */}
{camposSeleccionados.includes("apellido_materno") && <td>{atencion?.apellido_materno}</td>}
{/* endJSXapellido_materno */}
{/* initJSXcarnet_identidad */}
{camposSeleccionados.includes("carnet_identidad") && <td>{atencion?.carnet_identidad}</td>}
{/* endJSXcarnet_identidad */}
{/* initJSXnumero_celular */}
{camposSeleccionados.includes("numero_celular") && <td>{atencion?.numero_celular}</td>}
{/* endJSXnumero_celular */}
{/* initJSXnombre_tutor */}
{camposSeleccionados.includes("nombre_tutor") && <td>{atencion?.nombre_tutor}</td>}
{/* endJSXnombre_tutor */}
{/* initJSXapellido_materno_tutor */}
{camposSeleccionados.includes("apellido_materno_tutor") && <td>{atencion?.apellido_materno_tutor}</td>}
{/* endJSXapellido_materno_tutor */}
{/* initJSXapellido_paterno_tutor */}
{camposSeleccionados.includes("apellido_paterno_tutor") && <td>{atencion?.apellido_paterno_tutor}</td>}
{/* endJSXapellido_paterno_tutor */}
{/* initJSXnumero_celular_tutor */}
{camposSeleccionados.includes("numero_celular_tutor") && <td>{atencion?.numero_celular_tutor}</td>}
{/* endJSXnumero_celular_tutor */}
{/* initJSXunidad_academica */}
{camposSeleccionados.includes("unidad_academica") && <td>{atencion?.unidad_academica?.nombre_unidad_academica}</td>}
{/* endJSXunidad_academica */}
{/* initJSXotras_carreras */}
{camposSeleccionados.includes("otras_carreras") && <td>{atencion?.otras_carreras}</td>}
{/* endJSXotras_carreras */}
{/* initJSXgestion_bachiller */}
{camposSeleccionados.includes("gestion_bachiller") && <td>{atencion?.gestion_bachiller}</td>}
{/* endJSXgestion_bachiller */}
{/* initJSXcolegio */}
{camposSeleccionados.includes("colegio") && <td>{atencion?.colegio}</td>}
{/* endJSXcolegio */}
{/* initJSXtipo_colegio */}
{camposSeleccionados.includes("tipo_colegio") && <td>{atencion?.tipo_colegio}</td>}
{/* endJSXtipo_colegio */}
{/* initJSXprovincia */}
{camposSeleccionados.includes("provincia") && <td>{atencion?.provincia}</td>}
{/* endJSXprovincia */}
{/* initJSXcomo_te_enteraste_emi */}
{camposSeleccionados.includes("como_te_enteraste_emi") && <td>{atencion?.como_te_enteraste_emi}</td>}
{/* endJSXcomo_te_enteraste_emi */}
{/* initJSXotro_metodo_capatacion */}
{camposSeleccionados.includes("otro_metodo_capatacion") && <td>{atencion?.otro_metodo_capatacion}</td>}
{/* endJSXotro_metodo_capatacion */}
{/* initJSXhora_clase */}
{camposSeleccionados.includes("hora_clase") && <td>{atencion?.hora_clase}</td>}
{/* endJSXhora_clase */}
{/* initJSXobservacion */}
{camposSeleccionados.includes("observacion") && <td>{atencion?.observacion}</td>}
{/* endJSXobservacion */}
{/* initJSXestado */}
{camposSeleccionados.includes("estado") && <td>{atencion?.estado}</td>}
{/* endJSXestado */}
{/* initJSXasesor */}
{camposSeleccionados.includes("asesor") && <td>{atencion?.asesor?.name}</td>}
{/* endJSXasesor */}
{/* initJSXdepartamento */}
{camposSeleccionados.includes("departamento") && <td>{atencion?.departamento}</td>}
{/* endJSXdepartamento */}
{/* initJSXcarreras */}
{camposSeleccionados.includes("carreras") && <td>{atencion?.carreras?.nombre_carrera}</td>}
{/* endJSXcarreras */}
{/* initJSXnombre_completo */}
{camposSeleccionados.includes("nombre_completo") && <td>{atencion?.nombre_completo}</td>}
{/* endJSXnombre_completo */}
{/* camposTabla */}
                                            {camposSeleccionados.includes("last_user") && <td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{atencion?.last_user?.name}</td>}
                                            {camposSeleccionados.includes("createdAt") && <td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{new Date(atencion?.createdAt).toLocaleString("es-ES")}</td>}
                                            {camposSeleccionados.includes("updatedAt") && <td className="2xl:px-3 sm:px-2 px-1 2xl:py-4 sm:py-2 py-1 2xl:text-sm text-xs text-gray-500">{new Date(atencion?.updatedAt).toLocaleString("es-ES")}</td>}
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
export default Atencion_report;