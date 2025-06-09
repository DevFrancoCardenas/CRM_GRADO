import Page from "@/components/Page";
import "./Group_form.css";
import { IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonToggle, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
import MultiCheckbox from "@/components/MultiCheckbox";

export default function Group_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    const [group, set_group] = useState({
        name: null,
        permissions: []
    });

    const [repeat_password, set_repeat_password] = useState();

    //foreigns
    const [permissions_list, set_permissions_list] = useState([]);

    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            client.post('/permission/list').then(r => set_permissions_list(r.data.list)),
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

    function handleSubmit(e) {
        e.preventDefault();
        var errors = [];
        const isInvalid = Object.values(validate).some(val => val === false);
        if (isInvalid) errors.push("-Revisa los valores ingresados");
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
            if (id) {
                client.put(`/group/update/${id}`, { group }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/group/create`, { group }).then(r => {
                    history.push('/app/group/list');
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

    useEffect(() => {
        getForeigns();

        if (id) {
            store.setLoading(true);
            client.post('/group/read', {
                query: {
                    find: { _id: id },
                }
            }).then(r => {
                set_group(r?.data)
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);

    return (
        <Page title={id ? "Editar Grupo" : "Crear Grupo"} backURL={`/app/group/list`}>
            <form onSubmit={handleSubmit}>
                <IonList>
                    <Input type="text" label="Nombre de Grupo" name="name" value={group?.name} setValue={set_group} errorText="Ingrese un Nombre válido" required={true} />
                </IonList>
                <IonList>
                    <MultiCheckbox label="Permisos" name="permissions" options={permissions_list} value={group?.permissions} setValue={set_group} />
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