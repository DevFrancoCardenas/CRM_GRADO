import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonContent, IonButton, IonSelect, IonSelectOption, IonItem, IonList, IonButtons, IonTitle, IonHeader, IonToolbar, IonIcon, useIonAlert } from '@ionic/react';
import MultiCheckbox from '@/components/MultiCheckbox';
import Input from '@/components/Input';
import { download } from 'ionicons/icons';
import { StoreContext } from '@/context/store';
import { jsPDF } from "jspdf";
import * as XLSX from 'xlsx';
import logo from '@/assets/logo.png';
import client from '@/api';
import "./Importacion_de_datos_list.css";
export default function Importacion_de_datos_report({ modal, camposInit = [] }) {
    const store = useContext(StoreContext);
    const htmlReport = useRef(null);
    const [showErrors] = useIonAlert();
    const [rangoTiempo, setRangoTiempo] = useState('hoy');
    const [fechaInicio, setFechaInicio] = useState();
    const [fechaFin, setFechaFin] = useState();
    const [camposSeleccionados, setCamposSeleccionados] = useState(camposInit);
    const [list, setList] = useState([]);
    const [type, setType] = useState(null);
    const populate = [
        //initJSunidad_academica_importacion
"unidad_academica_importacion",
//endJSunidad_academica_importacion
//foreigns
        "last_user",
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
        { _id: "createdAt", name: "Fecha de Creación" },
        { _id: "updatedAt", name: "Fecha de Actualización" },
    ];
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
        var errors = [];
        if (!rangoTiempo) errors.push("-Debe seleccionar el Rango de Tiempo");
        if (camposSeleccionados.length == 0) errors.push("-Debe seleccionar los Campos");
        if (errors.length == 0) {
            store.setLoading(true);
            var rangoF = calcularRangoFechas();
            client.post('/importacion_de_datos/list', {
                query: {
                    find: {
                        createdAt: {
                            $gte: rangoF.fechaI,
                            $lte: rangoF.fechaF
                        }
                    },
                    count: true,
                    populate,
                    select: camposSeleccionados
                }
            }).then(r => {
                setType(type);
                setList(r.data.list);
            });
        } else {
            showErrors({
                header: 'Error!',
                message: errors[0],
                buttons: [{
                    text: 'Aceptar',
                    cssClass: 'alert-button-danger',
                }],
            })
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
                const nombreArchivo = `ReporteImportacion de datos_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}.pdf`;
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
        list.forEach((r, index) => {
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
            if (camposSeleccionados.includes("createdAt")) r.createdAt = new Date(r?.createdAt).toLocaleString("es-ES");
            if (camposSeleccionados.includes("updatedAt")) r.updatedAt = new Date(r?.updatedAt).toLocaleString("es-ES");
            const row = [index + 1];
            campos.forEach(c => {
                if (camposSeleccionados.includes(c._id)) row.push(r[c._id]);
            });
            dates.push(row);
            console.log(row);
        });
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(dates);
        XLSX.utils.book_append_sheet(workbook, worksheet, " Datos");
        const fechaActual = new Date();
        const nombreArchivo = `ReporteImportacion de datos_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}`;
        XLSX.writeFile(workbook, `${nombreArchivo}.xlsx`);
        setTimeout(() => {
            store.setLoading(false);
            modal.current?.dismiss();
        }, 1000);
    }
    useEffect(() => {
        if (list.length > 0 && type != null) {
            setTimeout(() => {
                if (type == "PDF") {
                    downloadPDF();
                } else if (type == "EXCEL") {
                    downloadEXCEL();
                }
            }, 500);
        }
    }, [list, type])
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton color="danger" onClick={() => modal.current?.dismiss()}>Cerrar</IonButton>
                    </IonButtons>
                    <IonTitle>Reporte de Importacion de datos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonSelect label='Rango de Tiempo' labelPlacement="floating" interface="action-sheet" value={rangoTiempo} onIonChange={e => setRangoTiempo(e.detail.value)} cancelText="Cancelar">
                        <IonSelectOption value="hoy">Hoy</IonSelectOption>
                        <IonSelectOption value="ultimaSemana">Última Semana</IonSelectOption>
                        <IonSelectOption value="ultimoMes">Último Mes</IonSelectOption>
                        <IonSelectOption value="personalizado">Rango Personalizado</IonSelectOption>
                    </IonSelect>
                </IonItem>
                {rangoTiempo === 'personalizado' && (
                    <IonList>
                        <Input label="Desde" type='date' value={fechaInicio} setValue={setFechaInicio} />
                        <Input label="Hasta" type='date' value={fechaFin} setValue={setFechaFin} />
                    </IonList>
                )}
                <MultiCheckbox label="Campos" options={campos} value={camposSeleccionados} setValue={setCamposSeleccionados} />
                <IonItem>
                    <IonButton size="default" color="primary" onClick={() => generarReport("PDF")}>
                        <IonIcon icon={download} slot='end'></IonIcon>
                        PDF
                    </IonButton>
                    <IonButton size="default" color="success" onClick={() => generarReport("EXCEL")}>
                        <IonIcon icon={download} slot='end'></IonIcon>
                        EXCEL
                    </IonButton>
                </IonItem>
            </IonContent>
            <div style={{ display: 'none' }}>
                <div ref={htmlReport} className="htmlReport">
                    <style>
                        {`
                            .report-container {
                                font-family: Arial, sans-serif;
                                padding: 10px;
                                color: black;
                            }
                            .report-header {
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .report-header img {
                                height: 50px;
                                margin-bottom: 5px;
                            }
                            .report-header h1 {
                                font-size: 18px;
                                color: #333;
                            }
                            .report-header h2 {
                                font-size: 14px;
                                color: #666;
                            }
                            .report-table {
                                width: 100%;
                                border-collapse: collapse;
                            }
                            .report-table th,
                            .report-table td {
                                border: 1px solid #ddd;
                                padding: 4px;
                                text-align: left;
                                font-size: 8px;
                            }
                            .report-table th {
                                background-color: rgba(180, 180, 180, 1);;
                                font-weight: bold;
                            }
                            .report-table tr:nth-child(even) {
                                background-color: rgba(242, 242, 242, 0.5);;
                            }
                            .before-table {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                width: 100%;
                            }
                            .rango-tiempo {
                                display: flex;
                                font-size: 8pt;
                                text-align: left;
                            }
                            .total-registros {
                                font-size: 8pt;
                                text-align: end;
                                margin-right: 4px;
                            }
                        `}
                    </style>
                    <div className="report-container">
                        <div className="report-header">
                            <img src={logo} alt="Logo" />
                            <h1>Reporte de Importacion de datos</h1>
                            <h2>Fecha: {new Date(Date.now()).toLocaleDateString()}</h2>
                        </div>
                        <div className='before-table'>
                            {rangoTiempo == "personalizado" ?
                                <div className='rango-tiempo'>
                                    <p><strong>Desde:</strong> {new Date(fechaInicio).toLocaleDateString()}</p>
                                    <p style={{ marginLeft: "10px" }}><strong>Hasta:</strong> {new Date(fechaFin).toLocaleDateString()}</p>
                                </div>
                                :
                                <div className='rango-tiempo'>
                                    <p>Registros de <strong>{optionsRango.find(x => x._id == rangoTiempo).name}</strong></p>
                                </div>
                            }
                            <p className='total-registros'>{total} registros</p>
                        </div>
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Nro</th>
                                    {campos.map((c, index) =>
                                        camposSeleccionados.includes(c._id) &&
                                        <th key={index}>
                                            {c.name}
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((doc, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
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
                                        {camposSeleccionados.includes("last_user") && <td>{importacion_de_datos?.last_user?.name}</td>}
                                        {camposSeleccionados.includes("createdAt") && <td>{new Date(doc?.createdAt).toLocaleString("es-ES")}</td>}
                                        {camposSeleccionados.includes("updatedAt") && <td>{new Date(doc?.updatedAt).toLocaleString("es-ES")}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}