import Page from "@/components/Page";
import "./Tipo_de_seguimiento_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
export default function Tipo_de_seguimiento_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [tipo_de_seguimiento, set_tipo_de_seguimiento] = useState({});
    const populate = [
        //foreigns
        "last_user",
    ];
    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/tipo_de_seguimiento/delete/${id}`).then(r => {
            history.push('/app/tipo_de_seguimiento/list');
        });
    }
    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/tipo_de_seguimiento/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_tipo_de_seguimiento(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);
    return (
        <Page title="Ver Tipo_de_seguimiento" backURL="/app/tipo_de_seguimiento/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/tipo_de_seguimiento/update/${id}`}>
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
                    {/* initJSXtipo_de_seguimiento */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Tipo de Seguimiento:</IonLabel>
            <p>{tipo_de_seguimiento?.tipo_de_seguimiento}</p>
        </IonItem>
{/* endJSXtipo_de_seguimiento */}
{/* fieldsDetail */}
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Último Editor:</IonLabel>
                        <p>{tipo_de_seguimiento?.last_user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Creación:</IonLabel>
                        <p>{new Date(tipo_de_seguimiento?.createdAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Actualización:</IonLabel>
                        <p>{new Date(tipo_de_seguimiento?.updatedAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}