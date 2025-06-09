//initJScomo_te_enteraste_emi
import MultiCheckbox from "@/components/MultiCheckbox";
//endJScomo_te_enteraste_emi
//initJSunidad_academica
import Select from "@/components/Select1";
//endJSunidad_academica
import Page from "@/components/Page";
import "./Atencion_form.css";
import { IonFab, IonFabButton, IonIcon, IonList, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
export default function Atencion_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    //fields
    const [atencion, set_atencion] = useState({
        //initJSfecha_atencion
fecha_atencion: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
//endJSfecha_atencion
//initJSnombres
nombres: "",
//endJSnombres
//initJSapellido_paterno
apellido_paterno: "",
//endJSapellido_paterno
//initJSapellido_materno
apellido_materno: "",
//endJSapellido_materno
//initJScarnet_identidad
carnet_identidad: "",
//endJScarnet_identidad
//initJSnumero_celular
numero_celular: "",
//endJSnumero_celular
//initJSnombre_tutor
nombre_tutor: "",
//endJSnombre_tutor
//initJSapellido_materno_tutor
apellido_materno_tutor: "",
//endJSapellido_materno_tutor
//initJSapellido_paterno_tutor
apellido_paterno_tutor: "",
//endJSapellido_paterno_tutor
//initJSnumero_celular_tutor
numero_celular_tutor: "",
//endJSnumero_celular_tutor
//initJSunidad_academica
unidad_academica: "",
//endJSunidad_academica
//initJSotras_carreras
otras_carreras: "",
//endJSotras_carreras
//initJSgestion_bachiller
gestion_bachiller: "",
//endJSgestion_bachiller
//initJScolegio
colegio: "",
//endJScolegio
//initJStipo_colegio
tipo_colegio: "",
//endJStipo_colegio
//initJSprovincia
provincia: "",
//endJSprovincia
//initJScomo_te_enteraste_emi
como_te_enteraste_emi: "",
//endJScomo_te_enteraste_emi
//initJSotro_metodo_capatacion
otro_metodo_capatacion: "",
//endJSotro_metodo_capatacion
//initJShora_clase
hora_clase: "",
//endJShora_clase
//initJSobservacion
observacion: "",
//endJSobservacion
//initJSestado
estado: "ATENDIDO",
//endJSestado
//initJSasesor
asesor: "",
//endJSasesor
//initJSdepartamento
departamento: "",
//endJSdepartamento
//initJScarreras
carreras: "",
//endJScarreras
//initJSnombre_completo
nombre_completo: "",
//endJSnombre_completo
//fieldsModel
    });
//extraStates
//initJSunidad_academica
const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
//endJSunidad_academica
//initJSasesor
const [user_list, set_user_list] = useState([]);
//endJSasesor
//initJScarreras
const [carreras_list, set_carreras_list] = useState([]);
//endJScarreras
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
//initJSunidad_academica
client.post('/unidades_academicas/list').then(r => set_unidades_academicas_list(r?.data?.list || [])),
//endJSunidad_academica
//initJSasesor
client.post('/user/list').then(r => set_user_list(r?.data?.list || [])),
//endJSasesor
//initJScarreras
client.post('/carreras/list').then(r => set_carreras_list(r?.data?.list || [])),
//endJScarreras
//callForeigns
        ]).finally(() => {
            store.setLoading(false);
        });
    }
    function showE(message) {
        showErrors({
            header: 'Error!',
            message: message,
            buttons: [{
                text: 'Aceptar',
                cssClass: 'alert-button-danger',
            }],
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        var errors = [];
        const isInvalid = Object.values(validate).some(val => val === false);
        if (isInvalid) errors.push("-Revisa los valores ingresados");
        //initJSfecha_atencion
if (!atencion?.fecha_atencion) errors.push("El campo Fecha de Atencion es obligatorio");
//endJSfecha_atencion
//initJSnombres
if (!atencion?.nombres) errors.push("El campo Nombres es obligatorio");
//endJSnombres
//initJSnumero_celular
if (!atencion?.numero_celular) errors.push("El campo Numero de celular es obligatorio");
//endJSnumero_celular
//initJSapellido_materno_tutor
if (!atencion?.apellido_materno_tutor) errors.push("El campo Apellido Materno Tutor es obligatorio");
//endJSapellido_materno_tutor
//initJSunidad_academica
if (!atencion?.unidad_academica) errors.push("El campo Unidad Academica es obligatorio");
//endJSunidad_academica
//initJSgestion_bachiller
if (!atencion?.gestion_bachiller) errors.push("El campo Gestion Bachiller es obligatorio");
//endJSgestion_bachiller
//initJScolegio
if (!atencion?.colegio) errors.push("El campo Colegio es obligatorio");
//endJScolegio
//initJStipo_colegio
if (!atencion?.tipo_colegio) errors.push("El campo Tipo Colegio es obligatorio");
//endJStipo_colegio
//initJSprovincia
if (!atencion?.provincia) errors.push("El campo Provincia es obligatorio");
//endJSprovincia
//initJScomo_te_enteraste_emi
if (!atencion?.como_te_enteraste_emi.length) errors.push("El campo ¿Como te Enteraste de Nosotros? es obligatorio");
//endJScomo_te_enteraste_emi
//initJShora_clase
if (!atencion?.hora_clase) errors.push("El campo Hr. de Clases es obligatorio");
//endJShora_clase
//initJSobservacion
if (!atencion?.observacion) errors.push("El campo Observacion es obligatorio");
//endJSobservacion
//initJSestado
if (!atencion?.estado) errors.push("El campo Estado es obligatorio");
//endJSestado
//initJSasesor
if (!atencion?.asesor) errors.push("El campo Asesor es obligatorio");
//endJSasesor
//validaciones
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/atencion/update/${id}`, { atencion }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/atencion/create`, { atencion }).then(r => {
                    history.push('/app/atencion/list');
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            }
        } else {
            const errorMessageText = errors.join('\n');
            showErrors({
                header: 'Error!',
                message: errorMessageText,
                buttons: [{
                    text: 'Aceptar',
                    cssClass: 'alert-button-danger',
                }],
            })
        }
    }
//extraEffect
    useEffect(() => {
        getForeigns();
        if (id) {
            store.setLoading(true);
            client
                .post("/atencion/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(atencion).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : atencion[key];
                        return acc;
                    }, {});
                    set_atencion(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [location.pathname]);
    return (
        <Page title={id ? "Editar Atencion" : "Crear Atencion"} backURL={`/app/atencion/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    {/* initJSXunidad_academica */}
                <Select label="Seleccionar Unidad Academica" options={unidades_academicas_list} field="nombre_unidad_academica" value={atencion?.unidad_academica} setValue={e => set_atencion({ ...atencion, unidad_academica: e })} />
{/* endJSXunidad_academica */}
{/* initJSXnombres */}
        <Input type="text" label="Nombres" name="nombres" value={atencion?.nombres} setValue={set_atencion} errorText="Ingrese un Nombres válido" required={true}  />
{/* endJSXnombres */}
{/* initJSXapellido_paterno */}
        <Input type="text" label="Apellido Paterno" name="apellido_paterno" value={atencion?.apellido_paterno} setValue={set_atencion} errorText="Ingrese un Apellido Paterno válido" required={false}  />
{/* endJSXapellido_paterno */}
{/* initJSXapellido_materno */}
        <Input type="text" label="Apellido Materno" name="apellido_materno" value={atencion?.apellido_materno} setValue={set_atencion} errorText="Ingrese un Apellido Materno válido" required={false}  />
{/* endJSXapellido_materno */}
{/* initJSXcarnet_identidad */}
        <Input type="text" label="Carnet de Identidad" name="carnet_identidad" value={atencion?.carnet_identidad} setValue={set_atencion} errorText="Ingrese un Carnet de Identidad válido" required={false}  />
{/* endJSXcarnet_identidad */}
{/* initJSXnumero_celular */}
            <Input type="numer" label="Numero de celular" name="numero_celular" value={atencion?.numero_celular} setValue={set_atencion} errorText="Ingrese un Numero de celular válido" required={true}  />
{/* endJSXnumero_celular */}
{/* initJSXnombre_tutor */}
        <Input type="text" label="Nombres Tutor" name="nombre_tutor" value={atencion?.nombre_tutor} setValue={set_atencion} errorText="Ingrese un Nombres Tutor válido" required={false}  />
{/* endJSXnombre_tutor */}
{/* initJSXapellido_materno_tutor */}
        <Input type="text" label="Apellido Materno Tutor" name="apellido_materno_tutor" value={atencion?.apellido_materno_tutor} setValue={set_atencion} errorText="Ingrese un Apellido Materno Tutor válido" required={true}  />
{/* endJSXapellido_materno_tutor */}
{/* initJSXapellido_paterno_tutor */}
        <Input type="text" label="Apellido Paterno Tutor" name="apellido_paterno_tutor" value={atencion?.apellido_paterno_tutor} setValue={set_atencion} errorText="Ingrese un Apellido Paterno Tutor válido" required={false}  />
{/* endJSXapellido_paterno_tutor */}
{/* initJSXnumero_celular_tutor */}
            <Input type="numer" label="Numero de celular Tutor" name="numero_celular_tutor" value={atencion?.numero_celular_tutor} setValue={set_atencion} errorText="Ingrese un Numero de celular Tutor válido" required={false}  />
{/* endJSXnumero_celular_tutor */}
{/* initJSXfecha_atencion */}
            <Input type="datetime-local" label="Fecha de Atencion" name="fecha_atencion" value={atencion?.fecha_atencion} setValue={set_atencion} errorText="Ingrese un Fecha de Atencion válido" required={true}  />
{/* endJSXfecha_atencion */}
{/* initJSXotras_carreras */}
        <Input type="text" label="Otras Carreras" name="otras_carreras" value={atencion?.otras_carreras} setValue={set_atencion} errorText="Ingrese un Otras Carreras válido" required={false}  />
{/* endJSXotras_carreras */}
{/* initJSXgestion_bachiller */}
            <Input type="numer" label="Gestion Bachiller" name="gestion_bachiller" value={atencion?.gestion_bachiller} setValue={set_atencion} errorText="Ingrese un Gestion Bachiller válido" required={true}  />
{/* endJSXgestion_bachiller */}
{/* initJSXcolegio */}
        <Input type="text" label="Colegio" name="colegio" value={atencion?.colegio} setValue={set_atencion} errorText="Ingrese un Colegio válido" required={true}  />
{/* endJSXcolegio */}
{/* initJSXtipo_colegio */}
                <Select label="Seleccionar Tipo Colegio" name="tipo_colegio" options={["FISCAL", "CONVENIO", "PARTICULAR"]} value={atencion?.tipo_colegio} setValue={set_atencion} />
{/* endJSXtipo_colegio */}
{/* initJSXprovincia */}
        <Input type="text" label="Provincia" name="provincia" value={atencion?.provincia} setValue={set_atencion} errorText="Ingrese un Provincia válido" required={true}  />
{/* endJSXprovincia */}
{/* initJSXcomo_te_enteraste_emi */}
                <MultiCheckbox label="Seleccionar ¿Como te Enteraste de Nosotros?" name="como_te_enteraste_emi" options={["FACEBOOK", "INSTAGRAM", "TIK TOK", "PAGINA WEB", "POR UN FAMILIAR", "VISITA A TU COLEGIO", "VISITA PRE MILITAR", "RECOMENDACION AMIGO"]} value={atencion?.como_te_enteraste_emi} setValue={set_atencion} />
{/* endJSXcomo_te_enteraste_emi */}
{/* initJSXotro_metodo_capatacion */}
        <Input type="text" label="¿Otro medio de captacion?" name="otro_metodo_capatacion" value={atencion?.otro_metodo_capatacion} setValue={set_atencion} errorText="Ingrese un ¿Otro medio de captacion? válido" required={false}  />
{/* endJSXotro_metodo_capatacion */}
{/* initJSXhora_clase */}
                <Select label="Seleccionar Hr. de Clases" name="hora_clase" options={["MANANA", "TARDE", "NOCHE"]} value={atencion?.hora_clase} setValue={set_atencion} />
{/* endJSXhora_clase */}
{/* initJSXobservacion */}
        <Input type="textarea" label="Observacion" name="observacion" value={atencion?.observacion} setValue={set_atencion} errorText="Ingrese un Observacion válido" required={true}  />
{/* endJSXobservacion */}
{/* initJSXestado */}
                <Select label="Seleccionar Estado" name="estado" options={["ATENDIDO", "EN SEGUIMIENTO", "GANADO", "PERDIDO"]} value={atencion?.estado} setValue={set_atencion} />
{/* endJSXestado */}
{/* initJSXasesor */}
                <Select label="Seleccionar Asesor" options={user_list} field="name" value={atencion?.asesor} setValue={e => set_atencion({ ...atencion, asesor: e })} />
{/* endJSXasesor */}
{/* initJSXdepartamento */}
                <Select label="Seleccionar Departamento" name="departamento" options={["CHUQUISACA", "COCHABAMBA", "TARIJA", "LA PAZ", "ORURO", "POTOSI", "PANDO", "BENI", "SANTA CRUZ"]} value={atencion?.departamento} setValue={set_atencion} />
{/* endJSXdepartamento */}
{/* initJSXcarreras */}
                <Select label="Seleccionar Carrera" options={carreras_list} field="nombre_carrera" value={atencion?.carreras} setValue={e => set_atencion({ ...atencion, carreras: e })} />
{/* endJSXcarreras */}
{/* initJSXnombre_completo */}
        <Input type="text" label="Nombre Completo" name="nombre_completo" value={atencion?.nombre_completo} setValue={set_atencion} errorText="Ingrese un Nombre Completo válido" required={false}  />
{/* endJSXnombre_completo */}
{/* inputFields */}
                </IonList>
                <button type="submit" style={{ display: 'none' }} ref={submitRef}>Submit</button>
            </form>
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton color="success" onClick={() => submitRef.current && submitRef.current.click()}>
                    <IonIcon icon={save} />
                </IonFabButton>
            </IonFab>
        </Page>
    )
}