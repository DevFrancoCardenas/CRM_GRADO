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
import "./Atencion_list.css";
export default function Atencion_report({ modal, camposInit = [] }) {
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
            client.post('/atencion/list', {
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
                const nombreArchivo = `ReporteAtencion_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}.pdf`;
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
        const nombreArchivo = `ReporteAtencion_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}`;
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
                    <IonTitle>Reporte de Atencion</IonTitle>
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
                            <h1>Reporte de Atencion</h1>
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
                                        {camposSeleccionados.includes("last_user") && <td>{atencion?.last_user?.name}</td>}
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