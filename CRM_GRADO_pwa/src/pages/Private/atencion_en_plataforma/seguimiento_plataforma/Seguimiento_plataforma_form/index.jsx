//initJStipo_seguimiento
import Select from "@/components/Select1";
//endJStipo_seguimiento
import Page from "@/components/Page";
import "./Seguimiento_plataforma_form.css";
import { IonFab, IonFabButton, IonIcon, IonList, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
export default function Seguimiento_plataforma_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    //fields
    const [seguimiento_plataforma, set_seguimiento_plataforma] = useState({
        //initJSfecha_seguimiento
fecha_seguimiento: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
//endJSfecha_seguimiento
//initJStipo_seguimiento
tipo_seguimiento: "",
//endJStipo_seguimiento
//initJSestado_seguimiento
estado_seguimiento: "ATENDIDO",
//endJSestado_seguimiento
//initJSobservacion_seguimiento_plataforma
observacion_seguimiento_plataforma: "",
//endJSobservacion_seguimiento_plataforma
//initJSnombre_atencion
nombre_atencion: "",
//endJSnombre_atencion
//fieldsModel
    });
//extraStates
//initJStipo_seguimiento
const [tipo_de_seguimiento_list, set_tipo_de_seguimiento_list] = useState([]);
//endJStipo_seguimiento
//initJSnombre_atencion
const [atencion_list, set_atencion_list] = useState([]);
//endJSnombre_atencion
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
//initJStipo_seguimiento
client.post('/tipo_de_seguimiento/list').then(r => set_tipo_de_seguimiento_list(r?.data?.list || [])),
//endJStipo_seguimiento
//initJSnombre_atencion
client.post('/atencion/list').then(r => set_atencion_list(r?.data?.list || [])),
//endJSnombre_atencion
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
        //initJSfecha_seguimiento
if (!seguimiento_plataforma?.fecha_seguimiento) errors.push("El campo Fecha Seguimiento es obligatorio");
//endJSfecha_seguimiento
//initJStipo_seguimiento
if (!seguimiento_plataforma?.tipo_seguimiento) errors.push("El campo Tipo de Seguimiento es obligatorio");
//endJStipo_seguimiento
//initJSestado_seguimiento
if (!seguimiento_plataforma?.estado_seguimiento) errors.push("El campo Estado es obligatorio");
//endJSestado_seguimiento
//initJSobservacion_seguimiento_plataforma
if (!seguimiento_plataforma?.observacion_seguimiento_plataforma) errors.push("El campo Observacion es obligatorio");
//endJSobservacion_seguimiento_plataforma
//validaciones
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/seguimiento_plataforma/update/${id}`, { seguimiento_plataforma }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/seguimiento_plataforma/create`, { seguimiento_plataforma }).then(r => {
                    history.push('/app/seguimiento_plataforma/list');
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
                .post("/seguimiento_plataforma/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(seguimiento_plataforma).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : seguimiento_plataforma[key];
                        return acc;
                    }, {});
                    set_seguimiento_plataforma(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [location.pathname]);
    return (
        <Page title={id ? "Editar Seguimiento plataforma" : "Crear Seguimiento plataforma"} backURL={`/app/seguimiento_plataforma/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    {/* initJSXfecha_seguimiento */}
            <Input type="datetime-local" label="Fecha Seguimiento" name="fecha_seguimiento" value={seguimiento_plataforma?.fecha_seguimiento} setValue={set_seguimiento_plataforma} errorText="Ingrese un Fecha Seguimiento válido" required={true}  />
{/* endJSXfecha_seguimiento */}
{/* initJSXtipo_seguimiento */}
                <Select label="Seleccionar Tipo de Seguimiento" options={tipo_de_seguimiento_list} field="tipo_de_seguimiento" value={seguimiento_plataforma?.tipo_seguimiento} setValue={e => set_seguimiento_plataforma({ ...seguimiento_plataforma, tipo_seguimiento: e })} />
{/* endJSXtipo_seguimiento */}
{/* initJSXestado_seguimiento */}
                <Select label="Seleccionar Estado" name="estado_seguimiento" options={["ATENDIDO", "EN SEGUIMIENTO", "GANADO", "PERDIDO"]} value={seguimiento_plataforma?.estado_seguimiento} setValue={set_seguimiento_plataforma} />
{/* endJSXestado_seguimiento */}
{/* initJSXobservacion_seguimiento_plataforma */}
        <Input type="textarea" label="Observacion" name="observacion_seguimiento_plataforma" value={seguimiento_plataforma?.observacion_seguimiento_plataforma} setValue={set_seguimiento_plataforma} errorText="Ingrese un Observacion válido" required={true}  />
{/* endJSXobservacion_seguimiento_plataforma */}
{/* initJSXnombre_atencion */}
                <Select label="Seleccionar Nombre Completo" options={atencion_list} field="nombre_completo" value={seguimiento_plataforma?.nombre_atencion} setValue={e => set_seguimiento_plataforma({ ...seguimiento_plataforma, nombre_atencion: e })} />
{/* endJSXnombre_atencion */}
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