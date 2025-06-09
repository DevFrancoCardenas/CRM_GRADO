//initJSbanner
import FilesUpload from "@/components/FilesUpload";
//endJSbanner
//initJSunidad_academica_mensaje
import Select from "@/components/Select1";
//endJSunidad_academica_mensaje
import Page from "@/components/Page";
import "./Mensajeria_form.css";
import { IonFab, IonFabButton, IonIcon, IonList, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
export default function Mensajeria_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    //fields
    const [mensajeria, set_mensajeria] = useState({
        //initJSunidad_academica_mensaje
unidad_academica_mensaje: "",
//endJSunidad_academica_mensaje
//initJSbanner
banner: [],
//endJSbanner
//fieldsModel
    });
//initJSbanner
        const banner_upload = useRef();
//endJSbanner
//extraStates
    //initJSunidad_academica_mensaje
const [unidades_academicas_list, set_unidades_academicas_list] = useState([]);
//endJSunidad_academica_mensaje
//foreigns
    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            //initJSunidad_academica_mensaje
client.post('/unidades_academicas/list').then(r => set_unidades_academicas_list(r?.data?.list || [])),
//endJSunidad_academica_mensaje
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
        //initJSunidad_academica_mensaje
if (!mensajeria?.unidad_academica_mensaje) errors.push("El campo Unidad Academica es obligatorio");
//endJSunidad_academica_mensaje
//validaciones
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
//initJSbanner
        mensajeria.banner = [...mensajeria.banner, ...await banner_upload.current.uploadFilesComponent()];
//endJSbanner
//beforeSend
            if (id) {
                client.put(`/mensajeria/update/${id}`, { mensajeria }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/mensajeria/create`, { mensajeria }).then(r => {
                    history.push('/app/mensajeria/list');
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
                .post("/mensajeria/read", {
                    query: {
                        find: { _id: id },
                    },
                })
                .then((r) => {
                    const fetchedData = r?.data || {};
                    const update = Object.keys(mensajeria).reduce((acc, key) => {
                        acc[key] = fetchedData.hasOwnProperty(key) && fetchedData[key] !== null ? fetchedData[key] : mensajeria[key];
                        return acc;
                    }, {});
                    set_mensajeria(update);
                })
                .finally(() => store.setLoading(false));
        }
    }, [location.pathname]);
    return (
        <Page title={id ? "Editar Mensajeria" : "Crear Mensajeria"} backURL={`/app/mensajeria/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    {/* initJSXunidad_academica_mensaje */}
                <Select label="Seleccionar Unidad Academica" options={unidades_academicas_list} field="nombre_unidad_academica" value={mensajeria?.unidad_academica_mensaje} setValue={e => set_mensajeria({ ...mensajeria, unidad_academica_mensaje: e })} />
{/* endJSXunidad_academica_mensaje */}
{/* initJSXbanner */}
        <FilesUpload label="Banner" name="banner" files={mensajeria?.banner} setFiles={e => set_mensajeria({ ...mensajeria, banner: e })} ref={banner_upload} accept="image/*" maxFiles={1} maxSize={10} maxSizeImage={1}  />
{/* endJSXbanner */}
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