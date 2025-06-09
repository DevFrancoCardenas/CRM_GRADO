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
import "./Tipo_de_seguimiento_list.css";
export default function Tipo_de_seguimiento_report({ modal, camposInit = [] }) {
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
        //foreigns
        "last_user",
    ];
    const campos = [
        //initJStipo_de_seguimiento
{ _id: "tipo_de_seguimiento", name: "Tipo de Seguimiento" },
//endJStipo_de_seguimiento
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
            client.post('/tipo_de_seguimiento/list', {
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
                const nombreArchivo = `ReporteTipo de seguimiento_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}.pdf`;
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
            //initJStipo_de_seguimiento
if (camposSeleccionados.includes("tipo_de_seguimiento")) r.tipo_de_seguimiento = i?.tipo_de_seguimiento;
//endJStipo_de_seguimiento
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
        const nombreArchivo = `ReporteTipo de seguimiento_${fechaActual.toLocaleDateString().replace(/\//g, '-')}_${fechaActual.toLocaleTimeString().replace(/:/g, '-')}`;
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
                    <IonTitle>Reporte de Tipo de seguimiento</IonTitle>
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
                            <h1>Reporte de Tipo de seguimiento</h1>
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
                                        {/* initJSXtipo_de_seguimiento */}
{camposSeleccionados.includes("tipo_de_seguimiento") && <td>{tipo_de_seguimiento?.tipo_de_seguimiento}</td>}
{/* endJSXtipo_de_seguimiento */}
{/* camposTabla */}
                                        {camposSeleccionados.includes("last_user") && <td>{tipo_de_seguimiento?.last_user?.name}</td>}
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