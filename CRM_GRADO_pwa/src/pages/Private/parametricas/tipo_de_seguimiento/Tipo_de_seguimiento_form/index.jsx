import Page from "@/components/Page";
import "./Tipo_de_seguimiento_form.css";
import { IonFab, IonFabButton, IonIcon, IonList, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
export default function Tipo_de_seguimiento_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    //fields
    const [tipo_de_seguimiento, set_tipo_de_seguimiento] = useState({
        //initJStipo_de_seguimiento
tipo_de_seguimiento: "",
//endJStipo_de_seguimiento
//fieldsModel
    });
//extraStates
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
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
        //initJStipo_de_seguimiento
if (!tipo_de_seguimiento?.tipo_de_seguimiento) errors.push("El campo Tipo de Seguimiento es obligatorio");
//endJStipo_de_seguimiento
//validaciones
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/tipo_de_seguimiento/update/${id}`, { tipo_de_seguimiento }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/tipo_de_seguimiento/create`, { tipo_de_seguimiento }).then(r => {
                    history.push('/app/tipo_de_seguimiento/list');
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
                .post("/tipo_de_seguimiento/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(tipo_de_seguimiento).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : tipo_de_seguimiento[key];
                        return acc;
                    }, {});
                    set_tipo_de_seguimiento(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [location.pathname]);
    return (
        <Page title={id ? "Editar Tipo de seguimiento" : "Crear Tipo de seguimiento"} backURL={`/app/tipo_de_seguimiento/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    {/* initJSXtipo_de_seguimiento */}
        <Input type="text" label="Tipo de Seguimiento" name="tipo_de_seguimiento" value={tipo_de_seguimiento?.tipo_de_seguimiento} setValue={set_tipo_de_seguimiento} errorText="Ingrese un Tipo de Seguimiento válido" required={true}  />
{/* endJSXtipo_de_seguimiento */}
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