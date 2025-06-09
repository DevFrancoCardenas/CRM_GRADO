import Page from "@/components/Page";
import "./User_form.css";
import { IonFab, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonToggle, useIonAlert } from "@ionic/react";
import { useHistory, useLocation, useParams } from "react-router";
import { StoreContext } from "@/context/store";
import { useContext, useEffect, useRef, useState } from "react";
import { save } from "ionicons/icons";
import client from "@/api";
import Input from "@/components/Input";
import MultiCheckbox from "@/components/MultiCheckbox";

export default function User_form() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const submitRef = useRef(null);
    const [showErrors] = useIonAlert();
    const [validate, set_validate] = useState({});
    const [user, set_user] = useState({
        name: null,
        username: null,
        email: null,
        password: null,
        groups: [],
        permissions: [],
        is_admin: false,
        is_active: true
    });

    const [repeat_password, set_repeat_password] = useState();

    //foreigns
    const [groups_list, set_groups_list] = useState([]);
    const [permissions_list, set_permissions_list] = useState([]);

    async function getForeigns() {
        store.setLoading(true);
        Promise.all([
            client.post('/group/list').then(r => set_groups_list(r.data.list)),
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
        if (user.password != repeat_password) errors.push("-Las contraseñas no coinciden");
        //Otros Validadores
        if (errors.length == 0) {
            store.setLoading(true);
            if (id) {
                client.put(`/user/update/${id}`, { user }).then(r => {
                    history.goBack();
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            } else {
                client.post(`/user/create`, { user }).then(r => {
                    history.push('/app/user/list');
                }).catch(e => {
                    if (e?.response?.data?.message) showE(e?.response?.data?.message);
                }).finally(() => store.setLoading(false));
            }
        } else {
            showE(errors[0]);
        }
    }

    useEffect(() => {
        getForeigns();
        if (id) {
            store.setLoading(true);
            client.post('/user/read', {
                query: {
                    find: { _id: id },
                }
            }).then(r => {
                set_user(r?.data)
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);

    return (
        <Page title={id ? "Editar Usuario" : "Crear Usuario"} backURL={`/app/user/list`}>
            <form onSubmit={handleSubmit}>
                <IonItem color="primary">
                    <IonLabel className="text-center">Información Personal</IonLabel>
                </IonItem>
                <IonList>
                    <Input type="text" label="Nombre Completo" name="name" value={user?.name} setValue={set_user} errorText="Ingrese un Nombre válido" required={true} />
                    <Input type="username" label="Nombre de Usuario" name="username" value={user?.username} setValue={set_user} errorText="Ingrese un Nombre de Usuario válido" required={true} setValidate={set_validate} />
                    <Input type="email" label="Correo Electrónico" name="email" value={user?.email} setValue={set_user} errorText="Ingrese un Email válido" setValidate={set_validate} />
                    <Input type="password" label="Contraseña" name="password" value={user?.password} setValue={set_user} errorText="Ingrese una Contraseña válida" required={!id} setValidate={set_validate} />
                    <Input type="password" label="Repetir Contraseña" value={repeat_password} setValue={set_repeat_password} errorText="Ingrese una Contraseña válida" setValidate={set_validate} />
                </IonList>
                <IonItem color="primary">
                    <IonLabel className="text-center">Información de Permisos</IonLabel>
                </IonItem>
                <IonList>
                    <IonItem>
                        <IonToggle checked={user?.is_active} onIonChange={e => set_user({ ...user, is_active: e.target.checked })}>Usuario Activo</IonToggle>
                    </IonItem>
                    <IonItem>
                        <IonToggle checked={user?.is_admin} onIonChange={e => set_is_admin(e.target.checked)}>Usuario Administrador</IonToggle>
                    </IonItem>
                    <MultiCheckbox label="Grupos" name="groups" options={groups_list} value={user?.groups} setValue={set_user} />
                    <MultiCheckbox label="Permisos" name="permissions" options={permissions_list} value={user?.permissions} setValue={set_user} />
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