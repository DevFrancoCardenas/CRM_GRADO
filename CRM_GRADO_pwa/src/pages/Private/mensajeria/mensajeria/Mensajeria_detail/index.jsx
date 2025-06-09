//initJSbanner
import FilesViewer from "@/components/FilesViewer";
//endJSbanner
import Page from "@/components/Page";
import "./Mensajeria_detail.css";
import { IonAlert, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { chevronDownCircle, create, trash } from "ionicons/icons";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/context/store";
import client from "@/api";
export default function Mensajeria_detail() {
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const store = useContext(StoreContext);
    const [mensajeria, set_mensajeria] = useState({});
    const populate = [
        //initJSunidad_academica_mensaje
"unidad_academica_mensaje",
//endJSunidad_academica_mensaje
//foreigns
        "last_user",
    ];
    function deleteRegister() {
        store.setLoading(true);
        client.delete(`/mensajeria/delete/${id}`).then(r => {
            history.push('/app/mensajeria/list');
        });
    }
    useEffect(() => {
        if (id) {
            store.setLoading(true);
            client.post('/mensajeria/read', {
                query: {
                    find: { _id: id },
                    populate,
                }
            }).then(r => {
                set_mensajeria(r?.data);
            }).finally(() => store.setLoading(false))
        }
    }, [location.pathname]);
    return (
        <Page title="Ver Mensajeria" backURL="/app/mensajeria/list">
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                <IonFabButton>
                    <IonIcon icon={chevronDownCircle}></IonIcon>
                </IonFabButton>
                <IonFabList side="bottom">
                    <Link to={`/app/mensajeria/update/${id}`}>
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
                    {/* initJSXunidad_academica_mensaje */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Unidad Academica:</IonLabel>
            <p>{mensajeria?.unidad_academica_mensaje?.nombre_unidad_academica}</p>
        </IonItem>
{/* endJSXunidad_academica_mensaje */}
{/* initJSXbanner */}
        <IonItem>
            <IonLabel position="stacked" className="font-bold">Banner:</IonLabel>
            <p>{<FilesViewer files={mensajeria?.banner} />}</p>
        </IonItem>
{/* endJSXbanner */}
{/* fieldsDetail */}
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Último Editor:</IonLabel>
                        <p>{mensajeria?.last_user?.name}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Creación:</IonLabel>
                        <p>{new Date(mensajeria?.createdAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="font-bold">Fecha de Actualización:</IonLabel>
                        <p>{new Date(mensajeria?.updatedAt).toLocaleString("es-ES")}</p>
                    </IonItem>
                </IonList>
            </IonContent>
        </Page>
    )
}