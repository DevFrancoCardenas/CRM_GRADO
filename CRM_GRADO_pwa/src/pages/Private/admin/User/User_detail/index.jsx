import Page from "@/components/Page";
import "./User_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
import BadgeBool from "@/components/BadgeBool";

export default function User_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [user, set_user] = useState({});

    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/user/delete/${id}`).then(r => {
            history.push('/app/user/list');
        });
    }

    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/user/read', {
                query: {
                    find: { _id: id },
                    populate: ['groups', 'permissions']
                }
            }).then(r => {
                set_user(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);

    return (
        <Page title="Ver Usuario" backURL="/app/user/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/user/update/${id}`}>
                        <IonFabButton>
                            <IonIcon color="primary" icon={create}></IonIcon>
                        </IonFabButton>
                    </Link>
                    <IonFabButton id="present-alert">
                        <IonIcon color="danger" icon={trash}></IonIcon>
                    </IonFabButton>
                </IonFabList>
            </IonFab>
            {/* CONFIRM DELETE */}
            <IonAlert
                header="Alerta!"
                message='Esta seguro que desea eliminar el registro?'
                trigger="present-alert"
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'alert-button-cancel',
                        handler: () => {
                            console.log('Alert canceled');
                        },
                    },
                    {
                        text: 'Confirmar',
                        role: 'confirm',
                        cssClass: 'alert-button-danger',
                        handler: () => {
                            console.log('Alert confirmed');
                            deleteRegister();
                        },
                    },
                ]}
                onDidDismiss={({ detail }) => console.log(`Dismissed with role: ${detail.role}`)}
            ></IonAlert>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Nombre Completo:</IonLabel>
                        <p>{user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Nombre de Usuario:</IonLabel>
                        <p>{user?.username}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Correo Electrónico:</IonLabel>
                        <p>{user?.email}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Usuario Activo:</IonLabel>
                        <BadgeBool value={user?.is_active} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Usuario Administrador:</IonLabel>
                        <BadgeBool value={user?.is_admin} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Grupos:</IonLabel>
                        <p>{user?.groups?.map(group => group.name).join(", ")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Permisos:</IonLabel>
                        <p>{user?.permissions?.map(permission => permission.name).join(", ")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}