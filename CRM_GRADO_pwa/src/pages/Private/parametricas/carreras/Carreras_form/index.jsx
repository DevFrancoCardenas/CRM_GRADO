//initJSunidad_academica
import Select from "@/components/Select1";
//endJSunidad_academica
import Page from "@/components/Page";
import "./Carreras_form.css";
import { IonFab, IonFabButton, IonIcon, IonList, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
export default function Carreras_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    //fields
    const [carreras, set_carreras] = useState({
        //initJSunidad_academica
unidad_academica: "",
//endJSunidad_academica
//initJSnombre_carrera
nombre_carrera: "",
//endJSnombre_carrera
//initJSid_saga_carrera
id_saga_carrera: "",
//endJSid_saga_carrera
//fieldsModel
    });
//extraStates
    //initJSunidad_academica
const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
//endJSunidad_academica
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            //initJSunidad_academica
client.post('/unidades_academicas/list').then(r => set_unidades_academicas_list(r?.data?.list || [])),
//endJSunidad_academica
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
        //initJSunidad_academica
if (!carreras?.unidad_academica) errors.push("El campo Unidad Academica es obligatorio");
//endJSunidad_academica
//initJSnombre_carrera
if (!carreras?.nombre_carrera) errors.push("El campo Carrera es obligatorio");
//endJSnombre_carrera
//initJSid_saga_carrera
if (!carreras?.id_saga_carrera) errors.push("El campo Id Saga es obligatorio");
//endJSid_saga_carrera
//validaciones
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
//beforeSend
            if (id) {
                client.put(`/carreras/update/${id}`, { carreras }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/carreras/create`, { carreras }).then(r => {
                    history.push('/app/carreras/list');
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
                .post("/carreras/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(carreras).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : carreras[key];
                        return acc;
                    }, {});
                    set_carreras(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [location.pathname]);
    return (
        <Page title={id ? "Editar Carreras" : "Crear Carreras"} backURL={`/app/carreras/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    {/* initJSXunidad_academica */}
                <Select label="Seleccionar Unidad Academica" options={unidades_academicas_list} field="nombre_unidad_academica" value={carreras?.unidad_academica} setValue={e => set_carreras({ ...carreras, unidad_academica: e })} />
{/* endJSXunidad_academica */}
{/* initJSXnombre_carrera */}
        <Input type="text" label="Carrera" name="nombre_carrera" value={carreras?.nombre_carrera} setValue={set_carreras} errorText="Ingrese un Carrera válido" required={true}  />
{/* endJSXnombre_carrera */}
{/* initJSXid_saga_carrera */}
        <Input type="text" label="Id Saga" name="id_saga_carrera" value={carreras?.id_saga_carrera} setValue={set_carreras} errorText="Ingrese un Id Saga válido" required={true}  />
{/* endJSXid_saga_carrera */}
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