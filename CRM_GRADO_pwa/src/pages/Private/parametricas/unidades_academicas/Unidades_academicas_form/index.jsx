import Page from "@/components/Page";
import "./Unidades_academicas_form.css";
import { IonFab, IonFabButton, IonIcon, IonList, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
export default function Unidades_academicas_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    //fields
    const [unidades_academicas, set_unidades_academicas] = useState({
        //initJSnombre_unidad_academica
nombre_unidad_academica: "",
//endJSnombre_unidad_academica
//initJSid_saga
id_saga: "",
//endJSid_saga
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
        //initJSnombre_unidad_academica
if (!unidades_academicas?.nombre_unidad_academica) errors.push("El campo Unidad Academica es obligatorio");
//endJSnombre_unidad_academica
//initJSid_saga
if (!unidades_academicas?.id_saga) errors.push("El campo Id Saga es obligatorio");
//endJSid_saga
//validaciones
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/unidades_academicas/update/${id}`, { unidades_academicas }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/unidades_academicas/create`, { unidades_academicas }).then(r => {
                    history.push('/app/unidades_academicas/list');
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
                .post("/unidades_academicas/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(unidades_academicas).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : unidades_academicas[key];
                        return acc;
                    }, {});
                    set_unidades_academicas(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [location.pathname]);
    return (
        <Page title={id ? "Editar Unidades academicas" : "Crear Unidades academicas"} backURL={`/app/unidades_academicas/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    {/* initJSXnombre_unidad_academica */}
        <Input type="text" label="Unidad Academica" name="nombre_unidad_academica" value={unidades_academicas?.nombre_unidad_academica} setValue={set_unidades_academicas} errorText="Ingrese un Unidad Academica válido" required={true}  />
{/* endJSXnombre_unidad_academica */}
{/* initJSXid_saga */}
        <Input type="text" label="Id Saga" name="id_saga" value={unidades_academicas?.id_saga} setValue={set_unidades_academicas} errorText="Ingrese un Id Saga válido" required={true}  />
{/* endJSXid_saga */}
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