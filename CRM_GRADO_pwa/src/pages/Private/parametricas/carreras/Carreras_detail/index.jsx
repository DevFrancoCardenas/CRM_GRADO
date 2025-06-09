import Page from "@/components/Page";
import "./Carreras_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
export default function Carreras_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [carreras, set_carreras] = useState({});
    const populate = [
        //initJSunidad_academica
"unidad_academica",
//endJSunidad_academica
//foreigns
        "last_user",
    ];
    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/carreras/delete/${id}`).then(r => {
            history.push('/app/carreras/list');
        });
    }
    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/carreras/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_carreras(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);
    return (
        <Page title="Ver Carreras" backURL="/app/carreras/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/carreras/update/${id}`}>
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
                    {/* initJSXunidad_academica */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Unidad Academica:</IonLabel>
            <p>{carreras?.unidad_academica?.nombre_unidad_academica}</p>
        </IonItem>
{/* endJSXunidad_academica */}
{/* initJSXnombre_carrera */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Carrera:</IonLabel>
            <p>{carreras?.nombre_carrera}</p>
        </IonItem>
{/* endJSXnombre_carrera */}
{/* initJSXid_saga_carrera */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Id Saga:</IonLabel>
            <p>{carreras?.id_saga_carrera}</p>
        </IonItem>
{/* endJSXid_saga_carrera */}
{/* fieldsDetail */}
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Último Editor:</IonLabel>
                        <p>{carreras?.last_user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Creación:</IonLabel>
                        <p>{new Date(carreras?.createdAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Actualización:</IonLabel>
                        <p>{new Date(carreras?.updatedAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}