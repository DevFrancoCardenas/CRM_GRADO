//initJSunidad_academica_importacion
import Select from "@/components/Select1";
//endJSunidad_academica_importacion
import Page from "@/components/Page";
import "./Importacion_de_datos_form.css";
import { IonFab, IonFabButton, IonIcon, IonList, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
export default function Importacion_de_datos_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    //fields
    const [importacion_de_datos, set_importacion_de_datos] = useState({
        //initJSunidad_academica_importacion
unidad_academica_importacion: "",
//endJSunidad_academica_importacion
//initJSfecha_importacion
fecha_importacion: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
//endJSfecha_importacion
//initJSnombre_importado
nombre_importado: "",
//endJSnombre_importado
//initJSapellido_paterno_importado
apellido_paterno_importado: "",
//endJSapellido_paterno_importado
//initJSapellido_materno_importado
apellido_materno_importado: "",
//endJSapellido_materno_importado
//initJScarnet_identidad_importacion
carnet_identidad_importacion: "",
//endJScarnet_identidad_importacion
//initJSnumero_celular_importacion
numero_celular_importacion: "",
//endJSnumero_celular_importacion
//initJSnombre_tutor_impotado
nombre_tutor_impotado: "",
//endJSnombre_tutor_impotado
//initJSapellido_paterno_tutor_importado
apellido_paterno_tutor_importado: "",
//endJSapellido_paterno_tutor_importado
//initJSapellido_materno_tutor_importado
apellido_materno_tutor_importado: "",
//endJSapellido_materno_tutor_importado
//initJScelular_tutor_importado
celular_tutor_importado: "",
//endJScelular_tutor_importado
//initJScarrera_interes
carrera_interes: "",
//endJScarrera_interes
//initJSgestion_bachiller_importado
gestion_bachiller_importado: "",
//endJSgestion_bachiller_importado
//initJScolegio_importado
colegio_importado: "",
//endJScolegio_importado
//initJStipo_colegio_importado
tipo_colegio_importado: "",
//endJStipo_colegio_importado
//initJSdepartamento_importado
departamento_importado: "",
//endJSdepartamento_importado
//initJSprovincia_importado
provincia_importado: "",
//endJSprovincia_importado
//initJShorario_clases_importado
horario_clases_importado: "",
//endJShorario_clases_importado
//initJStipo_visita_importada
tipo_visita_importada: "",
//endJStipo_visita_importada
//fieldsModel
    });
//extraStates
    //initJSunidad_academica_importacion
const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
//endJSunidad_academica_importacion
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            //initJSunidad_academica_importacion
client.post('/unidades_academicas/list').then(r => set_unidades_academicas_list(r?.data?.list || [])),
//endJSunidad_academica_importacion
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
        //initJSunidad_academica_importacion
if (!importacion_de_datos?.unidad_academica_importacion) errors.push("El campo Unidad Academica es obligatorio");
//endJSunidad_academica_importacion
//initJSfecha_importacion
if (!importacion_de_datos?.fecha_importacion) errors.push("El campo Fecha de Importacion es obligatorio");
//endJSfecha_importacion
//initJSnombre_importado
if (!importacion_de_datos?.nombre_importado) errors.push("El campo Nombres es obligatorio");
//endJSnombre_importado
//initJStipo_visita_importada
if (!importacion_de_datos?.tipo_visita_importada) errors.push("El campo tipo visita es obligatorio");
//endJStipo_visita_importada
//validaciones
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/importacion_de_datos/update/${id}`, { importacion_de_datos }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/importacion_de_datos/create`, { importacion_de_datos }).then(r => {
                    history.push('/app/importacion_de_datos/list');
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
                .post("/importacion_de_datos/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(importacion_de_datos).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : importacion_de_datos[key];
                        return acc;
                    }, {});
                    set_importacion_de_datos(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [location.pathname]);
    return (
        <Page title={id ? "Editar Importacion de datos" : "Crear Importacion de datos"} backURL={`/app/importacion_de_datos/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    {/* initJSXunidad_academica_importacion */}
                <Select label="Seleccionar Unidad Academica" options={unidades_academicas_list} field="nombre_unidad_academica" value={importacion_de_datos?.unidad_academica_importacion} setValue={e => set_importacion_de_datos({ ...importacion_de_datos, unidad_academica_importacion: e })} />
{/* endJSXunidad_academica_importacion */}
{/* initJSXfecha_importacion */}
            <Input type="datetime-local" label="Fecha de Importacion" name="fecha_importacion" value={importacion_de_datos?.fecha_importacion} setValue={set_importacion_de_datos} errorText="Ingrese un Fecha de Importacion válido" required={true}  />
{/* endJSXfecha_importacion */}
{/* initJSXnombre_importado */}
        <Input type="text" label="Nombres" name="nombre_importado" value={importacion_de_datos?.nombre_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Nombres válido" required={true}  />
{/* endJSXnombre_importado */}
{/* initJSXapellido_paterno_importado */}
        <Input type="text" label="Apellido Paterno" name="apellido_paterno_importado" value={importacion_de_datos?.apellido_paterno_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Apellido Paterno válido" required={false}  />
{/* endJSXapellido_paterno_importado */}
{/* initJSXapellido_materno_importado */}
        <Input type="text" label="Apellido Materno" name="apellido_materno_importado" value={importacion_de_datos?.apellido_materno_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Apellido Materno válido" required={false}  />
{/* endJSXapellido_materno_importado */}
{/* initJSXcarnet_identidad_importacion */}
        <Input type="text" label="Carnet de Identidad" name="carnet_identidad_importacion" value={importacion_de_datos?.carnet_identidad_importacion} setValue={set_importacion_de_datos} errorText="Ingrese un Carnet de Identidad válido" required={false}  />
{/* endJSXcarnet_identidad_importacion */}
{/* initJSXnumero_celular_importacion */}
            <Input type="numer" label="Numero de celular" name="numero_celular_importacion" value={importacion_de_datos?.numero_celular_importacion} setValue={set_importacion_de_datos} errorText="Ingrese un Numero de celular válido" required={false}  />
{/* endJSXnumero_celular_importacion */}
{/* initJSXnombre_tutor_impotado */}
        <Input type="text" label="Nombre de tutor" name="nombre_tutor_impotado" value={importacion_de_datos?.nombre_tutor_impotado} setValue={set_importacion_de_datos} errorText="Ingrese un Nombre de tutor válido" required={false}  />
{/* endJSXnombre_tutor_impotado */}
{/* initJSXapellido_paterno_tutor_importado */}
        <Input type="text" label="Apellido Paterno Tutor" name="apellido_paterno_tutor_importado" value={importacion_de_datos?.apellido_paterno_tutor_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Apellido Paterno Tutor válido" required={false}  />
{/* endJSXapellido_paterno_tutor_importado */}
{/* initJSXapellido_materno_tutor_importado */}
        <Input type="text" label="Apellido Materno Tutor" name="apellido_materno_tutor_importado" value={importacion_de_datos?.apellido_materno_tutor_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Apellido Materno Tutor válido" required={false}  />
{/* endJSXapellido_materno_tutor_importado */}
{/* initJSXcelular_tutor_importado */}
        <Input type="text" label="Celular tutor" name="celular_tutor_importado" value={importacion_de_datos?.celular_tutor_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Celular tutor válido" required={false}  />
{/* endJSXcelular_tutor_importado */}
{/* initJSXcarrera_interes */}
        <Input type="text" label="Carrera de Interes" name="carrera_interes" value={importacion_de_datos?.carrera_interes} setValue={set_importacion_de_datos} errorText="Ingrese un Carrera de Interes válido" required={false}  />
{/* endJSXcarrera_interes */}
{/* initJSXgestion_bachiller_importado */}
        <Input type="text" label="Gestion Bachiller" name="gestion_bachiller_importado" value={importacion_de_datos?.gestion_bachiller_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Gestion Bachiller válido" required={false}  />
{/* endJSXgestion_bachiller_importado */}
{/* initJSXcolegio_importado */}
        <Input type="text" label="Colegio" name="colegio_importado" value={importacion_de_datos?.colegio_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Colegio válido" required={false}  />
{/* endJSXcolegio_importado */}
{/* initJSXtipo_colegio_importado */}
        <Input type="text" label="Tipo Colegio" name="tipo_colegio_importado" value={importacion_de_datos?.tipo_colegio_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Tipo Colegio válido" required={false}  />
{/* endJSXtipo_colegio_importado */}
{/* initJSXdepartamento_importado */}
        <Input type="text" label="Departamento" name="departamento_importado" value={importacion_de_datos?.departamento_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Departamento válido" required={false}  />
{/* endJSXdepartamento_importado */}
{/* initJSXprovincia_importado */}
        <Input type="text" label="Provincia" name="provincia_importado" value={importacion_de_datos?.provincia_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Provincia válido" required={false}  />
{/* endJSXprovincia_importado */}
{/* initJSXhorario_clases_importado */}
        <Input type="text" label="Hr. de Clases" name="horario_clases_importado" value={importacion_de_datos?.horario_clases_importado} setValue={set_importacion_de_datos} errorText="Ingrese un Hr. de Clases válido" required={false}  />
{/* endJSXhorario_clases_importado */}
{/* initJSXtipo_visita_importada */}
        <Input type="text" label="tipo visita" name="tipo_visita_importada" value={importacion_de_datos?.tipo_visita_importada} setValue={set_importacion_de_datos} errorText="Ingrese un tipo visita válido" required={true}  />
{/* endJSXtipo_visita_importada */}
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