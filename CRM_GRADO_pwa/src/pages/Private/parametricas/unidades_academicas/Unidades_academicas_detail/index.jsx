import Page from "@/components/Page";
import "./Unidades_academicas_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
export default function Unidades_academicas_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [unidades_academicas, set_unidades_academicas] = useState({});
    const populate = [
        //foreigns
        "last_user",
    ];
    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/unidades_academicas/delete/${id}`).then(r => {
            history.push('/app/unidades_academicas/list');
        });
    }
    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/unidades_academicas/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_unidades_academicas(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);
    return (
        <Page title="Ver Unidades_academicas" backURL="/app/unidades_academicas/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/unidades_academicas/update/${id}`}>
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
                    {/* initJSXnombre_unidad_academica */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Unidad Academica:</IonLabel>
            <p>{unidades_academicas?.nombre_unidad_academica}</p>
        </IonItem>
{/* endJSXnombre_unidad_academica */}
{/* initJSXid_saga */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Id Saga:</IonLabel>
            <p>{unidades_academicas?.id_saga}</p>
        </IonItem>
{/* endJSXid_saga */}
{/* fieldsDetail */}
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Último Editor:</IonLabel>
                        <p>{unidades_academicas?.last_user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Creación:</IonLabel>
                        <p>{new Date(unidades_academicas?.createdAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Actualización:</IonLabel>
                        <p>{new Date(unidades_academicas?.updatedAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}